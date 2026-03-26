"use client";

import type { FieldGroup } from "@/lib/invoiceFieldConfig";
import type { InvoiceFieldKey, InvoiceFieldSelection } from "@/lib/invoiceTypes";

export type FieldSelectorProps = {
  fieldGroups: FieldGroup[];
  lineCountLabel: string;
  selection: InvoiceFieldSelection;
  onToggle: (key: InvoiceFieldKey) => void;
  lineCount: number;
  onLineCountChange: (n: number) => void;
};

export function FieldSelector({
  fieldGroups,
  lineCountLabel,
  selection,
  onToggle,
  lineCount,
  onLineCountChange,
}: FieldSelectorProps) {
  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="lineCount"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          {lineCountLabel}
        </label>
        <select
          id="lineCount"
          value={lineCount}
          onChange={(e) => onLineCountChange(Number(e.target.value))}
          className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500"
        >
          {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {fieldGroups.map((group) => (
        <fieldset key={group.id} className="space-y-2">
          <legend className="text-sm font-semibold text-neutral-900">
            {group.label}
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {group.fields.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-2 rounded border border-neutral-200 bg-white px-3 py-2 text-sm hover:bg-neutral-50"
              >
                <input
                  type="checkbox"
                  checked={selection[key]}
                  onChange={() => onToggle(key)}
                  className="size-4 rounded border-neutral-300 text-neutral-900"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
