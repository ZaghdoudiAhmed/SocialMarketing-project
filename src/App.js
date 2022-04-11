import "./App.css";
import {

  Navigate,
} from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";

import React, { Suspense, lazy } from "react";
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

          <Route path="/donations" element={<Donations />} />
          <Route path="/donationbystate" element={<Donationbystate />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/donatecrud" element={<Donatecrud />} />
          <Route path="/Donationdetails" element={<Donationdetails />} />
          <Route path="/donationbycategorie" element={<Donationbycategorie />}/>
          <Route path="/test/:id1" element={<Room />} />
          <Route path="/map" element={<Maptun />} />
          <Route path="/courbe" element={<Courbe />} />
          <Route path="/mapaffiche" element={<Mapaffiche />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/Blog" element={<Blog />} />
          <Route path="/Blogdetail" element={<Blogdetail />} />
          <Route path="/Addblog" element={<Addblog />}></Route>
          {/* <Route path="/company" element={<Indexcompany />} /> */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/detailProduct/:id" element={<DetailProduct />} />
          <Route path="/addProd" element={<AddProduct />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/updateProd/:id" element={<EditProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/:prix" element={<CheckoutCart />} />
          <Route path="/" element={currentUserId ? <Accueil /> : <Login />} />
          <Route  path="/timeline"   element={currentUserId ? <Timeline/> : <Login /> }/>
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
    </Suspense>



  );
}

export default App;
