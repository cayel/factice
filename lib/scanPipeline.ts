import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";

const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;

const COLOR_PROPS = [
  "color",
  "backgroundColor",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor",
  "outlineColor",
  "textDecorationColor",
  "columnRuleColor",
  "caretColor",
] as const;

function camelToKebab(prop: string): string {
  return prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function hasModernColor(raw: string) {
  return (
    /\blab\s*\(/.test(raw) ||
    /\boklch\s*\(/.test(raw) ||
    /\bcolor\s*\(/.test(raw)
  );
}

/** html2canvas ne parse pas lab()/oklch() ; on force des couleurs en hex sur le clone. */
function sanitizeLabColorsOnClone(clonedRoot: HTMLElement) {
  const doc = clonedRoot.ownerDocument;
  if (!doc?.defaultView) return;

  const walk = (el: HTMLElement) => {
    const cs = doc.defaultView!.getComputedStyle(el);
    for (const prop of COLOR_PROPS) {
      const kebab = camelToKebab(prop);
      const raw = cs.getPropertyValue(kebab);
      if (!raw || raw === "transparent" || raw === "rgba(0, 0, 0, 0)") continue;
      if (!hasModernColor(raw)) continue;
      if (prop === "backgroundColor") {
        el.style.setProperty(kebab, "#ffffff");
      } else if (prop === "color") {
        el.style.setProperty(kebab, "#171717");
      } else {
        el.style.setProperty(kebab, "#a3a3a3");
      }
    }
    const shadow = cs.getPropertyValue("box-shadow");
    if (shadow && hasModernColor(shadow)) {
      el.style.setProperty("box-shadow", "0 1px 2px rgba(0, 0, 0, 0.05)");
    }
    for (const child of el.children) {
      if (child instanceof HTMLElement) walk(child);
    }
  };

  walk(clonedRoot);
}

function grayscaleAndNoise(source: HTMLCanvasElement): HTMLCanvasElement {
  const out = document.createElement("canvas");
  out.width = source.width;
  out.height = source.height;
  const ctx = out.getContext("2d");
  if (!ctx) return source;
  ctx.drawImage(source, 0, 0);
  const img = ctx.getImageData(0, 0, out.width, out.height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const gray = 0.299 * d[i]! + 0.587 * d[i + 1]! + 0.114 * d[i + 2]!;
    const noise = (Math.random() - 0.5) * 16;
    const v = Math.round(Math.min(255, Math.max(0, gray + noise)));
    d[i] = v;
    d[i + 1] = v;
    d[i + 2] = v;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return out;
}

function rotateOnWhite(canvas: HTMLCanvasElement, angleDeg: number): HTMLCanvasElement {
  const rad = (angleDeg * Math.PI) / 180;
  const w = canvas.width;
  const h = canvas.height;
  const nw = Math.ceil(Math.abs(w * Math.cos(rad)) + Math.abs(h * Math.sin(rad)));
  const nh = Math.ceil(Math.abs(w * Math.sin(rad)) + Math.abs(h * Math.cos(rad)));
  const out = document.createElement("canvas");
  out.width = nw;
  out.height = nh;
  const ctx = out.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, nw, nh);
  ctx.translate(nw / 2, nh / 2);
  ctx.rotate(rad);
  ctx.drawImage(canvas, -w / 2, -h / 2);
  return out;
}

/**
 * Capture l’élément en image, applique un rendu type scan, produit un PDF une page (image).
 */
export async function generateScannedInvoicePdf(
  element: HTMLElement,
): Promise<Uint8Array> {
  const angleDeg = (Math.random() - 0.5) * 1.2;

  const captured = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    foreignObjectRendering: false,
    onclone: (_doc, cloned) => {
      if (cloned instanceof HTMLElement) sanitizeLabColorsOnClone(cloned);
    },
  });

  let processed = grayscaleAndNoise(captured);
  processed = rotateOnWhite(processed, angleDeg);

  const blob = await new Promise<Blob | null>((resolve) =>
    processed.toBlob(resolve, "image/png"),
  );
  if (!blob) {
    throw new Error("Impossible de rasteriser la facture.");
  }
  const pngBytes = new Uint8Array(await blob.arrayBuffer());

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH_PT, A4_HEIGHT_PT]);
  const pngImage = await pdfDoc.embedPng(pngBytes);

  const pw = page.getWidth();
  const ph = page.getHeight();
  const iw = pngImage.width;
  const ih = pngImage.height;
  const scale = Math.min(pw / iw, ph / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const x = (pw - dw) / 2;
  const y = ph - dh;

  page.drawImage(pngImage, {
    x,
    y,
    width: dw,
    height: dh,
  });

  return pdfDoc.save();
}

export function downloadPdf(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
