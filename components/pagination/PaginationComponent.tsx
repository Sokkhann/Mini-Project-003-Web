import React from "react";
import { Pagination } from "@nextui-org/react";

export default function PaginationComponent() {
  return (
    <div className="flex flex-wrap items-center justify-center w-full h-full">
      <Pagination total={10} initialPage={1} color="warning" />
    </div>
  );
}
