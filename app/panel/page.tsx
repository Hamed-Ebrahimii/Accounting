"use client"
// @ts-ignore
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import CompaniesList from "@/components/lists/companies-list";

const query = new QueryClient()
export default function UserPanel() {
  return (
      <QueryClientProvider client={query}>
        <CompaniesList/>
      </QueryClientProvider>
  );
}
