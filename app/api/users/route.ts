import { NextResponse } from "next/server"
import { getUsers } from "@/components/actions/user"
import { validateUser } from "@/lib/auth"

export async function GET() {
  const session = await validateUser()
  console.log(session)
  if (!session) {
    return NextResponse.json({ error: "Session expired. Please Log in." }, { status: 401 })
  }

  try {
    console.log(session)
    const users = await getUsers(session)
    return NextResponse.json(users)
  } catch(error) {
    console.log(error)
    return NextResponse.json(error, { status: 401 })
  }
}


