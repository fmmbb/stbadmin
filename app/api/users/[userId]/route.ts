import { NextRequest, NextResponse } from "next/server";
import { validateUser } from "@/lib/auth";
import { getUser } from "@/components/actions/user";

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ userId: string }> }
) {
    const session = await validateUser();
    if (!session) {
        return NextResponse.json(
            { error: "Session expired. Please Log in." },
            { status: 401 }
        );
    }

    const { userId } = await params;
    const decodedUserId = decodeURIComponent(userId);
    console.log("decoded", decodedUserId);

    try {
        const user = await getUser(decodedUserId, session); // ✅ use decode
        return NextResponse.json(user);
    } catch (err: any) {
        return NextResponse.json(err, { status: err.status || 500 });
    }
}