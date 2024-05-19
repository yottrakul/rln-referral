"use client";
import { Input, InputGroup, InputLeftElement, type InputProps } from "@chakra-ui/react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { IoSearch } from "react-icons/io5";
interface SearchBarProps extends InputProps {
  placeholder?: string;
}

export default function SearchBar({ placeholder = "Search", ...rest }: SearchBarProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query")?.toString() ?? "";
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("query", e.target.value);
      newSearchParams.set("page", "1");
    } else {
      newSearchParams.delete("query");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, 300);

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <IoSearch />
      </InputLeftElement>
      <Input onChange={handleSearch} defaultValue={query} placeholder={placeholder} {...rest} />
    </InputGroup>
  );
}
