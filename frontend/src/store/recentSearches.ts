import z from "zod";
import { create } from "zustand";

const recentSearch = z.object({
  id: z.number(),
  query: z.string(),
  createdAt: z.string(),
});
type RecentSearch = z.infer<typeof recentSearch>;

export const useRecentSearchesStore = create<{
  searches: RecentSearch[];
  setSearches: (searches: RecentSearch[]) => void;
}>((set) => ({
  searches: [],
  setSearches: (searches) => set(() => ({ searches })),
}));
