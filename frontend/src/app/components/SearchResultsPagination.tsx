"use client";

import Pagination from "@/components/common/pagination";
import { duckDuckGoSearch } from "@/lib/api";
import { useSearchResultsStore } from "@/store/searchResults";
import { FC, memo, useEffect } from "react";

type SearchResultsPaginationProps = {
  page?: number;
};

const SearchResultsPagination: FC<SearchResultsPaginationProps> = memo(
  ({ page }) => {
    const query = useSearchResultsStore((state) => state.query);
    const pagination = useSearchResultsStore((state) => state.pagination);
    const setResults = useSearchResultsStore((state) => state.setResults);
    const setPagination = useSearchResultsStore((state) => state.setPagination);

    const handlePageChange = (page: number) => {
      setPagination({ ...pagination, page });
    };

    useEffect(() => {
      const fetchPage = async () => {
        const { results, ...paginationData } = await duckDuckGoSearch({
          query,
          page: pagination.page,
        });

        setResults(results);
        setPagination(paginationData);
      };
      fetchPage();
    }, [pagination.page]);

    useEffect(() => {
      if (!page) return;
      if (page < 1) return;

      setPagination({ ...pagination, page });
    }, [page]);

    return (
      <Pagination
        className="mt-auto"
        setPage={handlePageChange}
        {...pagination}
      />
    );
  },
);
SearchResultsPagination.displayName = "SearchResultsPagination";

export default SearchResultsPagination;
