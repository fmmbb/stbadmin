import { NextRequest, NextResponse } from "next/server"

export async function proxy(request:NextRequest){

    const session = request.cookies.get("session")

    if(!session){
        return NextResponse.redirect(new URL("/login",request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/'
}