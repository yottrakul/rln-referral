"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createPaginationRange } from "@/app/_lib";
import { useCallback, useMemo, useRef } from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { PiDotsThreeBold } from "react-icons/pi";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
}

export default function Pagination({ currentPage, totalPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const threeDotKey = useRef(0);
  const paginationRange = useMemo(() => createPaginationRange(currentPage, totalPage), [currentPage, totalPage]);
  const createQueryParams = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      return params.toString();
    },
    [searchParams]
  );
  const toPreviousPage = () => {
    router.replace(`${pathname}?${createQueryParams(currentPage - 1)}`);
  };

  const toNextPage = () => {
    router.replace(`${pathname}?${createQueryParams(currentPage + 1)}`);
  };
  return (
    <ButtonGroup isAttached variant="outline">
      <IconButton
        onClick={toPreviousPage}
        isDisabled={currentPage === 1}
        aria-label="To previous page"
        icon={<RxArrowLeft color="#A058DA" />}
      />
      {paginationRange.map((item) => {
        threeDotKey.current++;
        return item === "..." ? (
          <ThreeDots key={"dot" + threeDotKey.current} />
        ) : (
          <PageBtn
            key={item}
            page={Number(item)}
            current={item === currentPage}
            queryParamFn={createQueryParams}
            basePath={pathname}
            router={router}
          />
        );
      })}
      <IconButton
        onClick={toNextPage}
        isDisabled={currentPage === totalPage}
        aria-label="To next page"
        icon={<RxArrowRight color="#A058DA" />}
      />
    </ButtonGroup>
  );
}

const PageBtn = ({
  page,
  current = false,
  basePath,
  queryParamFn,
  router,
}: {
  page: number;
  current?: boolean;
  basePath: string;
  queryParamFn: (page: number) => string;
  router: AppRouterInstance;
}) => {
  const handleOnClick = () => {
    router.replace(`${basePath}?${queryParamFn(page)}`);
  };
  if (current)
    return (
      <Button onClick={handleOnClick} colorScheme="purple" variant="solid">
        {page}
      </Button>
    );

  return (
    <Button onClick={handleOnClick} color={"purple.500"}>
      {page}
    </Button>
  );
};

const ThreeDots = () => {
  return (
    <IconButton
      _hover={{ bgColor: "none" }}
      _active={{ bgColor: "none" }}
      cursor={"default"}
      aria-label="Three Dot"
      icon={<PiDotsThreeBold color="purple" />}
    />
  );
};
