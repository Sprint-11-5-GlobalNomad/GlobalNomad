"use client";
import { useState, useRef } from "react";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  CATEGORY_TYPES,
  CreateActivityBodyDto,
} from "@/app/types/activity-schemas";
import ReservationTimeSelector from "../../../../../components/pages/activity-post-edit/set-reservation-time";
import BannerImageUploader from "../../../../../components/pages/activity-post-edit/banner-image-uploader";
import IntroImagesUploader from "../../../../../components/pages/activity-post-edit/intro-image-uploader";
import { useCreateActivity } from "@/app/react-query/activity-state";
import MessageModal from "@/components/common/ui/modal/message-modal";
import KakaoMapAddress from "@/components/pages/activity-post-edit/kakao-map-address";

type ReservationAvailableTime = {
  date: string;
  startTime: string;
  endTime: string;
};

export default function ActivityPostPage() {
  const methods = useForm<CreateActivityBodyDto>({ mode: "onBlur" });

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
  const [addReservationTimes, setAddReservationTimes] = useState<
    ReservationAvailableTime[]
  >([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  // refs for focus
  const reservationRef = useRef<HTMLDivElement>(null);
  const bannerImageRef = useRef<HTMLDivElement>(null);

  const { mutate, isPending } = useCreateActivity();

  const onSubmit = (data: CreateActivityBodyDto) => {
    setShowError(true);

    if (reservationTimes.length === 0) {
      reservationRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      reservationRef.current?.focus();
      return;
    }

    if (!bannerImage) {
      bannerImageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      bannerImageRef.current?.focus();
      return;
    }

    const activityData: CreateActivityBodyDto = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      address: data.address,
      bannerImageUrl: bannerImage as string,
      subImageUrls: introImages.length > 0 ? introImages : undefined,
      schedules: addReservationTimes.map(({ date, startTime, endTime }) => ({
        date,
        startTime,
        endTime,
      })),
    };

    mutate(activityData, {
      onSuccess: () => {
        setModalIsOpen(true);
      },
    });
  };

  function closeModal() {
    setModalIsOpen(false);
    window.location.href = "/profile/my-activities";
  }

  return (
    <div className="flex flex-row justify-center mt-[14.4rem] mb-[14.4rem]">
      <div className="mobile:hidden tablet:ml-[2.4rem]">
        <UserProfileSidebar page={"/profile/my-activities"} />
      </div>
      <FormProvider {...methods}>
        <form
          className="flex flex-col w-[79.2rem] gap-[2.4rem] desktop:ml-[2.4rem] ml-[1.6rem]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-row gap-[51.9rem] tablet:gap-[15.5rem] mobile:gap-[6.9rem] items-center">
            <h2 className="text-3xl font-bold font-pretendard w-[16rem]">
              내 체험 등록
            </h2>
            <Button
              ButtonType="profileSave"
              label={isPending ? "등록 중..." : "등록하기"}
              type="submit"
              disabled={!isValid}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="제목"
              className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("title", {
                required: "제목을 입력해주세요.",
                maxLength: {
                  value: 20,
                  message: "제목은 최대 20자까지 입력할 수 있습니다.",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Controller
              name="category"
              control={methods.control}
              rules={{ required: "카테고리를 선택해주세요." }}
              render={({ field }) => (
                <SelectDropdown
                  options={[...CATEGORY_TYPES]}
                  description="카테고리"
                  value={field.value || ""}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              placeholder="설명"
              className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[34.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("description", { required: "설명을 입력해주세요." })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-2">
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="flex flex-col gap-[1.6rem]">
            <div className="font-pretendard text-2xl font-bold">가격</div>
            <div>
              <input
                type="number"
                placeholder="가격"
                className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
                {...register("price", {
                  required: "가격을 입력해주세요.",
                  min: {
                    value: 1000,
                    message: "가격은 1000원 이상이어야 합니다.",
                  },
                  max: {
                    value: 1000000,
                    message: "가격은 100만원 이하이어야 합니다.",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.price.message}
                </p>
              )}
            </div>
          </label>

          <label className="flex flex-col gap-[1.6rem]">
            <div className="font-pretendard text-2xl font-bold">주소</div>
            <KakaoMapAddress />
          </label>

          <div ref={reservationRef} tabIndex={-1}>
            <ReservationTimeSelector
              reservationTimes={reservationTimes}
              setAddReservationTimes={setAddReservationTimes}
              setExistingReservationTimes={setReservationTimes}
            />
            {showError && reservationTimes.length === 0 && (
              <p className="text-red-500 text-sm mt-2">
                최소 한 개 이상의 예약 가능한 시간을 추가해주세요.
              </p>
            )}
          </div>

          <div ref={bannerImageRef} tabIndex={-1}>
            <BannerImageUploader
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
            />
            {showError && !bannerImage && (
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
      <MessageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        message={"체험 등록이 완료되었습니다."}
      />
    </div>
  );
}
