import { useState } from "react";
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
  // const [isClicked, setIsClicked] = useState(false);

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

  return (
    <div
      className="flex-between gap-[1rem] w-[120rem] tablet:w-[69.6rem]
    mobile:w-[34.3rem]"
    >
      <div
        className="flex-between gap-[2.4rem] tablet:w-[52.2rem]
      tablet:gap-[1.4rem] overflow-x-auto hide-scrollbar
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

      <div
        // onClick={() => setIsClicked(true)}
        className="desktop:hidden mobile:hidden w-[3.2rem] h-[3.2rem]"
      >
        <Image
          src="/image/btn_arrow.svg"
          // src={`${ ? "/image/activated_right_arrow.svg" : "/image/activated_left_arrow.svg"}`}
          alt="카테고리 펼치기 버튼"
          width={32}
          height={32}
          // className={`${isClicked ? "rotate-180" : "rotate-0"}`}
        />
      </div>

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
