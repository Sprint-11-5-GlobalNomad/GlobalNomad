"use client";

import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider } from "react-hook-form";

const activityCategory = [
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

export default function ActivityPostPage() {
  const methods = useForm();

  return (
    <div className="flex flex-row justify-center mt-[14.4rem] gap-[2.4rem]">
      <UserProfileSidebar page="/profile/my-activities" />
      <FormProvider {...methods}>
        <form className="flex flex-col w-[79.2rem] gap-[2.4rem]">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-3xl font-bold font-pretendard">내 체험 등록</h2>
            <Button type="profileSave" label="등록하기" />
          </div>
          <input
            type="text"
            placeholder="제목"
            className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
          />
          <SelectDropdown options={activityCategory} description={"카테고리"} />
          <textarea
            name="description"
            placeholder="설명"
            className="w-[79.2rem] h-[34.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
          ></textarea>
          <div className="flex flex-col gap-[1.6rem]">
            <h3 className="font-pretendard text-2xl font-bold">가격</h3>
            <input
              type="number"
              placeholder="가격"
              className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
            />
          </div>
          <div className="flex flex-col gap-[1.6rem]">
            <h3 className="font-pretendard text-2xl font-bold">주소</h3>
            <input
              type="text"
              placeholder="주소를 입력해주세요."
              className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
            />
          </div>
          <div className="flex flex-col gap-[2.4rem]">
            <h3 className="font-pretendard text-2xl font-bold">
              예약 가능한 시간대
            </h3>
            <div className="flex flex-col gap-[2.1rem]">
              <div className="flex flex-row gap-[2rem]">
                <div className="flex flex-col gap-[1rem]">
                  <h4 className="font-pretendard text-xl font-medium text-gray-900">
                    날짜
                  </h4>
                  <input
                    type="date"
                    className="w-[37.9rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                  />
                </div>
                <div className="flex flex-row gap-[1.2rem] relative">
                  <div className="flex flex-col gap-[1rem]">
                    <h4 className="font-pretendard text-xl font-medium text-gray-900">
                      시작 시간
                    </h4>
                    <input
                      type="time"
                      className="w-[14rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                    />
                  </div>
                  <div className="relative top-[5.9rem] font-pretendard text-[2rem] font-bold">
                    ~
                  </div>
                  <div className="flex flex-col gap-[1rem]">
                    <h4 className="font-pretendard text-xl font-medium text-gray-900">
                      종료 시간
                    </h4>
                    <input
                      type="time"
                      className="w-[14rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                    />
                  </div>
                  <button type="button">+</button>
                </div>
                <hr />
                <div></div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-pretendard text-2xl font-bold">배너 이미지</h3>
            <div>
              <input type="file" accept="image/*" />
            </div>
          </div>
          <div>
            <h3 className="font-pretendard text-2xl font-bold">소개 이미지</h3>
            <div>
              <input type="file" accept="image/*" multiple />
            </div>
            <p>*이미지는 최대 4개까지 등록 가능합니다.</p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
