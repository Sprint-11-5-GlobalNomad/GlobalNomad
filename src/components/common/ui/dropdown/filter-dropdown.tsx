"use client";

import Image from "next/image";
import { useState } from "react";

interface FilterDropdownProps {
  description: string;
  options: string[];
  size: "large" | "small";
  onSelect?: (option: string) => void; // 추가
}

export default function FilterDropdown({
  description,
  options,
  size,
  onSelect,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: "w-[12.7rem]",
    large: "w-[16rem]",
  }[size];

  const handleOptionClick = (option: string) => {
    if (onSelect) {
      onSelect(option);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" onClick={() => setIsOpen(!isOpen)}>
      <div className="flex">
        <button
          className={`h-[5.3rem] px-[2rem] py-[1.6rem] text-2lg flex-between bg-white
            border-solid border-[0.1rem] rounded-[1.5rem] border-green-dark
            mobile:w-[9rem] mobile:h-[4.1rem] mobile:py-[1rem] mobile:text-md ${sizeClasses}`}
        >
          {description}
          <Image
            src="/image/green-arrow-down.svg"
            alt="필터 드롭다운 방향 화살표"
            width={22}
            height={22}
            className={`transform transition-transform duration-500 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute right-0 mt-[0.8rem] bg-white shadow-lg
            overflow-hidden rounded-[0.6rem] border-solid border-[0.1rem] border-gray-200
            z-50 mobile:w-[9rem] ${sizeClasses}`}
        >
          <ul className="flex flex-col h-full">
            {options.map((option) => (
              <li
                key={option}
                className="w-full text-2lg font-medium text-gray-900 hover:bg-gray-100
                flex items-center justify-center border-b-[0.1rem] border-solid border-gray-200
                h-[5.7rem] py-[1.8rem] mobile:h-[4.1rem] mobile:text-md"
                onClick={() => handleOptionClick(option)} // 클릭 시 처리
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
