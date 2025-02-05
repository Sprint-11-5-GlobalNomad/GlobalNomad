import { useActivityDetail } from "@/app/react-query/activity-state";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ActivityImages() {
  const { id } = useParams();
  const { data: activity } = useActivityDetail(Number(id));
  const subImageCount = activity?.subImages.length;

  return (
    <div className="w-[119.8rem] h-[53.4rem] mb-[8.5rem]">
      {subImageCount === 0 ? (
        <Image
          src={activity!.bannerImageUrl}
          alt={`${activity?.title} 배너 이미지`}
          width={1198}
          height={534}
          className="rounded-[1.2rem] w-full h-full object-cover"
        />
      ) : (
        <div className="w-[119.8rem] h-[53.4rem] flex gap-[0.8rem] mb-[8.5rem]">
          <Image
            src={activity!.bannerImageUrl}
            alt={`${activity?.title} 배너 이미지`}
            width={595}
            height={534}
            className="rounded-[1.2rem]"
          />
          <div
            className={`grid gap-[0.8rem] ${
              subImageCount === 1
                ? "grid-cols-1 grid-rows-1"
                : subImageCount === 2
                  ? "grid-cols-1 grid-rows-2"
                  : "grid-cols-2 grid-rows-2"
            } w-full h-full`}
          >
            {activity?.subImages.map((subImage, index) => {
              const isThirdImageWithFullWidth =
                subImageCount === 3 && index === 2;

              return (
                <Image
                  key={subImage.id}
                  src={subImage.imageUrl}
                  alt={`${activity.title} 소개 이미지 ${index + 1}`}
                  width={isThirdImageWithFullWidth ? 595 : 293.5}
                  height={263}
                  className={`${isThirdImageWithFullWidth ? "col-span-2 w-full" : "w-full h-full"}
                  w-full h-full object-cover rounded-[1.2rem]`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
