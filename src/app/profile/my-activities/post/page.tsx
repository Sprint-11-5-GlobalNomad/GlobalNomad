"use client";

import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import { CATEGORY_TYPES } from "@/app/types/activity-schemas";
import ReservationTimeSelector from "./_components/set-reservation-time";

type ReservationAvailableTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export default function ActivityPostPage() {
  const methods = useForm();
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [reservationTimes, setReservationTimes] = useState<
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
            <h2 className="text-3xl font-bold font-pretendard">내 체험 등록</h2>
            <Button ButtonType="profileSave" label="등록하기" />
          </div>
          <input
            type="text"
            placeholder="제목"
            className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
          />
          <SelectDropdown
            options={[...CATEGORY_TYPES]}
            description={"카테고리"}
          />
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
          <ReservationTimeSelector
            reservationTimes={reservationTimes}
            setReservationTimes={setReservationTimes}
          />
          <div className="flex flex-col gap-[2.4rem]">
            <h3 className="text-2xl font-bold">배너 이미지</h3>
            <div className="relative w-[18rem] h-[18rem] border border-gray-300 rounded-md flex items-center justify-center">
              {bannerImage ? (
                <div className="relative w-[18rem] h-[18rem]">
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
                  className="relative w-[18rem] h-[18rem] border border-gray-300 rounded-md"
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
                <label className="cursor-pointer w-[18rem] h-[18rem] border border-gray-300 rounded-md flex items-center justify-center">
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
