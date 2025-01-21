"use client";

import { useUserStore } from "@/stores/user-store";
import Link from "next/link";
import UserNotifications from "@/components/common/layout/navigation/user-notifications";
import Image from "next/image";
import { useState } from "react";
import UseOutsideClick from "@/hooks/use-outside-click";

export default function UserMenu() {
  const { isAuthenticated, logout, currentUser } = useUserStore(
    (state) => state
  );
  // useUserStore(state) 가 아닌 이유: useUserStore 는 기본적으로 선택자 함수를 인수로 받도록 설계되어 있기 때문

  const [isOpen, setIsOpen] = useState(false);
  const ref = UseOutsideClick(() => setIsOpen(false));

  return (
    <>
      {isAuthenticated ? (
        <div className="flex-between gap-[2.5rem] relative">
          <UserNotifications />
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="flex-between gap-[1rem] border-solid border-l-[0.1rem] border-gray-300 pl-[2rem]"
          >
            <Image
              src={currentUser?.profileImageUrl || "/image/profile_default.svg"}
              alt="프로필 이미지"
              width={32}
              height={32}
            />
            <span className="text-md">{currentUser?.nickname || "닉네임"}</span>
            {isOpen && (
              <div
                ref={ref}
                className="absolute top-full left-[5rem] mt-[2rem] bg-white shadow-lg overflow-hidden rounded-[0.6rem]
            border-solid border-[0.1rem] border-gray-200 z-50 w-[12.7rem] tablet:left-[4rem] mobile:left-[3.2rem]"
              >
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/profile"
                      className="w-full text-2lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 h-[5.7rem] py-[1.8rem]"
                    >
                      마이 페이지
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="w-full text-2lg font-medium text-gray-900 hover:bg-gray-100 flex items-center justify-center
              border-b-[0.1rem] border-solid border-gray-200 h-[5.7rem] py-[1.8rem]"
                    >
                      로그아웃
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-[2.5rem]">
          <Link href="/login" className="text-md text-black">
            로그인
          </Link>
          <Link href="/signup" className="text-md text-black">
            회원가입
          </Link>
        </div>
      )}
    </>
  );
}
