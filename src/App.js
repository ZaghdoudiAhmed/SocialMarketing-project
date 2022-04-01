import logo from "./logo.svg";
import "./App.css";
import Accueil from "./Components/accueil";
import Timeline from "./Components/timeline/time-line";
import Timelinefriends from "./Components/timeline/timeline-friends";
import Timelinegroups from "./Components/timeline/timeline-groups";
import Timelinephotos from "./Components/timeline/timeline-photos";
import Timelinevideos from "./Components/timeline/timeline-videos";
import About from "./Components/timeline/about";
import Messages from "./Components/timeline/messages";
import React, { Suspense, lazy } from 'react';
import './App.css';
import Acceuil from './Components/Acceuil';
import Home from './Components/Home';
import Articles from './Components/Article/Articles';
import { BrowserRouter, Routes, Router,Route } from "react-router-dom";

import TunisiaMap from './Components/Donation/TunisiaMap';
import Article from './Components/Article/Article';
import Donatecrud from './Components/Donation/Donatecrud';
import Insta from './Components/Insta';
import Test from './Components/Donation/Test';
import Blog from './Components/Blog/Blog';
import Blogdetail from './Components/Blog/Blog-detail';
import Addblog from './Components/Blog/Addblog';
import Courbe from './Components/RoomChat/Courbe';
import Calendar from './Components/Donation/Calendar';
import Elearn from './Components/RoomChat/Elearn';
import Maptun from './Components/Donation/Maptun';
import Donationdetails from './Components/Donation/Donationdetails';
import CircularProgress from '@mui/material/CircularProgress';
import Mapaffiche from './Components/Donation/Mapaffiche';
function App() {
  const Donations = React.lazy(() =>  new Promise((resolve, reject) =>
  setTimeout(() => resolve(import("./Components/Donation/Donation")), 1000)
  ));
  const Blog = React.lazy(() =>  new Promise((resolve, reject) =>
setTimeout(() => resolve(import("./Components/Blog/Blog")), 1000)
));
  return (
    <Suspense fallback={<div className="positionprogress"><CircularProgress /></div>}>
    <BrowserRouter>
      <Routes>
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/timelinefriends" element={<Timelinefriends />} />
        <Route path="/timelinegroups" element={<Timelinegroups />} />
        <Route path="/timelinephotos" element={<Timelinephotos />} />
        <Route path="/timelinevideos" element={<Timelinevideos />} />
        <Route path="/*" element={  <Donations/>}/> 
<Route path="/home" element={ <Home/>} />  
<Route path="/articles" element={ <Articles/>} />  
<Route path="/donatecrud" element={ <Donatecrud/>}/>
<Route path="/Donationdetails" element={ <Donationdetails/>}/>
<Route path="/insta" element={ <Acceuil/>}/>
<Route path="/acceuil" element={ <Acceuil/>}/>
<Route path="/test/:id1" element={ <Test/>}/>
<Route path="/map" element={ <Maptun/>}/>
<Route path="/courbe" element={ <Courbe/>}/>
<Route path="/mapaffiche" element={ <Mapaffiche/>}/>
<Route path="/calendar" element={ <Calendar/>}/>
<Route path="/Blog" element={ <Blog/>}/>
<Route path="/Blogdetail" element={ <Blogdetail/>}/>
<Route path="/Addblog" element={<Addblog/>}></Route>
<Route path="/ealearn" element={< Elearn/>}></Route>
        {/* <Route path="/company" element={<Indexcompany />} /> */}
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
   </Suspense>
  );
}

export default App;
