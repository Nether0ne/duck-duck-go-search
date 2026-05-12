"use client";

import { useSearchResultsStore } from "@/app/store/searchResults";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  query: z.string().min(1, "Search query must be at least 1 character long."),
});

const SearchForm: FC = () => {
  const { query, setQuery, setResults, setPagination } =
    useSearchResultsStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query,
    },
  });

  const handleSubmit = async (formValues: z.infer<typeof formSchema>) => {
    const { query } = formValues;

    const response = await fetch("http://localhost:3000/search?query=" + query);
    const data = await response.json();

    const { results, ...pagination } = data;

    setQuery(query);
    setResults(results);
    setPagination(pagination);

    console.log(data);
  };

  return (
    <Card className="w-full flex-1">
      <CardHeader>
        <CardTitle>Search</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="search-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="search-form">
            Go
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
SearchForm.displayName = "SearchForm";

export default SearchForm;
