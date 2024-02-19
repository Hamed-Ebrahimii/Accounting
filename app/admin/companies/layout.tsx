"use client"
// @ts-ignore
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const query = new QueryClient()
const LayoutCompanies = ({children} : {children : Readonly<ReactNode>}) =>{
    return(
        <QueryClientProvider client={query}>
            {children}
        </QueryClientProvider>
    )
}
export default LayoutCompanies