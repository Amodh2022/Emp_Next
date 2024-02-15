"use client"

import Image from "next/image";
import { toast ,Toaster} from 'react-hot-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";

export default function SignUp() {
  let router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit =async(event:any)=> {
    console.log(email,password)
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        toast.success("Successfully Signed Up")
        router.push('/login')
        // ...
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error("Email address  already in use")
            
            break;
          case 'auth/invalid-email':
            toast.error("Email address is Invalid")
            break;
          case 'auth/operation-not-allowed':
            toast.error("Error Sign Up")
            break;
          case 'auth/weak-password':
            console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            console.log(error.message);
            break;
        }
        // ..
      });
  };
  return (
    
    <div className="flex justify-center items-center h-screen">
       
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign Up</h2>
        <form >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
            />{" "}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
            />{" "}
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600"
          >
            SignUp
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:underline">
        
          </a>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
