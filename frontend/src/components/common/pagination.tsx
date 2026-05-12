"use client";

import { FC, memo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type PaginationProps = {
  className?: string;
  page: number;
  setPage: (page: number) => void;
  limit: number;
  total: number;
};

const Pagination: FC<PaginationProps> = ({
  className,
  page,
  setPage,
  limit,
  total,
}) => {
  const [jumpTo, setJumpTo] = useState("");

  const handleJumpTo = () => {
    const pageNum = parseInt(jumpTo);

    if (Number.isNaN(pageNum)) return;
    if (pageNum < 0) {
      toast.error("Page number must be a positive number");
      return;
    }
    setPage(pageNum);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={cn("flex justify-between gap-2 flex-nowrap", className)}>
      <Button
        onClick={() => setPage(page - 1)}
        className={cn({
          "opacity-0 pointer-events-none": page === 1,
        })}
      >
        Previous
      </Button>
      <div className="flex items-center flex-col gap-2">
        <p>
          Page {page} of {totalPages}
        </p>
        <div className="flex flex-nowrap gap-2">
          <label htmlFor="jumpTo" className="whitespace-nowrap leading-7">
            Jump to
          </label>
          <Input
            type="number"
            value={jumpTo}
            min={1}
            onChange={(event) => setJumpTo(event.target.value)}
            className="w-16"
          />
          <Button onClick={handleJumpTo}>Go</Button>
        </div>
      </div>
      <div>
        <Button
          onClick={() => setPage(page + 1)}
          className={cn({
            "opacity-0 pointer-events-none": page === totalPages,
          })}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
Pagination.displayName = "Pagination";

export default Pagination;
