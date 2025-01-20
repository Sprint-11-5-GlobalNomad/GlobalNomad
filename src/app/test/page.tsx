"use client";

import FilterDropdown from "@/components/common/ui/filter-dropdown";
import CategoryDropdown from "../../components/common/ui/category-dropdown";
import EditDeleteDropdown from "@/components/common/ui/edit-delete-dropdown";

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 rounded-2xl shadow-lg space-y-8">
        <h1 className="text-2xl font-bold text-center">드롭다운 메뉴 테스트</h1>

        <div className="flex-colmun gap-16">
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">카테고리 드롭다운</h2>
            <CategoryDropdown
              options={["문화 예술", "식음료", "스포츠", "투어", "관광"]}
              description="카테고리"
            />
          </div>

          <div className="flex flex-col items-center space-y-4 justify-start">
            <h2 className="text-xl font-semibold">수정 삭제 드롭다운</h2>
            <div className="flex w-full justify-end">
              <EditDeleteDropdown />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 justify-start">
            <h2 className="text-xl font-semibold">필터 드롭다운</h2>
            <div className="flex w-full justify-end">
              <FilterDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
