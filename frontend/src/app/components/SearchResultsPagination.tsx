"use client";

import Pagination from "@/components/common/pagination";
import { duckDuckGoSearch } from "@/lib/api";
import { useSearchResultsStore } from "@/store/searchResults";
import { FC, useEffect } from "react";

const SearchResultsPagination: FC = () => {
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

  if (pagination.total === 0) return null;

  return (
    <Pagination
      className="mt-auto"
      setPage={handlePageChange}
      {...pagination}
    />
  );
};

SearchResultsPagination.displayName = "SearchResultsPagination";

export default SearchResultsPagination;
