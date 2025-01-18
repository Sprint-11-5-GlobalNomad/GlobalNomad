"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

interface DropDownMenuProps {
  onEdit?: () => void;
  onDelete?: () => void;
  children: ReactNode;
}

export default function DropDownMenu({
  onEdit,
  onDelete,
  children,
}: DropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function toggleDropDown() {
    setIsOpen(!isOpen);
  }

  function handleMenuClick(callback?: () => void) {
    if (callback) callback();
    setIsOpen(false);
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      <button 
        onClick={toggleDropDown}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        {children}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 border border-solid border-gray-200 bg-white shadow-lg overflow-hidden rounded-xl"
        >
          <div className="flex flex-col">
            <button
              onClick={() => handleMenuClick(onEdit)}
              style={{ borderBottom: '1px solid var(--color-gray-200)' }}
              className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100"
            >
              수정하기
            </button>
            <button
              onClick={() => handleMenuClick(onDelete)}
              className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100"
            >
              삭제하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}