"use client";


import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";


const formSchema = z.object({
  query: z.string().min(1, { message: "Please enter something to search." }),
});


export function SearchBar() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/search?q=${encodeURIComponent(values.query)}`);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <Form { ...form }>
        <form
          onSubmit={ form.handleSubmit(onSubmit) }
          className="flex items-center gap-2"
        >
          <FormField
            control={ form.control }
            name="query"
            render={
              ({ field }) => (
                <FormItem className="flex-grow">
                  <FormControl>
                    <Input
                      placeholder="Search for a recipe..."
                      { ...field }
                    />
                  </FormControl>
                </FormItem>
              )
            }
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </Form>
    </div>
  );
}
