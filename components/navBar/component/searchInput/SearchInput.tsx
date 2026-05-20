import { Label, SearchField } from "@heroui/react";

export default function SearchInput() {
  return (
    <SearchField name="search">
      <SearchField.Group className="bg-[#F4EFE6] rounded-full px-2">
        <SearchField.SearchIcon />
        <SearchField.Input
          className="w-[380px] "
          placeholder="관심사·모임 검색"
        />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
}
