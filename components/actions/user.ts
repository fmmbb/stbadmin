"use server"
import { initAdmin } from "@/lib/firebase-admin";
// import { userCollection } from "../firebase"
// import { getDocs } from "firebase/firestore"
import { verifySession } from "@/lib/session";
export type User = {
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    confirmPassword:string;
    phoneNumber:string;
    amount:number;
    accountNumber:string;
    pin:string;
    country:string;

}
export interface Userlistperson{id:string,email:string,firstname:string,lastname:string}

//firebase function to get user's name and email

async function getUsersWithFirebase(): Promise<Userlistperson[]> {
    const adminApp = await initAdmin();
    const adminDb = adminApp.firestore();

    const snapShot = await adminDb
        .collection("users")
        .where("bnk", "==", "stb")
        .get();

    const users: Userlistperson[] = snapShot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
        };
    });

    return users;
}


export async function getUsers(session:string):Promise<Userlistperson[]>{
   

        const verifiedSession = verifySession(session)
        if(!verifiedSession){
            throw new Error("User Invalid") 
        }

        return await getUsersWithFirebase()
  
        

    

}

export async function getUserWithFirebase(userId:string):Promise<User>{

    const adminApp = await initAdmin()
    const adminDb =  adminApp.firestore()

    const docSnap =  await adminDb.collection("UserInfo").doc(userId).get()
    if(!docSnap){
        throw new Error("User does not exist")

    }

    return docSnap.data() as User

}


export async function getUser(userId:string,session:string):Promise<User>{

    const verifiedSession = verifySession(session)

    if(!verifiedSession){
        throw new Error("User Invalid")
    }

    return await getUserWithFirebase(userId)


}



