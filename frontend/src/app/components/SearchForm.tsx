"use client";

import { useSearchResultsStore } from "@/store/searchResults";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { duckDuckGoSearch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const formSchema = z.object({
  query: z.string().min(1, "Search query must be at least 1 character long."),
});

const SearchForm: FC = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const urlQuery = useMemo(
    () => searchParams.get("query") ?? "",
    [searchParams],
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: urlQuery,
    },
  });
  const query = useSearchResultsStore((state) => state.query);
  const setQuery = useSearchResultsStore((state) => state.setQuery);
  const setResults = useSearchResultsStore((state) => state.setResults);
  const setPagination = useSearchResultsStore((state) => state.setPagination);

  const handleSubmit = useCallback(
    async (formValues: z.infer<typeof formSchema>) => {
      const { query } = formValues;
      try {
        const { results, ...pagination } = await duckDuckGoSearch({
          query,
          save: true,
        });

        setQuery(query);
        setResults(results);
        setPagination(pagination);
        replace(`/?query=${encodeURIComponent(query)}`);
      } catch (error) {
        toast.error("Could not look up search query: " + query, {
          description: error instanceof Error ? error?.message : undefined,
        });
      }
    },
    [setQuery, setPagination, setResults],
  );

  useEffect(() => {
    if (!urlQuery) return;

    form.setValue("query", urlQuery);
    setQuery(urlQuery);
    form.handleSubmit(handleSubmit)();
  }, [urlQuery, form, handleSubmit, setQuery]);

  useEffect(() => {
    const formAbortController = new AbortController();

    return () => {
      formAbortController.abort();
    };
  }, []);

  return (
    <div>
      <label htmlFor="query" className="font-bold text-lg">
        Duck Duck Go Search
      </label>
      <form id="search-form" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup className="relative">
          <Controller
            name="query"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Input
                  {...field}
                  id="query"
                  aria-invalid={fieldState.invalid}
                  placeholder="Cats"
                  autoComplete="off"
                  className="pr-10"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            form="search-form"
            className="absolute right-0 top-0"
          >
            Go
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
};
SearchForm.displayName = "SearchForm";

export default SearchForm;
