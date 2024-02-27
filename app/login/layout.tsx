import React from "react";
import {cookies} from "next/headers";
import {deleteCookie} from "@/pocketbase/users";

const LoginLayout  =  ({children} : Readonly<{
    children: React.ReactNode;
}>) =>{

    return (<>{children}</>)
}
export default LoginLayout