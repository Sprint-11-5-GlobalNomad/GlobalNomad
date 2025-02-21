"use client";
import { useEffect, useState } from "react";
import UserProfileSidebar from "@/components/common/layout/profile/my-page-card";
import Button from "@/components/common/ui/button";
import SelectDropdown from "@/components/common/ui/dropdown/select-dropdown";
import { useForm, FormProvider, Controller } from "react-hook-form";
import {
  CATEGORY_TYPES,
  CreateActivityBodyDto,
  UpdateMyActivityBodyDto,
} from "@/app/types/activity-schemas";
import ReservationTimeSelector from "@/components/pages/activity-post-edit/set-reservation-time";
import BannerImageUploader from "@/components/pages/activity-post-edit/banner-image-uploader";
import IntroImagesUploader from "@/components/pages/activity-post-edit/intro-image-uploader";
import { useParams } from "next/navigation";
import { useActivityDetail } from "@/app/react-query/activity-state";
import MessageModal from "@/components/common/ui/modal/message-modal";
import { useUpdateMyActivity } from "@/app/react-query/my-activity-state";

type ReservationAvailableTime = {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
};

export default function ActivityEditPage() {
  const { id } = useParams();
  const activityId = Number(id);
  const { data: activityDetail, isLoading } = useActivityDetail(activityId);
  const updateActivityMutation = useUpdateMyActivity();

  const methods = useForm<CreateActivityBodyDto>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: 0,
      address: "",
    },
  });

  const [existingReservationTimes, setExistingReservationTimes] = useState<
    ReservationAvailableTime[]
  >([]);
  const [addedReservationTimes, setAddedReservationTimes] = useState<
    ReservationAvailableTime[]
  >([]);
  const [removedReservationIds, setRemovedReservationIds] = useState<number[]>(
    []
  );
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const [existingIntroImages, setExistingIntroImages] = useState<
    { id: number; imageUrl: string }[]
  >([]);
  const [newIntroImages, setNewIntroImages] = useState<string[]>([]);
  const [removedIntroImageIds, setRemovedIntroImageIds] = useState<number[]>(
    []
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (activityDetail) {
      setValue("title", activityDetail.title);
      setValue("category", activityDetail.category);
      setValue("description", activityDetail.description);
      setValue("price", activityDetail.price);
      setValue("address", activityDetail.address);
      setBannerImage(activityDetail.bannerImageUrl);

      // 기존 예약 시간 설정
      const initialReservationTimes = activityDetail.schedules.map(
        (schedule) => ({
          id: schedule.id,
          date: schedule.date,
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        })
      );
      setExistingReservationTimes(initialReservationTimes);

      // 서버에 있는 인트로 이미지는 id와 imageUrl로 관리 (서버 데이터에 id가 있다고 가정)
      setExistingIntroImages(activityDetail.subImages);
    }
  }, [activityDetail, setValue]);

  const onSubmit = (data: CreateActivityBodyDto) => {
    if (!bannerImage) {
      alert("배너 이미지를 등록해주세요.");
      return;
    }
    if (existingReservationTimes.length + addedReservationTimes.length === 0) {
      alert("예약 가능한 시간대를 추가해주세요.");
      return;
    }

    const updateData: UpdateMyActivityBodyDto = {
      title: data.title,
      category: data.category,
      description: data.description,
      price: data.price,
      address: data.address,
      bannerImageUrl: bannerImage,
      subImageUrlsToAdd: newIntroImages,
      subImageIdsToRemove: removedIntroImageIds,
      schedulesToAdd: addedReservationTimes.map(
        ({ date, startTime, endTime }) => ({
          date,
          startTime,
          endTime,
        })
      ),
      scheduleIdsToRemove: removedReservationIds,
    };

    updateActivityMutation.mutate(
      { activityId, updateData },
      {
        onSuccess: () => {
          setModalIsOpen(true);
        },
        onError: (error) => {
          console.error("체험 수정 중 오류 발생:", error);
          alert("체험 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        },
      }
    );
  };

  function closeModal() {
    setModalIsOpen(false);
    window.location.href = "/profile/my-activities";
  }

  if (isLoading) return <div>로딩 중...</div>;

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
              내 체험 수정
            </h2>
            <Button
              ButtonType="profileSave"
              label="수정하기"
              type="submit"
              disabled={
                !bannerImage ||
                existingReservationTimes.length +
                  addedReservationTimes.length ===
                  0
              }
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="제목"
              className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("title", { required: "제목을 입력해주세요." })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
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
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div>
            <textarea
              placeholder="설명"
              className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[34.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("description", { required: "설명을 입력해주세요." })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <label className="flex flex-col gap-[1.6rem]">
            <div className="font-pretendard text-2xl font-bold">가격</div>
            <input
              type="number"
              placeholder="가격"
              className="w-[79.2rem] tablet:w-[42.9rem] mobile:w-[34.3rem] h-[5.6rem] rounded-[0.4rem] border-black border-[0.1rem] p-[1.6rem] text-lg font-normal"
              {...register("price", {
                required: "가격을 입력해주세요.",
                min: { value: 1, message: "가격은 1 이상이어야 합니다." },
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </label>

          <div>
            <ReservationTimeSelector
              setAddReservationTimes={setAddedReservationTimes}
              setRemovedReservationIds={setRemovedReservationIds}
              reservationTimes={existingReservationTimes}
              setExistingReservationTimes={setExistingReservationTimes}
            />
          </div>

          <div>
            <BannerImageUploader
              bannerImage={bannerImage}
              setBannerImage={setBannerImage}
            />
          </div>

          {/* 인트로 이미지 컴포넌트에 3개의 상태를 props로 전달 */}
          <IntroImagesUploader
            existingImages={existingIntroImages}
            setExistingImages={setExistingIntroImages}
            newImages={newIntroImages}
            setNewImages={setNewIntroImages}
            setRemovedImages={setRemovedIntroImageIds}
          />
        </form>
      </FormProvider>
      <MessageModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        message={"체험 수정이 완료되었습니다."}
      />
    </div>
  );
}
