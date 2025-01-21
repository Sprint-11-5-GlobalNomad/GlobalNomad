"use client";

import Image from "next/image";
import { useState } from "react";

interface FilterDropdownProps {
  description: string;
  options: string[];
  size: "large" | "small";
}

export default function FilterDropdown({
  description,
  options,
  size,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: "w-[12.7rem]",
    large: "w-[16rem]",
  }[size];

  return (
    <div
      className="relative inline-block bg-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex">
        <button
          className={`h-[5.3rem] px-[2rem] py-[1.6rem] text-2lg flex-between
            border-solid border-[0.1rem] rounded-[1.5rem] border-green-dark ${sizeClasses}`}
        >
          {description}
          <Image
            src="/image/green-arrow-down.svg"
            alt="필터 드롭다운 방향 화살표"
            width={22}
            height={22}
            className={`transform transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute right-0 mt-[0.8rem] bg-white shadow-lg overflow-hidden rounded-xl
        border-solid border-[0.1rem] border-gray-200 z-50 ${sizeClasses}`}
        >
          <ul className="flex flex-col h-full">
            {options.map((option) => (
              <li
                key={option}
                className="w-full text-2lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 h-[5.7rem] py-[1.8rem]"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
