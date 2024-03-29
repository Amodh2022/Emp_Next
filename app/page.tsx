"use client";

import Image from "next/image";
import { toast, Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpin, setShowSpin] = useState(false);
  const onSubmit = async (event: any) => {
    setShowSpin(true);
    console.log(email, password);
    event.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user.email;
        console.log(user);
        if (email === user) {
          
          router.push("/home");
          setShowSpin(false);
          toast.success("logged in ")
        }

        // ...
      })
      .catch((error: any) => {
        console.log(error);
        // ..
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        <form>
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
            {showSpin ? (
              <div className="flex justify-center">
              <TailSpin
                visible={true}
                height="30"
                width="30"
                color="#FFA500"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
              </div>
            ) : (
              <p>Login</p>
            )}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/signUp">
            <p className="text-blue-500 hover:underline ">
              Dont't have Account Sign Up?
            </p>
          </Link>
        </div>
        <Toaster/>
      </div>
    </div>
  );
}
