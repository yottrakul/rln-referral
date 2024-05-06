"use client";
import { Select, Flex, Input } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getHospitalAll } from "@/app/_actions/request";
import { useEffect, useState } from "react";

export default function InputSearch() {
  const [isallHospital, setallHospital] = useState<{ id: number; hospitalName: string }[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const search: string = searchParams.get("search")?.toString() ?? "";
  const date: string = searchParams.get("date")?.toString() ?? "";
  const [isHospital, setHospital] = useState(0);

  useEffect(() => {
    setHospital(Number(searchParams.get("hospital")) ?? 0);
  }, []);

  const handleHospital = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setHospital(Number(e.target.value));
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("hospital", e.target.value);
    } else {
      newSearchParams.delete("hospital");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("date", e.target.value);
    } else {
      newSearchParams.delete("date");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (e.target.value) {
      newSearchParams.set("search", e.target.value);
    } else {
      newSearchParams.delete("search");
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  }, 500);

  useEffect(() => {
    const Load = async () => {
      const hospital = await getHospitalAll();
      setallHospital(hospital);
    };

    Load().catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <Flex flexWrap={"wrap"} gap={5} flex={"1 1 fit-content"}>
      <Input
        flex={5}
        defaultValue={search}
        flexBasis={"300px"}
        placeholder="ค้นหาชื่อ-สกุล หรือ เลขบัตรประชาชน"
        size="md"
        onChange={handleSearch}
      />
      <Input
        flex={5}
        defaultValue={date}
        type="Date"
        flexBasis={"200px"}
        placeholder="วัน/เดือน/ปี"
        size="md"
        onChange={handleDate}
      />
      <Select
        flex={5}
        value={isHospital}
        flexBasis={"250px"}
        size="md"
        placeholder="โรงพยาบาลทั้งหมด"
        onChange={handleHospital}
      >
        {isallHospital.map((v, index) => {
          return (
            <option key={index} value={v.id}>
              {v.hospitalName}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
}
