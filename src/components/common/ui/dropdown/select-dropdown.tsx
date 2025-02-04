"use client";

import React, { useState } from "react";
import { DropdownArrowIcon } from "../../icons/dropdown-arrow-icon";
import { DropdownCheckIcon } from "../../icons/dropdown-check-icon";

interface SelectDropdownProps {
  options: string[];
  description: string;
}

export default function SelectDropdown({
  options,
  description,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <div
      className="relative w-full max-w-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="relative w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] p-[1rem] border border-solid border-gray-900 rounded-[0.4rem] bg-white">
        <span
          className={`absolute top-[1.5rem] w-full text-lg bg-transparent font-regular ml-[0.6rem] ${selectedOption ? "text-black" : "text-gray-600"}`}
        >
          {selectedOption || description}
        </span>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <DropdownArrowIcon isOpen={isOpen} />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] mt-2 border border-gray-300 rounded-[0.6rem] bg-white z-50 p-[0.8rem]">
          {options.map((option) => (
            <li
              key={option}
              className="group px-8 py-6 text-lg rounded-[0.6rem] flex items-center hover:bg-green-dark hover:text-white"
              onClick={() => {
                setSelectedOption(option);
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
