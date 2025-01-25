import Button from "../../ui/button";
import FilterDropdown from "../../ui/filter-dropdown";

export default function CategoryPriceFilter() {
  return (
    <div className="flex-between gap-[1rem] w-[120rem]">
      <div className="flex-between gap-[2.4rem]">
        <Button
          type="category"
          label="문화・예술"
          variant="outlined"
          className="border-[0.1rem]"
        />
        <Button type="category" label="식음료" variant="outlined" />
        <Button type="category" label="스포츠" variant="outlined" />
        <Button type="category" label="투어" variant="outlined" />
        <Button type="category" label="관광" variant="outlined" />
        <Button type="category" label="웰빙" variant="outlined" />
      </div>

      <FilterDropdown
        description="가격"
        options={["가격이 낮은 순", "가격이 높은 순"]}
        size="small"
        // onSelect={}
      />
    </div>
  );
}
