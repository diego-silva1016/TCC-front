import React, {createContext, useContext, useState} from "react";

import axios from 'axios'

const LoginContext = createContext()

export const LoginContextProvider = ({children}) => {
    const [company, setCompany] = useState()

    const login = async (params) => {
        const response = await axios.post(`http://localhost:3333/login`, params)

        setCompany(response.data)
    }

    const setCertificate = async () => {
        const response = await axios.post(`http://localhost:3333/company/certificate`, {id: company.id})

        setCompany(response.data)
    }

    const logout = () => {
        setCompany()
    }

    return (
        <LoginContext.Provider value={{login, company, setCertificate, logout}}>
            {children}
        </LoginContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(LoginContext)
}