import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const useHandleLogOut =  () =>{

    cookies().delete(process.env.sessionCookieKey as string)
    redirect('/login');
}