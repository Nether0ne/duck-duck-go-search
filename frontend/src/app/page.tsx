import SearchForm from "@/components/forms/SearchForm";
import { FC } from "react";
import { Toaster } from "sonner";
import SearchResultsList from "./components/SearchResultsList";

const HomePage: FC = () => {
  return (
    <div className="flex flex-1 flex-col w-full overflow-y-auto rounded-none">
      <div className="max-w-[800px] w-full mx-auto mt-4">
        <SearchForm />
        <SearchResultsList />
        <Toaster />
      </div>
    </div>
  );
};
export default HomePage;
