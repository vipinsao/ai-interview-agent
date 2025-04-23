import { supabase } from "@/services/supabaseClient";
import React from "react";

function Provider({ children }) {
  const creatNewUser = () => {
    // supabase.auth.getUser().then((data:{user})=>{
    // })
    //check if user exists or not
  };
  return <div>{children}</div>;
}

export default Provider;
