"use client"
import React, { createContext, useState, useContext } from "react";
interface User {
  profilePic: string | null;
  FullName: string | null;
  userName: string | null;
  posts: Posts[] | null;
  header:header|null;
  body:body|null;
  boarder:boarder|null;
  widgetSize:widgetSize|null;
}
interface header{
  headerText:string|null;
  headerColour:string|null;
  isShown:boolean|null
}
interface boarder{
  borderWidth:string|null;
  boarderColour:string|null;
  isVisible:boolean|null;
}
interface body{
  bodyColour:string|null
}
interface widgetSize{
  layoutHeight:string|null;
  layoutWidth:string|null;
}
interface comments {
  userName: string | null;
  commentString: string | null;
  likes: number | null;
}
interface Posts {
  images: string | null;
  likes: number | null;
  comments: comments[] | null;
  postText: string | null;
}
interface LayoutContextType {
  widget: User | null;
  setWidget: React.Dispatch<React.SetStateAction<User | null>>;
}
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
export  function LayoutContextProvider({children}:{children:React.ReactNode}) {
  const [widget, setWidget] = useState<User | null>(null);

  return (
    <LayoutContext.Provider value={{ widget, setWidget }}>
      {children}
    </LayoutContext.Provider>
  );
}
export function useLayout(){
    const context=useContext(LayoutContext)
    if(!context){
        throw new Error("widget must be used inside the widget context")
    }
    return context;
}
