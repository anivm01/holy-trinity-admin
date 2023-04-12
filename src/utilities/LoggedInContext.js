import React, { useContext, useState } from "react"

const LoggedInContext = React.createContext()
const LoggedInUpdateContext = React.createContext()


//handles the language state
export const useLoggedIn = () => {
    return useContext(LoggedInContext)
}

//handles updating the language state
export const LoggedInUpdate = () => {
    return useContext(LoggedInUpdateContext)
}


export const LoggedInProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("authToken") ? true : false)
    
    const changeLoggedIn = () => {
        setLoggedIn(current => !current)
    }

    return (
        <LoggedInContext.Provider value={loggedIn} >
            <LoggedInUpdateContext.Provider value={changeLoggedIn}>
            {children}
            </LoggedInUpdateContext.Provider>
        </LoggedInContext.Provider>
    )
}