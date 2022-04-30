import "./App.css";
import { Navigate } from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import TimelineStories from "./components/timeline/timeline-stories";
import SuggestedProducts from "./components/timeline/SuggestedProducts";

import React, { Suspense, lazy } from "react";
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
import Shop from "./components/EcommerceComponent/Shop";
import AddProduct from "./components/EcommerceComponent/AddProduct";
import DetailProduct from "./components/EcommerceComponent/DetailProduct";
import Category from "./components/EcommerceComponent/Category";
import EditProduct from "./components/EcommerceComponent/EditProduct";
import Cart from "./components/EcommerceComponent/Cart";
import CheckoutCart from "./components/EcommerceComponent/CheckoutCart";
import Login from "./components/timeline/login";
import Usertimeline from "./components/timeline/usertimeline";
import TestElyes from "./components/Test-elyes";
import EditProfile from "./components/timeline/edit-profile";
import EditPassword from "./components/timeline/edit-password";
import Template from "./components/timeline/template";
import Indexcompany from "./components/company/index-company";
import Messanger from "./components/timeline/messages/messanger";
import Notification from "./components/timeline/notification";
import About from "./components/timeline/about";
import Test from "./components/test";
import Ads from './components/timeline/ads';
import AdsCrud from './components/timeline/AdsCrud'
function App() {
  const currentUserId = localStorage.getItem("currentUser");
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
          <Route
            path="/donations"
            element={currentUserId ? <Donations /> : <Login />}
          />
          <Route
            path="/donationbystate"
            element={currentUserId ? <Donationbystate /> : <Login />}
          />
          <Route
            path="/articles"
            element={currentUserId ? <Articles /> : <Login />}
          />
          <Route
            path="/donatecrud"
            element={currentUserId ? <Donatecrud /> : <Login />}
          />
          <Route
            path="/Donationdetails"
            element={currentUserId ? <Donationdetails /> : <Login />}
          />
          <Route
            path="/donationbycategorie"
            element={currentUserId ? <Donationbycategorie /> : <Login />}
          />
          <Route
            path="/test/:id1"
            element={currentUserId ? <Room /> : <Login />}
          />
          <Route path="/map" element={currentUserId ? <Maptun /> : <Login />} />
          <Route
            path="/courbe"
            element={currentUserId ? <Courbe /> : <Login />}
          />
          <Route
            path="/mapaffiche"
            element={currentUserId ? <Mapaffiche /> : <Login />}
          />
          <Route
            path="/calendar"
            element={currentUserId ? <Calendar /> : <Login />}
          />
          <Route path="/Blog" element={currentUserId ? <Blog /> : <Login />} />
          <Route
            path="/Blogdetail"
            element={currentUserId ? <Blogdetail /> : <Login />}
          />
          <Route
            path="/Addblog"
            element={currentUserId ? <Addblog /> : <Login />}
          />

          <Route path="/ads-management"   element={currentUserId ? <AdsCrud /> : <Login/>}/>


          {/* <Route path="/company" element={<Indexcompany />} /> */}
          <Route path="/shop" element={currentUserId ? <Shop /> : <Login />} />
          <Route
            path="/detailProduct/:id"
            element={currentUserId ? <DetailProduct /> : <Login />}
          />
          <Route
            path="/addProd"
            element={currentUserId ? <AddProduct /> : <Login />}
          />
          <Route
            path="/categories"
            element={currentUserId ? <Category /> : <Login />}
          />
          <Route
            path="/updateProd/:id"
            element={currentUserId ? <EditProduct /> : <Login />}
          />
          <Route path="/cart" element={currentUserId ? <Cart /> : <Login />} />
          <Route
            path="/checkout/:prix"
            element={currentUserId ? <CheckoutCart /> : <Login />}
          />
          <Route path="/" element={currentUserId ? <Accueil /> : <Login />} />
          <Route
            path="/timeline"
            element={currentUserId ? <Timeline /> : <Login />}
          />
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
            path="/timelinestories"
            element={currentUserId ? <TimelineStories /> : <Login />}
          />

          <Route
            path="/login"
            element={currentUserId ? <Navigate replace to="/" /> : <Login />}
          />

          {/* <Route path="/test" element={<TestElyes />} /> */}
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
          <Route
            path="/about"
            element={currentUserId ? <About /> : <Login />}
          />
          <Route path="/test" element={currentUserId ? <Test /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
