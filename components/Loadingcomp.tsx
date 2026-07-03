'use client'
import { motion } from "motion/react"
import { div } from "motion/react-client"
export default function Loadingcomp(){
    return(
        <div className="h-screen flex flex-col justify-center  items-center">

        <motion.div className="w-10 h-10 bg-blue-600 animate-pulse" animate={{
            scale:4,
            rotate:360,
            transition:{duration:2}
        }}>

        </motion.div>
            </div>
    )
}