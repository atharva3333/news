"use client"
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase.config";

export default function Navigation() {

  const [user] = useAuthState(auth);


    return (
        <div className="container mx-auto sm:px-10 px-1">
      <nav className="flex justify-around items-center  my-4">
        <h3 className="font-black text-3xl tracking-wide">Trendify.</h3>
        {user && 
        <div className="flex gap-4 items-center">
         {<Image className="rounded-full" src={user.photoURL} width={50} height={50} alt="user-profile"/>}
         <p className="hidden sm:block">{user.displayName}</p> 
        </div>
        }
      </nav>
      </div>
    )
  }
  