"use client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, type SystemStyleObject } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbNavProps {
  containerStyle?: SystemStyleObject;
}

export default function BreadcrumbNav({ containerStyle }: BreadcrumbNavProps) {
  const paths = usePathname();
  const pathNames = useMemo(() => paths.split("/").filter((path) => path !== ""), [paths]);
  const lastPathNames = useMemo(() => pathNames.slice(-1)[0], [pathNames]);
  return (
    <div>
      <Breadcrumb
        sx={{
          ...containerStyle,
        }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            หน้าแรก
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathNames.map((path, index) => {
          return (
            <BreadcrumbItem isCurrentPage={path === lastPathNames} key={index}>
              {path === lastPathNames ? (
                <BreadcrumbLink>{`${path.slice(0, 1).toUpperCase()}${path.slice(1)}`}</BreadcrumbLink>
              ) : (
                <BreadcrumbLink
                  as={Link}
                  href={`/${path}`}
                >{`${path.slice(0, 1).toUpperCase()}${path.slice(1)}`}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </div>
  );
}
