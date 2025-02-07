"use client";

import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";

const activityCategory = [
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

type ReservationAvailableTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export default function ActivityPostPage() {
  const methods = useForm();
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [reservationTime, setReservationTime] = useState<
    ReservationAvailableTime[]
  >([]);

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setBannerImage(file);
    }
  };

  const handleIntroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files)
        .map((file) => URL.createObjectURL(file))
        .slice(0, 4); // 최대 4개 제한
      setIntroImages(files);
    }
  };

  const removeIntroImage = (index: number) => {
    setIntroImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-row justify-center mt-[14.4rem] mb-[14.4rem] gap-[2.4rem]">
      <UserProfileSidebar page="/profile/my-activities" />
      <FormProvider {...methods}>
        <form className="flex flex-col w-[79.2rem] gap-[2.4rem]">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-3xl font-bold font-pretendard">내 체험 수정</h2>
            <Button ButtonType="profileSave" label="수정하기" />
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
              <div className="flex flex-row gap-[2.1rem]">
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
                </div>
                <button type="button">+</button>
              </div>
              <hr />
              {reservationTime ? (
                <div className="flex flex-row gap-[2.1rem]">
                  <input
                    type="date"
                    className="w-[37.9rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                    disabled
                  />
                  <div className="flex flex-row gap-[1.2rem]">
                    <input
                      type="time"
                      className="w-[14rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                      disabled
                    />
                    <div className="relative top-[1.6rem] font-pretendard text-[2rem] font-bold">
                      ~
                    </div>
                    <input
                      type="time"
                      className="w-[14rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                      disabled
                    />
                  </div>
                  <button>-</button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-[2.4rem]">
            <h3 className="text-2xl font-bold">배너 이미지</h3>
            <div className="relative w-40 h-40 border border-gray-300 rounded-md flex items-center justify-center">
              {bannerImage ? (
                <div className="relative w-40 h-40">
                  <Image
                    src={bannerImage}
                    alt="배너 이미지"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <button
                    onClick={() => setBannerImage(null)}
                    className="absolute top-0 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    className="hidden"
                  />
                  <Image
                    src="/image/set_image_btn.svg"
                    alt="이미지 등록"
                    width={180}
                    height={180}
                  />
                </label>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[2.4rem]">
            <h3 className="text-2xl font-bold">소개 이미지</h3>
            <div className="flex flex-row gap-4 flex-wrap items-center">
              {introImages.map((img, index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 border border-gray-300 rounded-md"
                >
                  <Image
                    src={img}
                    alt="소개 이미지"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                  <button
                    onClick={() => removeIntroImage(index)}
                    className="absolute top-0 right-0 bg-gray-700 text-white text-xs px-2 py-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}

              {introImages.length < 4 && (
                <label className="cursor-pointer w-40 h-40 border border-gray-300 rounded-md flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleIntroUpload}
                    className="hidden"
                  />
                  <Image
                    src="/image/set_image_btn.svg"
                    alt="이미지 등록"
                    width={180}
                    height={180}
                  />
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500">
              *이미지는 최대 4개까지 등록 가능합니다.
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
