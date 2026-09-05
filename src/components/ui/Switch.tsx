"use client";

import React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled = false,
  label,
  id,
}) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      }`}
    >
      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onCheckedChange(!checked);
        }}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-150 ease-in-out focus:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
          checked
            ? "bg-zinc-100 border border-zinc-200"
            : "bg-zinc-800 border border-zinc-700 hover:bg-zinc-750"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full shadow-sm transition duration-150 ease-in-out my-auto ${
            checked
              ? "translate-x-4 bg-zinc-950 translate-y-[2px]"
              : "translate-x-0.5 bg-zinc-400 translate-y-[2px]"
          }`}
        />
      </button>
      {label && <span className="text-xs text-zinc-300 font-normal">{label}</span>}
    </label>
  );
};
