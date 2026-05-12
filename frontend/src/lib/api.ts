"use server";

import z from "zod";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

type DuckDuckGoSearchParameters = {
  query?: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
  save?: boolean;
};

const searchEntry = z.object({
  id: z.uuid(),
  title: z.string(),
  url: z.string(),
});
export type SearchEntry = z.infer<typeof searchEntry>;

const duckDuckGoSearchResponseSchema = z.object({
  results: searchEntry.array(),
  page: z.transform((str) => parseInt(`${str}`)),
  total: z.transform((str) => parseInt(`${str}`)),
  limit: z.transform((str) => parseInt(`${str}`)),
});
export type DuckDuckGoSearchResponse = z.infer<
  typeof duckDuckGoSearchResponseSchema
>;

export const duckDuckGoSearch = async ({
  query,
  page = 1,
  limit = 10,
  signal,
  save = false,
}: DuckDuckGoSearchParameters) => {
  const endpoint = `${API_URL}/search${!save ? `?q=${encodeURIComponent(`${query}`)}&page=${page}&limit=${limit}` : ""}`;
  const response = await fetch(endpoint, {
    method: !save ? "GET" : "POST",
    headers: { "Content-Type": "application/json" },
    body: !save ? undefined : JSON.stringify({ q: query, page, limit }),
    signal,
  });
  if (!response.ok) throw new Error("Could not reach API");

  const jsonData = await response.json();
  const parsedResponse = duckDuckGoSearchResponseSchema.parse(jsonData);

  return parsedResponse;
};

const searchHistoryEntry = z.object({
  id: z.uuid(),
  query: z.string(),
  createdAt: z.string(),
});
export type SearchHistoryEntry = z.infer<typeof searchHistoryEntry>;

const searchHistoryResponseSchema = z.object({
  history: searchHistoryEntry.array(),
});
export type SearchHistoryResponse = z.infer<typeof searchHistoryResponseSchema>;

export const getSearchHistory = async () => {
  const response = await fetch(`${API_URL}/search/history`);
  if (!response.ok) throw new Error("Could not fetch search history");
  const jsonData = await response.json();
  const parsedResponse = searchHistoryResponseSchema.parse(jsonData);

  return parsedResponse;
};
