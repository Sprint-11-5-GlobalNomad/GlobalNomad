//
/*
import React from 'react';

interface DropdownProps {
  options: string[];
  placeholder?: string;
}

const SimpleDropdown: React.FC<DropdownProps> = ({ 
  options,
  placeholder
}) => {
  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
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

  return (
    <div className="relative w-full max-w-md">
      <div className="relative w-full p-4 border border-solid border-gray-900 rounded-xl bg-white">
        <input
          type="text"
          value={placeholder}
          readOnly
          className="w-full pr-12 text-lg bg-transparent focus:outline-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ArrowIcon />
        </div>
      </div>

      <div className="absolute w-full mt-2 border border-gray-300 rounded-xl bg-white z-50">
        <div className="p-2">
          {options.map((option) => (
            <div
              key={option}
              className="px-8 py-6 text-lg rounded-lg"
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function DropdownUse() {
  const options = ['문화 예술', '식음료', '스포츠', '투어', '관광'];
  
  return (
    <div className="w-full flex items-center justify-center bg-gray-50 p-4">
      <SimpleDropdown
        options={options}
        placeholder="카테고리"
      />
    </div>
  );
}
*/
//