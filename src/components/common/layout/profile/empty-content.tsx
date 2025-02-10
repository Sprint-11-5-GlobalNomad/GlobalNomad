import Image from "next/image";

interface EmptyContentProps {
  description?: string;
  className?: string;
}

export function EmptyContent({
  description = "아직 등록한 체험이 없어요",
  className,
}: EmptyContentProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/image/empty.svg"
        alt="빈 파일"
        className="w-[20rem] h-[20rem] desktop:w-[24rem] desktop:h-[24rem]"
        width={240}
        height={240}
      />
      <div className="text-2xl font-medium text-left text-gray-800">
        {description}
      </div>
    </div>
  );
}
