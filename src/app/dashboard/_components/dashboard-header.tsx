"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

type DashboardHeaderProps = {
  title: string;
  homeLabel?: string;
  icon?: ReactNode;
  parentTitle?: string;
  parentPath?: string;
};

export default function DashboardHeader({
  title,
  homeLabel = "Home",
  icon,
  parentTitle,
  parentPath,
}: DashboardHeaderProps) {
  const pathname = usePathname();

  // Check if we are on the main dashboard page
  const isDefaultPage = pathname === "/dashboard";

  return (
    <div className="absolute top-3 left-[21%] w-[79%] overflow-hidden mb-16">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link href="/dashboard">{homeLabel}</Link>
          </BreadcrumbItem>

          {parentTitle && parentPath && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link href={parentPath}>
                  <BreadcrumbPage className="text-blue-600">
                    {parentTitle}
                  </BreadcrumbPage>
                </Link>
              </BreadcrumbItem>
            </>
          )}

          {!isDefaultPage && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-600">
                  {title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex gap-1 mt-3">
        {!isDefaultPage && (
          <div className="border border-blue-500 h-20 flex items-center justify-center">
            <Link href={parentPath || "/dashboard"}>
              <ChevronLeft size={25} className="text-blue-500 cursor-pointer" />
            </Link>
          </div>
        )}

        <header
          className={`flex items-center ${
            isDefaultPage ? "w-[98%]" : "w-[95.5%]"
          } h-20 bg-blue-600 text-white p-5`}
        >
          {icon}
          <h2 className="m-5 text-4xl font-inter">{title}</h2>
        </header>
      </div>
    </div>
  );
}
