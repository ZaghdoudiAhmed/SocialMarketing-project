import logo from "./logo.svg";
import "./App.css";
import { Router, Routes, Route } from "react-router-dom";
import Accueil from "./components/accueil";
//import Timeline from "./components/timeline/time-line";
//import Timelinefriends from "./components/timeline/timeline-friends";
//import Timelinegroups from "./components/timeline/timeline-groups";
//import Timelinephotos from "./components/timeline/timeline-photos";
//import Timelinevideos from "./components/timeline/timeline-videos";
//import About from "./components/timeline/about";
//import Messages from "./components/timeline/messages";

function App() {
  return (
    <Accueil />
    //   <Router>
    //     <Routes>
    //       <Route path="/timeline" element={<Timeline />} />
    //     </Routes>
    //   </Router>
    // </div>
    // <Timeline />
    // <Timelinefriends />
    // <Timelinegroups />
    // <Timelinephotos />
    // <Timelinevideos />
    // <Messages />
    //<About />
  );
}

export default App;
