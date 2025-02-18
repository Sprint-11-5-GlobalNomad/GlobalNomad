import Image from "next/image";
import { useUploadActivityImage } from "@/app/react-query/activity-state";

interface BannerImageUploaderProps {
  bannerImage: string | null;
  setBannerImage: (image: string | null) => void;
}

export default function BannerImageUploader({
  bannerImage,
  setBannerImage,
}: BannerImageUploaderProps) {
  const uploadImageMutation = useUploadActivityImage();

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      uploadImageMutation.mutate(file, {
        onSuccess: (uploadedUrl) => {
          setBannerImage(uploadedUrl.activityImageUrl);
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h3 className="text-2xl font-bold">배너 이미지</h3>
      <div className="relative w-[38.4rem] tablet:w-[42.8rem] mobile:w-[34.2rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem] border border-gray-300 rounded-md flex items-center justify-start">
        {bannerImage ? (
          <div className="flex flex-row gap-[2.4rem] tablet:gap-[1.6rem] mobile:gap-[0.8rem]">
            <label className="cursor-pointer w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerUpload}
                className="hidden"
              />
              <Image
                src="/image/set_image_btn.svg"
                alt="이미지 등록"
                width={204}
                height={204}
              />
            </label>
            <div className="relative w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]">
              <Image
                src={bannerImage}
                alt="배너 이미지"
                layout="fill"
                objectFit="cover"
                className="rounded-[2.4rem] border-[0.1rem] border-solid border-black"
              />
              <button
                onClick={() => setBannerImage(null)}
                className="absolute top-[-2rem] tablet:top-[-1rem] mobile:top-[-0.8rem] right-[-2rem] tablet:right-[-1rem] mobile:right-[-0.8rem] bg-[rgba(0,0,0,0.8)] text-white w-[4rem] tablet:w-[3.2rem] mobile:w-[2.4rem] h-[4rem] tablet:h-[3.2rem] mobile:h-[2.4rem] text-xl tablet:text-lg mobile:text-base px-3 py-1 rounded-full"
                type="button"
              >
                X
              </button>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleBannerUpload}
              className="hidden"
            />
            <Image
              src="/image/set_image_btn.svg"
              alt="이미지 등록"
              width={204}
              height={204}
            />
          </label>
        )}
      </div>
      <p className="text-sm text-gray-500">
        *이미지는 png, jpg, jpeg 확장자만 등록 가능합니다.
      </p>
    </div>
  );
}
