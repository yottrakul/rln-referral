"use client";
import { Select, Flex, Input } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function InputSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("role", e.target.value);
    } else {
      newSearchParams.delete("role");
    }
    router.replace(`?${newSearchParams.toString()}`);
  };

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("query", e.target.value);
    } else {
      newSearchParams.delete("query");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, 300);
  return (
    <Flex flexWrap={"wrap"}>
      <Input w={"300px"} placeholder="ค้นหาชื่อ-สกุล หรือ เลขบัตรประชาชน" size="md" onChange={handleSearch} />
      <Input w={"200px"} placeholder="วัน/เดือน/ปี" size="md" onChange={handleSearch} />
      <Select w={"250px"} size="md" placeholder="โรงพยาบาล" onChange={handleSelect}>
        <option value="1">asd</option>
        <option value="2">asd</option>
      </Select>
    </Flex>
  );
}
