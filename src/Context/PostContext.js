import React, { createContext, useState } from "react";

export const PostContext = createContext(null)
export function Postcontextprovider({children}){
    const [productdetails,setProductdetails] = useState(null)
    return <PostContext.Provider value={{productdetails,setProductdetails}}>{children}</PostContext.Provider>
 }
