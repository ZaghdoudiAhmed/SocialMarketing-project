import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Accueil from "./components/accueil";
import Timeline from "./components/timeline/time-line";
import Timelinefriends from "./components/timeline/timeline-friends";
import Timelinegroups from "./components/timeline/timeline-groups";
import Timelinephotos from "./components/timeline/timeline-photos";
import Timelinevideos from "./components/timeline/timeline-videos";
import About from "./components/timeline/about";
import Messages from "./components/timeline/messages";
import Indexcompany from "./components/company/index-company";

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

        <Route path="/company" element={<Indexcompany />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
    // </div>
    // <Timeline />
    // <Timelinegroups />
    // <Timelinephotos />
    // <Timelinevideos />
    // <Messages />
    //<About />
  );
}

export default App;
