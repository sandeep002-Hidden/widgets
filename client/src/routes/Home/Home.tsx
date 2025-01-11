import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/userContext/usercontext";
export default function Home() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState({
    Message: "",
    isGood: true,
  });
  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userdetails = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/user/getuserdetails`,
          { withCredentials: true }
        );
        console.log(userdetails.data);
        if(userdetails.data.success){
          setUser(userdetails.data.user)
        }
      } catch (error) {
        const err = error as AxiosError;
        const errorMessage =
          err.response?.data?.message || "An error occurred";
        setMessage({ ...message, Message: errorMessage, isGood: false });
      }
    };
    getUserDetails();
  }, []);
  return <div className="bg-black dark:bg-red-700">Homeeee</div>;
}
