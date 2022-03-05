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
import Login from "./components/timeline/login";
import Messages from "./components/timeline/messages";
import Test from "./components/Test";
import React, {useEffect, useState} from "react";
function App() {


  return (
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timelinefriends" element={<Timelinefriends />} />
        <Route path="/timelinegroups" element={<Timelinegroups />} />
        <Route path="/timelinephotos" element={<Timelinephotos />} />
        <Route path="/timelinevideos" element={<Timelinevideos />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
         {/*<Route path="/company" element={<Indexcompany />} /> */}
        <Route path="/messages" element={<Messages />} />
    </Routes>
</BrowserRouter>

  );
}

export default App;
