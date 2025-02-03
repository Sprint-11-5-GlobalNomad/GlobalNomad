import Image from "next/image";

interface ErrorIndicatorProps {
  width: number;
  height: number;
}

export function ErrorIndicator({ width, height }: ErrorIndicatorProps) {
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
        🥲 오류가 발생했습니다 🙏🏻
      </div>
    </div>
  );
}
