'use client'
import { Button } from "@/components/ui/button"
import { login } from "@/components/actions/login"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"

const initialState = {
    error:''
}
export default function Loginform() {

    const [state,formAction,pending] = useActionState(login,initialState)
  return (
    <div className="w-full border bg-white border-gray-300 p-8 rounded-lg">
        <h1 className="font-semibold">Login to your account</h1>
        <p className="text-gray-600 text-sm max-w-3/4 mt-1">Enter your email below to login to your account</p>

        <form action={formAction} className="mt-4">
            {
                state.error && <div className="mb-5 font-semibold border rounded-md p-2 text-center text-red-600">{state.error}</div>
            }
            <div>
                <Label className="mb-1" htmlFor="email">Email</Label>
                <Input name="email" className="border-gray-200 focus:border-gray-300" placeholder="m@example.com" />
            </div>
            <div className="mt-5">
                <Label className="mb-1" htmlFor="password">Password</Label>
                <Input name="password" className="border-gray-200 focus:border-gray-300" placeholder="" />
            </div>
            <Button disabled={pending} type='submit' className="block w-full bg-black text-white mt-7">Login </Button>
        </form>
    </div>
  )
}
