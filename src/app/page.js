"use client"
import { useEffect } from "react";
import Image from "next/image";
import { useAuthState , useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase.config";
import { redirect } from "next/navigation";

export default function Home() {

  const [user, loading, error] = useAuthState(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);


  const handleSignIn = event => {
		event.preventDefault();
		signInWithGoogle();
	};

  useEffect(() => {
    if(user){
      redirect("/news")
    }
  }, [user])
  

 

  return (
    <div className="container mx-auto px-0">
    <div className="md:flex justify-evenly mt-4 mb-16 items-center gap-24">
      <Image
        className="rounded-3xl w-[70%] sm:w-[26%]"
        src="/assets/lookinggirl.jpg"
        alt="Man looking at phone"
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
      />
      <div>
      <h1 className="font-bold text-3xl md:text-5xl lg:text-7xl sm:mt-0 mt-12">Hurry up! <br/> News is like samosas <br/> best when fresh.</h1>
      <p className="text-slate-500 sm:mt-6 mt-4 text-[22px] tracking-wide">Join our spicy news platter now!</p>
        <button className=" bg-violet-800 px-16 py-6 text-slate-100 font-bold rounded-3xl sm:mt-10 mt-4 text-xl" onClick={handleSignIn}>Let me in</button>
      </div>
    </div>
    </div>
  );
}
