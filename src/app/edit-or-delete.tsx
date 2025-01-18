//점3개 드롭다운

"use client";
import { ReactNode } from "react";
interface DropDownMenuProps {
 children: ReactNode;
 first?: string;
 second?: string;
}

export default function DropDownMenu({
  children,
  first="수정하기",
  second="삭제하기",
}: DropDownMenuProps) {
  return (
    <div className="relative inline-block">
      <button 
        className="p-2 hover:bg-gray-100 rounded-full"
      >
          <div className="flex flex-col gap-1">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
      </button>
      <div className="absolute right-0 mt-2 w-40 border border-solid border-gray-200 bg-white shadow-lg overflow-hidden rounded-xl">
        <div className="flex flex-col">
            <button
              style={{ borderBottom: '1px solid var(--color-gray-200)' }}
              className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100"
            >
              {first}
            </button>
            <button
              className="w-full px-4 py-3 text-lg font-medium text-gray-900 hover:bg-gray-100"
            >
              {second}
            </button>
          </div>
        </div>
    </div>
  );
}