import Image from "next/image";

interface MarkerInfoProps {
  placeName: string;
}

export default function MarkerInfo({ placeName }: MarkerInfoProps) {
  return (
    <div
      className="rounded-[2rem] border-[0.2rem] border-solid border-blue
    w-[15rem] max-w-[20rem] h-[3rem] bg-white flex items-center gap-[0.3rem] p-[0.5rem]"
    >
      <Image src="/image/marker.png" alt="지도 마커" width={14} height={14} />
      <span className="text-md font-semiBold overflow-hidden text-ellipsis whitespace-nowrap">
        {placeName}
      </span>
    </div>
  );
}
