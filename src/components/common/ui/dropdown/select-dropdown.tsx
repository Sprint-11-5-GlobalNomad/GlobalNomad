"use client";

import React, { useState } from "react";
import { DropdownArrowIcon } from "../../icons/dropdown-arrow-icon";
import { DropdownCheckIcon } from "../../icons/dropdown-check-icon";
import UseOutsideClick from "@/hooks/use-outside-click";

interface SelectDropdownProps {
  options: string[];
  description: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}

export default function SelectDropdown({
  options,
  description,
  value,
  onChange,
  onBlur,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouched, setIsTouched] = useState(false); // 포커스 여부 추적

  const dropdownRef = UseOutsideClick(() => {
    setIsOpen(false);
    if (isTouched) {
      onBlur?.();
    }
  });

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div
        className="relative w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] p-[1rem] border border-solid border-gray-900 rounded-[0.4rem] bg-white cursor-pointer"
        onClick={() => {
          setIsOpen((prev) => !prev);
          setIsTouched(true); // 드롭다운 클릭 시 touched 상태 true
        }}
      >
        <span
          className={`absolute top-[1.5rem] w-full text-lg bg-transparent font-regular ml-[0.6rem] ${
            value ? "text-black" : "text-gray-600"
          }`}
        >
          {value || description}
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <DropdownArrowIcon isOpen={isOpen} />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] mt-1 border border-gray-300 rounded-[0.6rem] bg-white z-50 p-[0.8rem] shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              className="group px-8 py-6 text-lg rounded-[0.6rem] flex items-center hover:bg-green-dark hover:text-white cursor-pointer"
              onClick={() => {
                onChange?.(option);
                setIsOpen(false);
                onBlur?.();
              }}
            >
              <span className="opacity-0 group-hover:opacity-100 ml-[-10px] mr-4">
                <DropdownCheckIcon />
              </span>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
