import { useState } from "react";
import Button from "../../../common/ui/button";
import FilterDropdown from "../../../common/ui/dropdown/filter-dropdown";
import { CategoryType, SortType } from "@/app/types/activity-schemas";

const categories = ["문화・예술", "식음료", "스포츠", "투어", "관광", "웰빙"];

interface CategoryPriceFilterProps {
  onFilterChange: (category: CategoryType, sort: SortType) => void;
}

export default function CategoryPriceFilter({
  onFilterChange,
}: CategoryPriceFilterProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>(undefined);
  const [selectedSort, setSelectedSort] = useState<SortType>(undefined);

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
    <div className="flex-between gap-[1rem] w-[120rem]">
      <div className="flex-between gap-[2.4rem]">
        {categories.map((category) => (
          <Button
            key={category}
            type="category"
            label={category}
            variant={category === selectedCategory ? "selected" : "category"}
            onClick={() => handleCategoryChange(category as CategoryType)}
          />
        ))}
      </div>

      <FilterDropdown
        description="가격"
        options={["가격이 낮은 순", "가격이 높은 순"]}
        size="small"
        onSelect={(selected) => {
          const sortValue =
            selected === "가격이 낮은 순" ? "price_asc" : "price_desc";
          handlePriceChange(sortValue);
        }}
      />
    </div>
  );
}
