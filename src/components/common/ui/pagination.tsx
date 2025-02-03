import Image from "next/image";
import Link from "next/link";

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
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + 4);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="mb-[22.2rem] flex-between gap-[1rem]">
      <Link
        href={`?page=${currentPage - 1}`}
        passHref
        onClick={() => handlePageChange(currentPage - 1)}
        className={`w-[5.5rem] h-[5.5rem] px-[1.5rem] py-[1.5rem]
          rounded-[1.5rem] border border-solid bg-white
          ${currentPage === 1 ? "border-gray-300 cursor-not-allowed" : "border-green-dark hover:bg-green-dark"}`}
      >
        <Image
          src={`${currentPage === 1 ? "/image/previous-page-gray.svg" : "/image/previous-page-green.svg"}`}
          alt="이전 페이지 버튼"
          width={21}
          height={21}
        />
      </Link>
      {pages.map((page) => (
        <Link
          href={`?page=${page}`}
          key={page}
          passHref
          onClick={() => handlePageChange(page)}
          className={`w-[5.5rem] h-[5.5rem] bg-white px-[1.5rem] py-[1.5rem]
        flex items-center justify-center rounded-[1.5rem]
        border border-solid border-green-dark hover:bg-green-dark
         ${currentPage === page ? "bg-green-drak" : ""}`}
        >
          <span className="color-green-dark font-regular text-2lg text-center hover:color-white">
            {page}
          </span>
        </Link>
      ))}
      <Link
        href={`?page=${currentPage + 1}`}
        passHref
        onClick={() => handlePageChange(currentPage + 1)}
        className={`w-[5.5rem] h-[5.5rem] px-[1.5rem] py-[1.5rem]
      rounded-[1.5rem] border border-solid bg-white
      ${currentPage === totalPages ? "border-gray-300 cursor-not-allowed" : "border-green-dark hover:bg-green-dark"}`}
      >
        <Image
          src={`${currentPage === totalPages ? "/image/next-page-gray.svg" : "/image/next-page-green.svg"}`}
          alt="다음 페이지 버튼"
          width={21}
          height={21}
        />
      </Link>
    </div>
  );
}
