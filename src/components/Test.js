import React, {useCallback, useContext, useEffect} from "react"
import {UserContext} from "../Context/UserContext";

function Test() {
        const [userContext, setUserContext] = useContext(UserContext)

        const fetchUserDetails = useCallback(() => {
            fetch("http://localhost:3000/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userContext.token}`,
                },
            }).then(async response => {
                if (response.ok) {
                    const data = await response.json()
                    setUserContext(oldValues => {
                        return {...oldValues, details: data}
                    })
                } else {
                    if (response.status === 401) {
                        window.location.reload()
                    } else {
                        setUserContext(oldValues => {
                            return {...oldValues, details: null}
                        })
                    }
                }
            })
        }, [setUserContext, userContext.token])

        useEffect(() => {
            // fetch only when user details are not present
            if (!userContext.details) {
                fetchUserDetails()
            }
        }, [userContext.details, fetchUserDetails])

        const refetchHandler = () => {
            // set details to undefined so that spinner will be displayed and
            //  fetchUserDetails will be invoked from useEffect
            setUserContext(oldValues => {
                return {...oldValues, details: undefined}
            })
        }

        return userContext.details === null ? (
            "Error Loading User details"
        ) : !userContext.details ? (
            <h1>Loader</h1>
        ) : (
               <p>
               {userContext.details.email}&nbsp;{userContext.details.name }
               </p>
        )
}
    export default Test;
