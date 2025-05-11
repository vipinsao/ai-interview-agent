"use client";
import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/services/supabaseClient";

function WelcomeContainer() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const logout = async () => {
      await supabase.auth.signOut();
      setUser(null); // clear state
    };

    router.push("/auth"); // redirect after logout
  };

  return (
    <div className="border bg-white p-5 rounded-2xl flex  justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">Welcome Back,{user?.name}</h2>
        <h2 className="text-gray-500">
          AI-Driven Interviews, Hassel-Free Hiring
        </h2>
      </div>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={user?.picture}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full select-none cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32 ">
            <DropdownMenuItem
              onClick={handleLogout}
              className={"cursor-pointer text-white font-bold  bg-red-800"}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

export default WelcomeContainer;
