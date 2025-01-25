import Image from "next/image";
import Button from "./button";

export default function Pagination() {
  const pages = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="mb-[22.2rem] flex-between gap-[1rem]">
      <Button
        type="page"
        label={
          <Image
            src="/image/previous-page.svg"
            alt="이전 페이지 버튼"
            width={21}
            height={21}
          />
        }
        variant="page"
      />
      {pages.map((page) => (
        // if (page <= totalPages)
        <>
          <Button key={page} type="page" label={page} variant="page" />
        </>
      ))}
      <Button
        type="page"
        label={
          <Image
            src="/image/next-page.svg"
            alt="다음 페이지 버튼"
            width={21}
            height={21}
          />
        }
        variant="page"
      />
    </div>
  );
}
