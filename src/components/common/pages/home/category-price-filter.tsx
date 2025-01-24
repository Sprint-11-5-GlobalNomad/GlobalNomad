import FilterDropdown from "../../ui/filter-dropdown";

export default function CategoryPriceFilter() {
  return (
    <div>
      <div>{/* 버튼들 자리 */}</div>
      <FilterDropdown
        description="가격"
        options={["가격이 낮은 순", "가격이 높은 순"]}
        size="small"
        // onSelect={}
      />
    </div>
  );
}
