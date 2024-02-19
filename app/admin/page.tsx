"use client"
import { UsersList } from "@/components/lists/users-list";
// @ts-ignore
import {QueryClientProvider} from "@tanstack/react-query";
// @ts-ignore
import {QueryClient} from "@tanstack/query-core";

export const dynamic = "force-dynamic";
const query = new QueryClient()

export default  function AdminPanel() {
  return (
    <main className="container mx-auto py-xl">
        <QueryClientProvider client={query}>

      <UsersList />
        </QueryClientProvider>

    </main>
  );
}
