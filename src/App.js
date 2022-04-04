import "./App.css";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import Messages from "./components/timeline/messages";
import React, { Suspense, lazy } from "react";
import "./App.css";
import Acceuil from "./components/Acceuil";
import Donationbystate from "./components/Donation/Donationbystate";
import Articles from "./components/Article/Articles";
import { BrowserRouter, Routes, Router, Route } from "react-router-dom";
import Donatecrud from "./components/Donation/Donatecrud";
import Room from "./components/RoomChat/Room";
import Blogdetail from "./components/Blog/Blog-detail";
import Addblog from "./components/Blog/Addblog";
import Courbe from "./components/RoomChat/Poverty";
import Calendar from "./components/Donation/Calendar";
import Maptun from "./components/Donation/Maptun";
import Donationdetails from "./components/Donation/Donationdetails";
import Donationbycategorie from "./components/Donation/Donationbycategorie";
import CircularProgress from "@mui/material/CircularProgress";
import Mapaffiche from "./components/Donation/Mapaffiche";
function App() {
  const Donations = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(
          () => resolve(import("./components/Donation/Donation")),
          1000
        )
      )
  );
  const Blog = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import("./components/Blog/Blog")), 1000)
      )
  );
  return (
    <Suspense
      fallback={
        <div className="positionprogress">
          <CircularProgress />
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/timelinefriends" element={<Timelinefriends />} />
          <Route path="/timelinegroups" element={<Timelinegroups />} />
          <Route path="/timelinephotos" element={<Timelinephotos />} />
          <Route path="/timelinevideos" element={<Timelinevideos />} />
          <Route path="/*" element={<Donations />} />
          <Route path="/donationbystate" element={<Donationbystate />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/donatecrud" element={<Donatecrud />} />
          <Route path="/Donationdetails" element={<Donationdetails />} />
          <Route path="/donationbycategorie" element={<Donationbycategorie />}/>
          <Route path="/insta" element={<Acceuil />} />
          <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/test/:id1" element={<Room />} />
          <Route path="/map" element={<Maptun />} />
          <Route path="/courbe" element={<Courbe />} />
          <Route path="/mapaffiche" element={<Mapaffiche />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blogdetail" element={<Blogdetail />} />
          <Route path="/Addblog" element={<Addblog />}></Route>
          {/* <Route path="/company" element={<Indexcompany />} /> */}
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
