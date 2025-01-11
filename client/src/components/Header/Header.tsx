import React, { useEffect } from "react";
import { useUser } from "../../context/userContext/usercontext";
export default function Header() {
  const { user } = useUser();
  useEffect(() => {
    if(!user)return
    console.log(user);
  }, [user]);
  return <div>Header</div>;
}
