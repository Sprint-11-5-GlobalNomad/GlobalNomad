import Button from "@/components/common/ui/button";
import Image from "next/image";
import React from "react";

interface SearchFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function SearchForm({
  onSubmit,
  onChange,
  value,
}: SearchFormProps) {
  return (
    <div
      className="bg-white w-[120rem] h-[18.4rem]
    px-[2.4rem] py-[3.2rem] flex flex-col gap-[3.2rem] border rounded-[1.6rem]
    absolute top-[56rem] mobile:top-[25rem] shadow-container tablet:w-[69.6rem]
    mobile:w-[34.3rem] mobile:px-[2.4rem] mobile:py-[1.6rem] mobile:gap-[1.5rem] mobile:h-[12.9rem]"
    >
      <h2 className="text-xl font-bold mobile:text-lg">
        무엇을 체험하고 싶으신가요?
      </h2>
      <form
        onSubmit={onSubmit}
        className="flex-between gap-[1rem] h-[5.6rem] items-center"
      >
        <div
          className="flex gap-[1rem] w-full h-full focus-within:border-green
      border border-solid border-gray-800 rounded-[0.4rem] mobile:gap-0 mobile:w-[18.7rem]"
        >
          <Image
            src="/image/search.svg"
            alt="검색하기 아이콘"
            width={48}
            height={48}
          />
          <input
            type="search"
            placeholder="내가 원하는 체험은"
            onChange={onChange}
            value={value}
            className="placeholder:text-gray-700 text-lg font-regular
          w-full rounded-[0.4rem] outline-none bg-white
          mobile:text-md"
          />
        </div>
        <Button
          type="submit"
          ButtonType="search"
          label="검색하기"
          variant="default"
        />
      </form>
    </div>
  );
}
