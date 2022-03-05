/*
import React, {useState} from 'react'

const UserContext = React.createContext([{},()=>{}])

let initialState = {}


const UserProvider = props =>{
    const [state, setState]= useState(initialState)

    return(
        <UserContext.Povider value ={[state, setState]}>
            {props.children}
        </UserContext.Povider>
    )
}
const exportedObject={
    UserContext,
    UserProvider
}

export default exportedObject;*/
import React, { useState } from "react"

const UserContext = React.createContext([{}, () => {}])

let initialState = {}

const UserProvider = props => {
    const [state, setState] = useState(initialState)

    return (
        <UserContext.Provider value={[state, setState]}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }