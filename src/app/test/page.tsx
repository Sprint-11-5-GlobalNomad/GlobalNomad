"use client";

import DropDownMenu from "@/app/more-menu";
import DropdownUse from "../../components/common/ui/card-drop-down";

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-lg space-y-8">
        <h1 className="text-2xl font-bold text-center">드롭다운 메뉴 테스트</h1>

        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">DropdownUse 컴포넌트</h2>
            <DropdownUse />
          </div>

          <div className="flex flex-col items-center space-y-4 justify-start">
            <h2 className="text-xl font-semibold">DropDownMenu 컴포넌트</h2>
            <div className="flex w-full justify-end">
              <DropDownMenu first="수정하기" second="삭제하기" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
