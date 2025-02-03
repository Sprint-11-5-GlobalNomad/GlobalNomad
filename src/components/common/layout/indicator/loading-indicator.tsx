import Image from "next/image";

interface LoadingIndicatorProps {
  width: number;
  height: number;
}

export function LoadingIndicator({ width, height }: LoadingIndicatorProps) {
  return (
    <div className="flex flex-col items-center mb-[2rem]">
      <Image
        src="/image/empty.svg"
        alt="빈 파일"
        className="w-[20rem] h-[20rem] desktop:w-[24rem] desktop:h-[24rem]"
        width={width}
        height={height}
      />
      <div className="font-pretendard text-xl font-semiBold text-left text-gray-800">
        🤔 로딩 중이에요 🌀
      </div>
    </div>
  );
}
