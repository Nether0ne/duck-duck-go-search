import { FC } from "react";
import SearchResultsList from "./components/SearchResultsList";
import SearchResultsPagination from "./components/SearchResultsPagination";
import SearchForm from "./components/SearchForm";

type HomePageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const parseSearchValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value.at(0) ?? "") : "";

const HomePage: FC<HomePageProps> = async ({ searchParams }) => {
  const { query, page } = await searchParams;
  const parsedQuery = parseSearchValue(query);
  const parsedPage = page ? parseInt(parseSearchValue(page)) : 1;

  return (
    <div className="flex flex-col flex-1">
      <SearchForm query={parsedQuery} />
      <SearchResultsList />
      <SearchResultsPagination page={parsedPage} />
    </div>
  );
};
export default HomePage;
