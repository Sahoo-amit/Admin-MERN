import { createContext, useContext, useEffect, useState } from "react";

export const TokenContext = createContext()

export const TokenContextProvider =({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isLoading, setIsLoading] = useState(true)
    const [user,setUser] = useState('')
    const authorization = `Bearer ${token}`

    const storeToken = (token)=>{
        setToken(token)
        localStorage.setItem("token", token)
    }
    const isLoggedOut = !token
    const userLogout =()=>{
        setToken('')
        localStorage.removeItem("token")
    }

    const userAuthentication  = async()=>{
        if(!token){
            setUser(null)
            return
        }
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:4000/api/user`,{
            method:"GET",
            headers:{
                Authorization: authorization
            }
           }) 
           if(response.status===201){
            const data = await response.json()
            setUser(data.userData)
            setIsLoading(false)
           }else{
                setUser(null)
               console.error("Authentication failed:", response.status);
           }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        userAuthentication()
    },[token])

    return(
        <TokenContext.Provider value={{storeToken, isLoggedOut, userLogout, user, authorization, isLoading}}>
            {children}
        </TokenContext.Provider>
    )
}

export const useTokenContext =()=>{
    return useContext(TokenContext)
}