"use client";
import { useState } from "react";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  CATEGORY_TYPES,
  CreateActivityBodyDto,
} from "@/app/types/activity-schemas";
import ReservationTimeSelector from "../../../../components/pages/activity-post-edit/set-reservation-time";
import BannerImageUploader from "../../../../components/pages/activity-post-edit/banner-image-uploader";
import IntroImagesUploader from "../../../../components/pages/activity-post-edit/intro-image-uploader";

type ReservationAvailableTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export default function ActivityPostPage() {
  const methods = useForm<CreateActivityBodyDto>({
    mode: "onBlur", // 필드에서 포커스가 벗어날 때 검증
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = methods;

  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [introImages, setIntroImages] = useState<string[]>([]);
  const [reservationTimes, setReservationTimes] = useState<
    ReservationAvailableTime[]
  >([]);

  const onSubmit = (data: CreateActivityBodyDto) => {
    if (!bannerImage) {
      alert("배너 이미지를 등록해주세요.");
      return;
    }
    if (reservationTimes.length === 0) {
      alert("예약 가능한 시간대를 추가해주세요.");
      return;
    }
    console.log("폼 제출됨", data);
  };

  return (
    <div className="flex flex-row justify-center mt-[14.4rem] mb-[14.4rem] gap-[2.4rem]">
      <UserProfileSidebar page="/profile/my-activities" />
      <FormProvider {...methods}>
        <form
          className="flex flex-col w-[79.2rem] gap-[2.4rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-3xl font-bold font-pretendard">내 체험 등록</h2>
            <Button
              ButtonType="profileSave"
              label="등록하기"
              type="submit"
              disabled={
                !isValid || !bannerImage || reservationTimes.length === 0
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="제목"
              className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("title", { required: "제목을 입력해주세요." })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <Controller
            name="category"
            control={methods.control}
            rules={{ required: "카테고리를 선택해주세요." }}
            render={({ field }) => (
              <SelectDropdown
                options={[...CATEGORY_TYPES]}
                description="카테고리"
                value={field.value || ""}
                onChange={field.onChange} // 부모 상태 업데이트
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}

          <div>
            <textarea
              placeholder="설명"
              className="w-[79.2rem] h-[34.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("description", { required: "설명을 입력해주세요." })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-[1.6rem]">
            <h3 className="font-pretendard text-2xl font-bold">가격</h3>
            <input
              type="number"
              placeholder="가격"
              className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("price", {
                required: "가격을 입력해주세요.",
                min: { value: 1, message: "가격은 1 이상이어야 합니다." },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-[1.6rem]">
            <h3 className="font-pretendard text-2xl font-bold">주소</h3>
            <input
              type="text"
              placeholder="주소를 입력해주세요."
              className="w-[79.2rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("address", { required: "주소를 입력해주세요." })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div>
            <ReservationTimeSelector
              reservationTimes={reservationTimes}
              setReservationTimes={setReservationTimes}
            />
            {reservationTimes.length === 0 && (
              <p className="text-red-500 text-sm mt-2">
                최소 한 개 이상의 예약 가능한 시간을 추가해주세요.
              </p>
            )}
          </div>

          <div>
            <BannerImageUploader
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
            />
            {!bannerImage && (
              <p className="text-red-500 text-sm mt-2">
                배너 이미지를 등록해주세요.
              </p>
            )}
          </div>

          <IntroImagesUploader
            introImages={introImages}
            setIntroImages={setIntroImages}
          />
        </form>
      </FormProvider>
    </div>
  );
}
