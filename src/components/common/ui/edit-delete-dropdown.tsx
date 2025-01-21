"use client";

import Image from "next/image";
import { useState } from "react";

interface EditDeleteDropdown {
  onEdit?: () => void;
  onDelete?: () => void;
  // http://localhost:3000/test 에서 드롭다운 펼쳐보려면 onEdit? 이런 식으로 해주면 됨.
}

export default function EditDeleteDropdown({
  onEdit,
  onDelete,
}: EditDeleteDropdown) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block" onClick={() => setIsOpen(!isOpen)}>
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Image
          src="/image/meatball.svg"
          alt="수정하기 삭제하기 드롭다운"
          width={40}
          height={40}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 mt-[0.5rem] bg-white shadow-lg overflow-hidden rounded-[0.6rem]
          w-[16rem] border-solid border-[0.1rem] border-gray-200 z-50"
        >
          <ul className="flex flex-col">
            <li
              onClick={onEdit}
              className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 py-[1.8rem]"
            >
              수정하기
            </li>
            <li
              onClick={onDelete}
              className="w-full text-lg text-center font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              py-[1.8rem]"
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
