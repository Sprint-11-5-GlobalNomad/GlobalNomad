interface DropdownArrowIconProps {
  isOpen: boolean;
}

export function DropdownArrowIcon({ isOpen }: DropdownArrowIconProps) {
  return (
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
}
