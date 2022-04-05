import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
/*import exportedObject from "./Context/UserContext";*/
import {UserProvider} from "./Context/UserContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import TestElyes from "./components/Test-elyes";
import Login from "./components/timeline/login";
import Messages from "./components/timeline/messages";



ReactDOM.render(
  <React.StrictMode>
      <UserProvider>
              <App />
      </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
