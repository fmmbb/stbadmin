import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Loginform from "./Loginform";

export default async function Loginpage(){
    const session = await getSession()
    if(session)
        redirect('/')


    return(
        <div className=' flex flex-col justify-center px-8 h-dvh items-center'>


            <Loginform />
        </div>
    )
}

