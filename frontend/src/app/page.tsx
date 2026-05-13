import { FC } from "react";
import SearchResultsList from "./components/SearchResultsList";
import SearchResultsPagination from "./components/SearchResultsPagination";
import SearchForm from "./components/SearchForm";
import FindInResults from "./components/FindInResults";

const HomePage: FC = async () => {
  return (
    <div className="flex flex-col flex-1">
      <SearchForm />
      <FindInResults />
      <SearchResultsList />
      <SearchResultsPagination />
    </div>
  );
};
export default HomePage;
