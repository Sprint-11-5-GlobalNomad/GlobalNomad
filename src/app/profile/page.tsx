"use client";

import React from "react";
import UserProfileSidebar from "@/components/my-page-card"; // UserProfileSidebar 경로에 맞게 수정하세요

export default function ProfilePage() {
  return (
    <div className="flex justify-center py-[7.2rem]">
      <div className="flex gap-[2.4rem]">
        {/* Sidebar */}
        <div>
          <UserProfileSidebar />
        </div>

        {/* Content */}
        <div className="flex-1 rounded-[0.75rem] h-auto">
          {/* Header */}
          <div className="flex justify-between items-center w-[78rem] mb-[2.4rem] pb-[2.4rem]">
            <h2 className="text-[3.2rem] font-bold">내 정보</h2>
            <button className="bg-nomad-black w-[12rem] h-[4.8rem] text-white text-[1.6rem] px-[1.5rem] py-[0.75rem] rounded-[0.4rem] font-bold">
              저장하기
            </button>
          </div>

          {/* Form */}
          <div className="space-y-[3.2rem]">
            {/* 닉네임 */}
            <div>
              <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                닉네임
              </label>
              <input
                type="text"
                className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem]"
              />
            </div>

            {/* 이메일 */}
            <div>
              <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                이메일
              </label>
              <input
                type="email"
                disabled
                className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem] bg-gray-100"
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                비밀번호
              </label>
              <input
                type="password"
                className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem]"
                placeholder="8자 이상 입력해 주세요"
              />
            </div>

            {/* 비밀번호 재입력 */}
            <div>
              <label className="block text-[2.4rem] font-bold mb-[0.5rem]">
                비밀번호 재입력
              </label>
              <input
                type="password"
                className="w-full h-[4.2rem] border border-gray-300 rounded-[0.5rem] px-[1.2rem] text-[1.2rem]"
                placeholder="비밀번호를 한번 더 입력해 주세요"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
