import Image from "next/image";
import { useUploadActivityImage } from "@/app/react-query/activity-state";

interface IntroImagesUploaderProps {
  existingImages?: { id: number; imageUrl: string }[];
  setExistingImages?: React.Dispatch<
    React.SetStateAction<{ id: number; imageUrl: string }[]>
  >;
  newImages: string[];
  setNewImages: React.Dispatch<React.SetStateAction<string[]>>;
  setRemovedImages?: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function IntroImagesUploader({
  existingImages = [],
  setExistingImages,
  newImages,
  setNewImages,
  setRemovedImages,
}: IntroImagesUploaderProps) {
  const uploadImageMutation = useUploadActivityImage();

  const handleIntroUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const totalImagesCount = existingImages.length + newImages.length;
      const maxAllowed = 4;
      const files = Array.from(event.target.files).slice(
        0,
        maxAllowed - totalImagesCount
      );

      files.forEach((file) => {
        uploadImageMutation.mutate(file, {
          onSuccess: (uploadedUrl) => {
            setNewImages((prev) =>
              [...prev, uploadedUrl.activityImageUrl].slice(0, maxAllowed)
            );
          },
        });
      });
    }
  };

  const removeExistingImage = (id: number) => {
    if (setExistingImages && setRemovedImages) {
      setExistingImages((prev) => prev.filter((img) => img.id !== id));
      setRemovedImages((prev) => [...prev, id]);
    }
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h3 className="text-2xl font-bold">소개 이미지</h3>
      <div className="flex flex-row gap-[2.4rem] tablet:gap-[1.6rem] mobile:gap-[0.8rem] flex-wrap items-center">
        <label className="cursor-pointer w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]">
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleIntroUpload}
            className="hidden"
          />
          <Image
            src="/image/set_image_btn.svg"
            alt="이미지 등록"
            width={204}
            height={204}
          />
        </label>
        {existingImages.map((img) => (
          <div
            key={img.id}
            className="relative w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]"
          >
            <Image
              src={img.imageUrl}
              alt="소개 이미지"
              layout="fill"
              objectFit="cover"
              className="rounded-[2.4rem] border-[0.1rem] border-solid border-black"
            />
            {setExistingImages && setRemovedImages && (
              <button
                onClick={() => removeExistingImage(img.id)}
                className="absolute top-[-2rem] tablet:top-[-1rem] mobile:top-[-0.8rem] right-[-2rem] tablet:right-[-1rem] mobile:right-[-0.8rem] bg-[rgba(0,0,0,0.8)] text-white w-[4rem] tablet:w-[3.2rem] mobile:w-[2.4rem] h-[4rem] tablet:h-[3.2rem] mobile:h-[2.4rem] text-xl tablet:text-lg mobile:text-base px-3 py-1 rounded-full"
                type="button"
              >
                X
              </button>
            )}
          </div>
        ))}
        {newImages.map((img, index) => (
          <div
            key={index}
            className="relative w-[18rem] tablet:w-[20.4rem] mobile:w-[16.7rem] h-[18rem] tablet:h-[20.4rem] mobile:h-[16.7rem]"
          >
            <Image
              src={img}
              alt="소개 이미지"
              layout="fill"
              objectFit="cover"
              className="rounded-[2.4rem] border-[0.1rem] border-solid border-black"
            />
            <button
              onClick={() => removeNewImage(index)}
              className="absolute top-[-2rem] tablet:top-[-1rem] mobile:top-[-0.8rem] right-[-2rem] tablet:right-[-1rem] mobile:right-[-0.8rem] bg-[rgba(0,0,0,0.8)] text-white w-[4rem] tablet:w-[3.2rem] mobile:w-[2.4rem] h-[4rem] tablet:h-[3.2rem] mobile:h-[2.4rem] text-xl tablet:text-lg mobile:text-base px-3 py-1 rounded-full"
              type="button"
            >
              X
            </button>
          </div>
        ))}
      </div>
      <p className="text-sm text-red-500">
        *이미지는 최대 4개까지 등록 가능합니다.
      </p>
    </div>
  );
}
