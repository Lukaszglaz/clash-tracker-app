"use client";

import React from "react";
import { clsx } from "clsx";

interface OTPInputProps {
  label?: string;
  code: string[];
  inputsRef: React.MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent) => void;
}

export const OTPInput = ({
  label,
  code,
  inputsRef,
  onChange,
  onKeyDown,
  onPaste,
}: OTPInputProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-text-dim ml-2">
          {label}
        </label>
      )}

      <div className="flex justify-between gap-2" onPaste={onPaste}>
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => onChange(index, e.target.value)}
            onKeyDown={(e) => onKeyDown(index, e)}
            className={clsx(
              "w-full h-16 rounded-2xl border-2 transition-all duration-200 outline-none",
              "bg-bg-card text-center text-2xl font-black text-text-main",
              "focus:shadow-brand/10",
              // Jeśli pole jest wypełnione, dajemy fioletowy border, jeśli nie - standardowy
              digit
                ? "border-brand shadow-sm shadow-brand/10"
                : "border-ui-border focus:border-brand",
            )}
          />
        ))}
      </div>
    </div>
  );
};
