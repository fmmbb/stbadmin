'use client'
import { useEffect } from "react"
import { getUsers } from "@/components/actions/user"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import { Userlistperson } from "@/components/actions/user"
import Link from "next/link"
import Loadingcomp from "@/components/Loadingcomp"


export default function Homepage(){
  const router =useRouter()
  const [session,setSession] = useState('')
  const {data,error,isLoading,status} = useQuery({
    queryKey:['users'],
    queryFn:async():Promise<Userlistperson[]>=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/users`);
      if(!res.ok){
        const text = await res.text()
        throw new Error(text)
      }
      return res.json()
    }
  })


  

  
  if(isLoading){
    return(<Loadingcomp />)
  }



  return(
    <div className="p-4">
    <h1 className='text-sm text-blue-600 font-bold text-center mb-6'>USERS LIST</h1>
    {error && <p className="text-red-600">{error.message}</p>}
      <div className="shadow-lg bg-white  rounded-lg">

    {data?.map((user,index)=>(
      <div className={'flex items-center justify-between border-b border-b-gray-200  p-5 mb-2  text-sm font-medium'} key={index}>
      
      <div>
        <p>
        {`${user.firstname} ${user.lastname}`}
        </p> 
        <p className="text-xs text-gray-400">{`${user.email}`}</p>
        </div> 
        <Link className="text-xs font-semibold text-blue-600" href={`/users/${user.id}`}>View Details</Link>
      </div>
    ))}
        </div>
    </div>

  )
}