import Image from "next/image";

export function EmptyActivity() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src={"/image/empty.svg"}
        alt={"빈 파일"}
        className="w-[20rem] h-[20rem] desktop:w-[24rem] desktop:h-[24rem]"
        width={240}
        height={240}
      />
      <div className="font-pretendard text-[2.4rem] font-medium leading-[32px] text-left text-gray-800">
        아직 등록한 체험이 없어요
      </div>
    </div>
  );
}
