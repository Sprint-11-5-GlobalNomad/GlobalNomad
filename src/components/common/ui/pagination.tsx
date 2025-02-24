import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  totalPages,
  currentPage,
  setPage,
}: PaginationProps) {
  const handlePageChange =
    // useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
        window.history.replaceState({}, "", `?page=${currentPage}`);
      }
    };
  // [setPage, totalPages]
  // );

  const pages = useMemo(() => {
    const startPage = Math.max(1, currentPage - 2);

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    // 1 ~ 5페이지일 경우 정상적으로 표시
    if (currentPage <= 3) {
      return Array.from({ length: 5 }, (_, i) => i + 1);
    }
    // 마지막 페이지 근처일 경우
    if (currentPage + 2 >= totalPages) {
      return Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    }
    // 나머지 페이지들
    return Array.from({ length: 5 }, (_, i) => startPage + i);
  }, [currentPage, totalPages]);

  useEffect(() => {
    window.history.replaceState({}, "", `?page=${currentPage}`);
  }, [currentPage]);

  return (
    <div className="mb-[22.2rem] flex-between gap-[1rem]">
      <Link
        href={`?page=${currentPage - 1}`}
        passHref
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(currentPage - 1);
        }}
        className={`w-[5.5rem] h-[5.5rem] px-[1.5rem] py-[1.5rem]
          rounded-[1.5rem] border border-solid bg-white
          mobile:w-[4rem] mobile:h-[4rem] mobile:p-[1.15rem]
          ${
            currentPage === 1
              ? "border-gray-300 cursor-not-allowed"
              : "border-green-dark hover:bg-green-light"
          }`}
      >
        <Image
          src={`${
            currentPage === 1
              ? "/image/previous-page-gray.svg"
              : "/image/previous-page-green.svg"
          }`}
          alt="이전 페이지 버튼"
          width={21}
          height={21}
        />
      </Link>
      {pages.map((page) => (
        <div key={page} className="hover:text-white">
          <Link
            href={`?page=${page}`}
            passHref
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
            className={`w-[5.5rem] h-[5.5rem] px-[1.5rem] py-[1.5rem]
        flex items-center justify-center rounded-[1.5rem]
        border border-solid border-green-dark hover:bg-green-dark
        mobile:w-[4rem] mobile:h-[4rem]
         ${currentPage === page ? "bg-green-dark text-white" : "bg-white"}`}
          >
            <span className="font-regular text-2lg text-center">{page}</span>
          </Link>
        </div>
      ))}
      <Link
        href={`?page=${currentPage + 1}`}
        passHref
        onClick={(e) => {
          e.preventDefault();
          handlePageChange(currentPage + 1);
        }}
        className={`w-[5.5rem] h-[5.5rem] px-[1.5rem] py-[1.5rem]
      rounded-[1.5rem] border border-solid bg-white
      mobile:w-[4rem] mobile:h-[4rem] mobile:p-[1.15rem]
      ${
        currentPage === totalPages
          ? "border-gray-300 cursor-not-allowed"
          : "border-green-dark hover:bg-green-light"
      }`}
      >
        <Image
          src={`${
            currentPage === totalPages
              ? "/image/next-page-gray.svg"
              : "/image/next-page-green.svg"
          }`}
          alt="다음 페이지 버튼"
          width={21}
          height={21}
        />
      </Link>
    </div>
  );
}
