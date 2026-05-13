import { FC, Suspense } from "react";
import SearchResultsList from "./components/SearchResultsList";
import SearchResultsPagination from "./components/SearchResultsPagination";
import SearchForm from "./components/SearchForm";
import FindInResults from "./components/FindInResults";

const HomePage: FC = async () => {
  return (
    <div className="flex flex-col flex-1">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <SearchForm />
        <FindInResults />
        <SearchResultsList />
        <SearchResultsPagination />
      </Suspense>
    </div>
  );
};
export default HomePage;
