// src/components/GlobalSearchBar.tsx
import React from "react";

interface GlobalSearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function GlobalSearchBar({
  placeholder = "Search...",
  value,
  onChange
}: GlobalSearchBarProps) {
  return (
    <div className="search-bar">
      <span className="search-bar-icon">🔍</span>
      <input
        className="search-bar-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
