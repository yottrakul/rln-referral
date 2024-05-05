"use client";
import Carddata from "@/app/_components/ui/request/CardData";
import { useToast, Box, Center } from "@chakra-ui/react";
import { getCase } from "@/app/_actions/request";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface typeData {
  id: string;
  patientId: number;
  status: string;
  senderHospital: number;
  startHospital: number;
  receiverHospital: number;
}

export default function CardData() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [isBottom, setBottom] = useState(true);
  const [isData, setData] = useState<typeData[]>([]);
  const [isSearch, setSearch] = useState(false);
  const [isNoData, setNoData] = useState(true);
  const toast = useToast();

  useEffect(() => {
    function handleKeyDown() {
      const box = document.getElementById("scroll");
      setBottom(Number(box?.offsetHeight) - Number(window.scrollY) <= 900);
    }
    window.addEventListener("scroll", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isBottom) {
      const bottomLoad = async () => {
        setNoData(false);
        if (isSearch) {
          setData([]);
          setSearch(false);
        }
        const res = await getCase(
          isData.length,
          searchParams.get("search") ?? "",
          searchParams.get("date") ?? "",
          searchParams.get("hospital") ?? "",
          searchParams.get("senrec") ?? "1",
          session?.user.hospitalId ?? 0
        );
        if (res !== null) {
          setData(isData.concat(res as typeData[]));
        }
        setNoData(true);
      };

      bottomLoad().catch((error) => {
        console.log(error);
        toast({
          title: "Error | Referral Case",
          description: "Error to get referral case medical records",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
    }
  }, [isBottom, toast, isSearch]);

  useEffect(() => {
    setSearch(true);
  }, [searchParams]);

  return (
    <>
      {isData.map((v, index) => {
        return (
          <Box key={index}>
            <Carddata
              patientId={v?.patientId}
              senderhospital={v?.senderHospital}
              receiverhospital={v?.receiverHospital}
              status={v?.status}
            />
          </Box>
        );
      })}
      <Box w={"100%"} display={isData.length == 0 && isNoData ? "block" : "none"} className="card">
        <Center mt={8}>ไม่พบข้อมูล</Center>
      </Box>
    </>
  );
}
