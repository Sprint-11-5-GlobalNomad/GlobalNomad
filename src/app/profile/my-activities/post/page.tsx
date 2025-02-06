"use client";
import { useState } from "react";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider } from "react-hook-form";
import { CATEGORY_TYPES } from "@/app/types/activity-schemas";
import ReservationTimeSelector from "./_components/set-reservation-time";
import BannerImageUploader from "./_components/banner-image-uploader";
import IntroImagesUploader from "./_components/intro-image-uploader";

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
          <BannerImageUploader
            bannerImage={bannerImage}
            setBannerImage={setBannerImage}
          />
          <IntroImagesUploader
            introImages={introImages}
            setIntroImages={setIntroImages}
          />
        </form>
      </FormProvider>
    </div>
  );
}
