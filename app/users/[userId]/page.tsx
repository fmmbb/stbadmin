'use client'
import TransactionForm from "@/components/Transaction"
import ShowTransactions from "@/components/Fetchtransaction"
import { useQuery ,useMutation,useQueryClient} from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { User } from "@/components/actions/user"
import {Button} from "@/components/ui/button"
import { db, userCollection } from "@/components/firebase"
import { doc, updateDoc } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import Loadingcomp from "@/components/Loadingcomp"
import { useState } from "react"
export default function Userpage(){
    const user = {
        firstname:'John',
        lastname:'Doe',
        email:'johndoe@gmail.com',
        password:'somethingpswd',
        country:"United States",
        amount:1000,
        phoneNumber:'288129912',
        accountNumber:'38938928298',
        pin:'3732'

    }
const [amount,setAmount] = useState<string>('')
    const queryClient = useQueryClient()
    const param = useParams()
    const {userId} = param 
     const {data,status,error,isLoading} = useQuery({
            queryKey:["user",userId],
            queryFn: async ():Promise<User>=> {
                const res = await fetch(`/api/users/${userId}`)
                if(!res.ok){
                    const text = await res.text()
                    throw new Error(text)
                }
                const json = await res.json()
                return json
        }
        })


    const updateAmount =  useMutation({
        mutationFn:async(newAmount:number)=>{
        if(!data?.email){
            throw new Error("User unavailable")
        }
        const docref = doc(db,'UserInfo',data?.email)
        await updateDoc(docref,{
            amount:newAmount
        })
        return newAmount
        },
        onSuccess: (newAmount)=>{
            setAmount('')
            queryClient.setQueryData(
                ["user",userId],
                (oldData:User)=>(
                    {
                        ...oldData,
                        amount:newAmount
                    }
                )
            )
        },
        onError:err=>console.log(err)
    })


        if(isLoading){

            return <Loadingcomp />
        }

    if(data){
        return(
        <div className="p-4">

     <section className='bg-white p-4 rounded-lg shadow'>
       <div className="flex justify-between items-center">

       <p className="text-2xl uppercase font-bold text-blue-600">
       {data.firstname +' '+ data.lastname} </p> 
       <Button className="text-white bg-red-600">Delete Account</Button>
       
       </div>
       <div className="mt-6">
        <p><span className="font-semibold">Email:</span> {data.email}</p>
        <p><span className="font-semibold">Password:</span> {data.password}</p>
        <p><span className="font-semibold">Country:</span> {data.country}</p>
        <div>
       <div className="flex justify-between items-center ">

        <p><span className="font-semibold">Balance:</span> {data.amount}</p>
        <p onClick={()=>{}} className="text-sm underline text-blue-600">Edit</p>
       </div>
       <Input value={amount} onChange={(e)=>setAmount(e.target.value)} required/><Button onClick={()=>{if(amount !== undefined) updateAmount.mutate(Number(amount))}} className="block ml-auto bg-black text-white mt-1">Update</Button>
            </div>    
       </div>
        
     </section>




     <section className="bg-white p-4 rounded-lg mt-6">
        <h2 className="font-bold">Transactions</h2>
        <TransactionForm email={data.email} />
        <ShowTransactions email={data.email} />
     </section>

        </div>
    )
}
}