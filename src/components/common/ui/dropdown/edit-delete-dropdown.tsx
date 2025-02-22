"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import UseOutsideClick from "@/hooks/use-outside-click";

interface EditDeleteDropdownProps {
  EditRoute: string;
  onDelete: () => void;
}

export default function EditDeleteDropdown({
  EditRoute,
  onDelete,
}: EditDeleteDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 외부 클릭 감지 훅 사용
  const dropdownRef = UseOutsideClick(() => setIsOpen(false));

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="hover:bg-gray-100 rounded-full mobile:w-[3.2rem] mobile:h-[3.2rem]"
        onClick={toggleDropdown}
      >
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
            <Link href={EditRoute}>
              <li
                onClick={(e) => e.stopPropagation()} // 클릭 시 드롭다운 닫히지 않도록 방지
                className="w-full text-lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 py-[1.8rem]"
              >
                수정하기
              </li>
            </Link>
            <li
              onClick={onDelete}
              className="w-full text-lg text-center font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              py-[1.8rem] cursor-pointer"
            >
              삭제하기
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
