import { cookies } from "next/headers";
import { verifySession } from "./session";
import { redirect } from "next/navigation";


export async function getSession(){
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get('session');
    if(!sessionCookie)
        return null;
    return sessionCookie.value
    
   


}

export async function validateUser(){
    const session = await getSession()
    if(!session){
        redirect("/login")
        
    }
    const verifiedSession = verifySession(session)
    if(!verifiedSession)
        redirect("/login")
    return session

    
}