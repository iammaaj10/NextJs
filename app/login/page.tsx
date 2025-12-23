"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function login() {
  const route = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const[buttonDisabled , setButtondisabled] = useState(false);
  const login = async () => {
    try {
      const userD = await axios.post("/api/users/login" , user)
      console.log(userD.data);
      toast.success("Login Successfully")
      route.push('/profile')
      
    } catch (error:any) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0) {
      setButtondisabled(false);
    } else {
      setButtondisabled(true);
    }
  })
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 text-black">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">
          Login
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={login}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            {buttonDisabled ? "cant login " : "login"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-4">
          Create an account?{" "}
          <Link href="/signUp" className="text-blue-600 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
