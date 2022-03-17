import logo from "./logo.svg";
import "./App.css";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import About from "./components/timeline/about";
import Messanger from "./components/timeline/messages/messanger";
import Indexcompany from "./components/company/index-company";

import Login from "./components/timeline/login";
import Messages from "./components/timeline/messages";
import Test from "./components/Test";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";
function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  /*const verifyUser = useCallback(() => {
    fetch("http://localhost:3000/api/users/refreshToken", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(oldValues => {
          return {...oldValues, token: null}
        })
      }
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])
  useEffect(() => {
    verifyUser()
  }, [verifyUser])*/

  /*const verifyUser = useCallback(() => {
    fetch('http://localhost:3000/api/users/refreshToken', {
      method: "POST",
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }).then(async response => {
      const data = await response.json()
      if (data.token) {
        setUserContext(oldValues => {
          return { ...oldValues, token: data.token }
        })
      } else {
        setUserContext(oldValues => {
          return { ...oldValues, token: null }
        })
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000)
    })
  }, [setUserContext])*/
  /*
  useEffect(() => {
    verifyUser()
  }, [verifyUser])*/

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timelinefriends" element={<Timelinefriends />} />
        <Route path="/timelinegroups" element={<Timelinegroups />} />
        <Route path="/timelinephotos" element={<Timelinephotos />} />
        <Route path="/timelinevideos" element={<Timelinevideos />} />
        <Route path="/login" element={<Login />} />

        <Route path="/company" element={<Indexcompany />} />
        <Route path="/messages" element={<Messanger />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
