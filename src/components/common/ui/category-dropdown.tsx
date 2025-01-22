import React, { useState } from "react";

interface CategoryDropdownProps {
  options: string[];
  description: string;
}

export default function CategoryDropdown({
  options,
  description,
}: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-6 h-6 transform transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 9l5 5 5-5" />
    </svg>
  );

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  return (
    <div
      className="relative w-full max-w-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="relative w-[80rem] p-[1rem] border border-solid border-gray-900 rounded-[0.4rem] bg-white">
        <p className="w-full text-lg bg-transparent text-gray-600 font-regular ml-[0.6rem]">
          {selectedOption || description}
        </p>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowIcon />
        </div>
      </div>

      {isOpen && (
        <ul className="absolute w-[80rem] mt-2 border border-gray-300 rounded-[0.6rem] bg-white z-50 p-[0.8rem]">
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
                <CheckIcon />
              </span>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
