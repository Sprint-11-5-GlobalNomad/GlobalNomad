import { useRef, useState } from "react";
import Button from "../../../common/ui/button";
import FilterDropdown from "../../../common/ui/dropdown/filter-dropdown";
import {
  CATEGORY_TYPES,
  CategoryType,
  SortType,
} from "@/app/types/activity-schemas";
import Image from "next/image";

interface CategoryPriceFilterProps {
  onFilterChange: (category: CategoryType | undefined, sort: SortType) => void;
}

const PRICE_OPTIONS = ["가격이 낮은 순", "가격이 높은 순"];

export default function CategoryPriceFilter({
  onFilterChange,
}: CategoryPriceFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryType | undefined
  >(undefined);
  const [selectedSort, setSelectedSort] = useState<SortType>(undefined);

  const categoryContainerRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleCategoryChange = (category: CategoryType) => {
    if (selectedCategory === category) {
      setSelectedCategory(undefined);
      onFilterChange(undefined, selectedSort);
    } else {
      setSelectedCategory(category);
      onFilterChange(category, selectedSort);
    }
  };

  const handlePriceChange = (sort: SortType) => {
    setSelectedSort(sort);
    onFilterChange(selectedCategory, sort);
  };

  const checkScrollPosition = () => {
    if (categoryContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        categoryContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd((scrollLeft + clientWidth) / scrollWidth >= 0.9);
    }
  };

  const scrollToEnd = () => {
    if (categoryContainerRef.current) {
      categoryContainerRef.current.scrollTo({
        left:
          categoryContainerRef.current?.scrollWidth -
          categoryContainerRef.current.clientWidth +
          1,
        behavior: "smooth",
      });
    }
  };

  const scrollToStart = () => {
    if (categoryContainerRef.current) {
      categoryContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="flex-between gap-[1rem] w-[120rem] tablet:w-[69.6rem]
    mobile:w-[34.3rem]"
    >
      {!isAtStart && (
        <button
          onClick={scrollToStart}
          className="desktop:hidden mobile:hidden w-[4rem] h-[4rem]
          "
        >
          <Image
            src="/image/btn_arrow.svg"
            alt="이전 카테고리 더보기 버튼"
            width={40}
            height={40}
            className="rotate-180"
          />
        </button>
      )}

      <div
        ref={categoryContainerRef}
        onScroll={checkScrollPosition}
        className="flex-between gap-[2.4rem] tablet:w-[52.2rem]
      tablet:gap-[1.4rem] tablet:pr-[2rem] tablet:overflow-x-auto hide-scrollbar
      mobile:w-[25.6rem] mobile:gap-[0.8rem] mobile:bg-custom-gradient"
      >
        {CATEGORY_TYPES.map((category, index) => (
          <Button
            key={index}
            type="button"
            ButtonType="category"
            label={category}
            variant={category === selectedCategory ? "selected" : "category"}
            onClick={() => handleCategoryChange(category as CategoryType)}
            className="shrink-0"
          />
        ))}
      </div>

      {!isAtEnd && (
        <button
          onClick={scrollToEnd}
          className="desktop:hidden mobile:hidden w-[4rem] h-[4rem]"
        >
          <Image
            src="/image/btn_arrow.svg"
            alt="다음 카테고리 더보기 버튼"
            width={40}
            height={40}
          />
        </button>
      )}

      <FilterDropdown
        description="가격"
        options={PRICE_OPTIONS}
        size="small"
        onSelect={(selected) => {
          const sortValue =
            selected === PRICE_OPTIONS[0] ? "price_asc" : "price_desc";
          handlePriceChange(sortValue);
        }}
      />
    </div>
  );
}
