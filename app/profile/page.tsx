"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function profilePage() {
    const route = useRouter();

    const logout = async () =>{
        try {
            await axios.get('/api/users/logout');
            route.push('/login')
            toast.success("Logout successfull");
        } catch (error:any) {
            toast.error("Something went wrong")
        }
    }
    return(
        <div className="flex justify-center items-center">
           <div>
             <h1 className="mt-10">Profile page</h1>
            <p>This is the profile page</p>
            <button className="p-2 rounded-2xl bg-blue-500 hover:bg-blue-900 font-bold" onClick={logout}>Logout</button>
           </div>
        </div>
    )
}