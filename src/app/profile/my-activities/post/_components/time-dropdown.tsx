"use client";

import { DropdownArrowIcon } from "@/components/common/icons/dropdown-arrow-icon";
import { DropdownCheckIcon } from "@/components/common/icons/dropdown-check-icon";
import React, { useState } from "react";

interface SelectDropdownProps {
  options: string[];
  description: string;
  onSelect: (option: string) => void; // 추가된 프롭
}

export default function TimeDropdown({
  options,
  description,
  onSelect,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div
      className="relative w-full max-w-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="relative w-[14rem] tablet:w-[10.4rem] mobile:w-[7.9rem] h-[5.6rem] mobile:h-[4.4rem] p-[1rem] border border-solid border-gray-900 rounded-[0.4rem] bg-white">
        <span
          className={`absolute top-[1.5rem] mobile:top-[1rem] w-full text-lg bg-transparent font-regular ml-[0.6rem] ${
            selectedOption ? "text-black" : "text-gray-600"
          }`}
        >
          {selectedOption || description}
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <DropdownArrowIcon isOpen={isOpen} />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute w-[14rem] tablet:w-[10.4rem] mobile:w-[7.9rem] mt-2 border border-gray-300 rounded-[0.6rem] bg-white z-50 p-[0.8rem]">
          {options.map((option) => (
            <li
              key={option}
              className="group px-8 py-6 text-lg rounded-[0.6rem] flex items-center hover:bg-green-dark hover:text-white"
              onClick={() => {
                setSelectedOption(option);
                onSelect(option);
                setIsOpen(false);
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
