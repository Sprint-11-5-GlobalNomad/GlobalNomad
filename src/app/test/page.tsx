"use client";

import DropDownMenu from "@/app/edit-or-delete"; 

export default function TestPage() {
  const handleEdit = () => {
    alert("수정 버튼이 클릭되었습니다.");
  };

  const handleDelete = () => {
    alert("삭제 버튼이 클릭되었습니다.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-12">드롭다운 메뉴 테스트</h1>
        

          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">아이콘 드롭다운</h2>
            <DropDownMenu>
              <button className="p-2 hover:bg-gray-100 rounded-full text-2xl">
                ⋮
              </button>
            </DropDownMenu>
          </div>
        </div>
      </div>
  );
}



