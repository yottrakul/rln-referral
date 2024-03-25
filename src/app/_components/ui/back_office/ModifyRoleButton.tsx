"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { FaGear } from "react-icons/fa6";

interface ModifyRoleButtonProps {
  id: string;
}

export default function ModifyRoleButton({ id }: ModifyRoleButtonProps) {
  const searchParams = useSearchParams();
  const createQueryParams = useCallback(
    (id: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("modal", "true");
      params.set("updateid", id);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Link href={`/backoffice_user?${createQueryParams(id)}`}>
      <Button leftIcon={<FaGear />} variant="outline">
        Modify Roles
      </Button>
    </Link>
  );
}
