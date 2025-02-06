import Image from "next/image";

interface BannerImageUploaderProps {
  bannerImage: string | null;
  setBannerImage: (image: string | null) => void;
}

export default function BannerImageUploader({
  bannerImage,
  setBannerImage,
}: BannerImageUploaderProps) {
  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setBannerImage(file);
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      <h3 className="text-2xl font-bold">배너 이미지</h3>
      <div className="relative w-[38.4rem] h-[18rem] border border-gray-300 rounded-md flex items-center justify-start">
        {bannerImage ? (
          <div className="flex flex-row gap-[2.4rem]">
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
            <div className="relative w-[18rem] h-[18rem] border-[0.1rem] border-black">
              <Image
                src={bannerImage}
                alt="배너 이미지"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <button
                onClick={() => setBannerImage(null)}
                className="absolute top-0 right-0 bg-gray-700 text-white text-xs px-3 py-1 rounded-full"
                type="button"
              >
                X
              </button>
            </div>
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
  );
}
