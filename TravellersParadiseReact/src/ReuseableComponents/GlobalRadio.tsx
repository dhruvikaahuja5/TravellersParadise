// src/components/GlobalRadio.tsx
import React from "react";

interface GlobalRadioProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (value: string) => void;
  label?: string;
}

export default function GlobalRadio({
  name,
  value,
  checked = false,
  onChange,
  label
}: GlobalRadioProps) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {label && <span>{label}</span>}
    </label>
  );
}
