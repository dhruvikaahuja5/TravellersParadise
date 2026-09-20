// src/components/GlobalCheckbox.tsx
import React from "react";

interface GlobalCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

export default function GlobalCheckbox({
  checked = false,
  onChange,
  label
}: GlobalCheckboxProps) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
