"use client";
import { Button, Flex, Center } from "@chakra-ui/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function BtnSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isBtn, setBtn] = useState(true);

  const clicksen = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("senrec", "1");
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const clickrec = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("senrec", "2");
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (searchParams.get("senrec") == "1") setBtn(true);
    else setBtn(false);
  }, [searchParams]);

  return (
    <Flex flexWrap={"wrap"} gap={5}>
      <Center>
        <Button
          px={6}
          py={5}
          size="sm"
          bg={isBtn ? "#9E57DA" : "#888"}
          _hover={isBtn ? { bg: "#7943a5" } : { bg: "#666" }}
          color={"white"}
          onClick={clicksen}
        >
          ส่งต่อผู้ป่วย
        </Button>
      </Center>

      <Center>
        <Button
          px={6}
          py={5}
          size="sm"
          bg={isBtn ? "#888" : "#9E57DA"}
          _hover={isBtn ? { bg: "#666" } : { bg: "#7943a5" }}
          color={"white"}
          onClick={clickrec}
        >
          รับผู้ป่วยใหม่
        </Button>
      </Center>
    </Flex>
  );
}
