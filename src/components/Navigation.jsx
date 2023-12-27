"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase.config";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navigation() {
  const [user] = useAuthState(auth);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setDropdownVisible(!dropdownVisible);
      redirect("/");
    } catch (error) {
      console.error('Error signing out user', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="container mx-auto sm:px-10 px-1">
      <nav className="flex justify-around items-center my-4">
        <h3 className="font-black text-3xl tracking-wide">
          <Link href="/news">Trendify.</Link>
        </h3>
        {user && (
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="flex gap-4 items-center cursor-pointer"
            >
              <Image
                className="rounded-full"
                src={user.photoURL}
                width={50}
                height={50}
                alt="user-profile"
              />
              <p className="hidden sm:block">{user.displayName}</p>
              <Image
                className="cursor-pointer"
                width="25"
                height="25"
                src="https://img.icons8.com/sf-black/64/expand-arrow.png"
                alt="expand-arrow"
              />
            </div>
            {dropdownVisible && (
              <div className="absolute w-[250px] right-0 rounded-3xl bg-slate-100 shadow-md p-4">
                <div className="flex flex-col items-start gap-8">

                <Link href="/favourites">
                <p className="mt-4 font-bold cursor-pointer">
                <Image className="inline-block mt-[-3px] mr-3" width="25" height="25" src="https://img.icons8.com/sf-black/64/star.png" alt="star"/>
                Favourites</p>
                </Link>
                
                
                <p className="mb-4 font-bold text-red-400 cursor-pointer" onClick={handleSignOut}>
                <Image className="inline-block mt-[-3px] mr-3" width="25" height="25" src="https://img.icons8.com/fluency-systems-filled/48/exit.png" alt="exit"/>
                Sign out</p>
                
                </div>
                
              </div>
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
