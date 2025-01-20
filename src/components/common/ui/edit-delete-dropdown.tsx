"use client";

import { useState } from "react";

export default function EditDeleteDropdown({}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block" onClick={() => setIsOpen(!isOpen)}>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <div className="flex flex-col gap-1">
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-2 bg-white shadow-lg overflow-hidden rounded-xl
          w-[16rem] h-[11.4rem] border-solid border-[0.1rem] border-gray-200"
        >
          <ul className="flex flex-col h-full">
            <li
              className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 h-[5.7rem] px-[1.6rem]"
            >
              수정하기
            </li>
            <li
              className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              h-[5.7rem] px-[1.6rem]"
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
