// src/components/GlobalButton.tsx
import React, { useState, useEffect } from "react";
import { ButtonTypes } from "./ButtonTypes";

interface GlobalButtonProps {
  variant?: ButtonTypes;
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export default function GlobalButton({
  variant = ButtonTypes.BASIC,
  label,
  icon,
  onClick,
  selected,
}: GlobalButtonProps) {
  const [internalSelected, setInternalSelected] = useState<boolean>(!!selected);

  useEffect(() => {
    if (typeof selected === "boolean") setInternalSelected(selected);
  }, [selected]);

  const isSelected = typeof selected === "boolean" ? selected : internalSelected;

  const handleClick = () => {
    if (typeof selected !== "boolean") setInternalSelected(!internalSelected);
    onClick?.();
  };

  return (
    <button className={`${variant} ${isSelected ? "selected" : ""}`} onClick={handleClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      {label && <span className="btn-label">{label}</span>}
    </button>
  );
}
