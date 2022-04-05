import logo from "./logo.svg";
import "./App.css";
import {
  Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import About from "./components/timeline/about";
import Messanger from "./components/timeline/messages/messanger";
import Indexcompany from "./components/company/index-company";
import Usertimeline from "./components/timeline/usertimeline";
import Notification from "./components/timeline/notification";
import TestElyes from "./components/Test-elyes";
import Template from "./components/timeline/template";
import EditProfile from "./components/timeline/edit-profile";
import EditPassword from "./components/timeline/edit-password";

import Login from "./components/timeline/login";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";
function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const currentUserId = localStorage.getItem("currentUser");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUserId ? <Accueil /> : <Login />} />
        <Route exact path="/timeline" element={<Timeline />} />
        <Route path="/timeline/:userid" element={<Usertimeline />} />

        <Route
          path="/timelinefriends"
          element={currentUserId ? <Timelinefriends /> : <Login />}
        />
        <Route
          path="/timelinegroups"
          element={currentUserId ? <Timelinegroups /> : <Login />}
        />
        <Route
          path="/timelinephotos"
          element={currentUserId ? <Timelinephotos /> : <Login />}
        />
        <Route
          path="/timelinevideos"
          element={currentUserId ? <Timelinevideos /> : <Login />}
        />
        <Route
          path="/login"
          element={currentUserId ? <Navigate replace to="/" /> : <Login />}
        />

        <Route path="/test" element={<TestElyes />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/edit-password" element={<EditPassword />} />
        <Route path="/user-management" element={<Template />} />

        <Route
          path="/company"
          element={currentUserId ? <Indexcompany /> : <Login />}
        />
        <Route
          path="/messages"
          element={currentUserId ? <Messanger /> : <Login />}
        />
        <Route
          path="/notification"
          element={currentUserId ? <Notification /> : <Login />}
        />
        <Route path="/about" element={currentUserId ? <About /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
