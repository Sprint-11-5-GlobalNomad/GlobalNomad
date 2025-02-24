import { DropdownArrowIcon } from "@/components/common/icons/dropdown-arrow-icon";
import { DropdownCheckIcon } from "@/components/common/icons/dropdown-check-icon";
import UseOutsideClick from "@/hooks/use-outside-click";
import { useState } from "react";

interface SelectDropdownProps {
  options: string[];
  description: string;
  onSelect: (option: string) => void;
  selectedOption: string | null;
}

export default function TimeDropdown({
  options,
  description,
  selectedOption,
  onSelect,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = UseOutsideClick(() => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
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
        <ul
          className="absolute w-[14rem] tablet:w-[10.4rem] mobile:w-[7.9rem] mt-2 border border-gray-300 rounded-[0.6rem] bg-white z-50 p-[0.8rem] 
          max-h-[18rem] overflow-y-auto custom-scrollbar border-solid"
        >
          {options.map((option) => (
            <li
              key={option}
              className="group desktop:px-8 desktop:py-6 text-lg tablet:w-[8rem] tablet:h-[4rem] mobile:w-[5.5rem] mobile:h-[4rem] rounded-[0.6rem] flex items-center hover:bg-green-dark hover:text-white"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <span className="opacity-0 group-hover:opacity-100 ml-[-1rem] tablet:ml-3 mr-3 mobile:hidden mobile:ml-1 mobile:mr-[-1rem]">
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
