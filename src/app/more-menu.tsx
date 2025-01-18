"use client";
import { ReactNode } from "react";

interface DropDownMenuProps {
 children?: ReactNode;
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
      <div 
        className="absolute right-0 mt-2 bg-white shadow-lg overflow-hidden rounded-xl"
        style={{ 
          width: '160px', 
          height: '114px', 
          border: '1px solid var(--color-gray-200)' 
        }}
      >
        <div className="flex flex-col h-full">
            <button
              style={{ 
                borderBottom: '1px solid var(--color-gray-200)',
                height: '57px',
                padding: '0 16px'
              }}
              className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center"
            >
              {first}
            </button>
            <button
              style={{ 
                height: '57px',
                padding: '0 16px'
              }}
              className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center"
            >
              {second}
            </button>
          </div>
        </div>
    </div>
  );
}