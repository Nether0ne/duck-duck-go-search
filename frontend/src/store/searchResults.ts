import z from "zod";
import { create } from "zustand";

const searchResult = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.string(),
});
type SearchResult = z.infer<typeof searchResult>;

const pagination = z.object({
  total: z.number().min(0),
  page: z.number().min(1),
  limit: z.number().min(1),
});
type Pagination = z.infer<typeof pagination>;

export const useSearchResultsStore = create<{
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  setResults: (searchResults: SearchResult[]) => void;
  findQuery: string;
  setFindQuery: (query: string) => void;
  matchCount: number;
  setMatchCount: (count: number) => void;
  currentMatchIndex: number;
  setCurrentMatchIndex: (index: number) => void;
  prevMatch: () => void;
  nextMatch: () => void;
  pagination: Pagination;
  setPagination: (pagination: Pagination) => void;
}>((set) => ({
  query: "",
  setQuery: (query: string) => set(() => ({ query })),
  results: [],
  setResults: (searchResults: SearchResult[]) =>
    set(() => ({ results: searchResults })),
  findQuery: "",
  setFindQuery: (findQuery: string) => set(() => ({ findQuery })),
  matchCount: 0,
  setMatchCount: (matchCount: number) => set(() => ({ matchCount })),
  currentMatchIndex: 0,
  setCurrentMatchIndex: (currentMatchIndex: number) =>
    set(() => ({ currentMatchIndex })),
  prevMatch: () =>
    set((state) => ({ currentMatchIndex: state.currentMatchIndex - 1 })),
  nextMatch: () =>
    set((state) => ({ currentMatchIndex: state.currentMatchIndex + 1 })),
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
  },
  setPagination: (pagination: Pagination) => set(() => ({ pagination })),
}));
