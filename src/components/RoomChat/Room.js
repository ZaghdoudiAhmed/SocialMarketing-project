import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { io } from "socket.io-client";
import Peer from "peerjs";
import {
  Outlet,
  Link,
  route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Maptun from "../Donation/Maptun";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { DivIcon, Map } from "leaflet";
import jsPDF from "jspdf";
import axios from "axios";
import * as echarts from "echarts";
import * as d3 from "https://cdn.skypack.dev/d3@7";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import Editorcomponent from "./Editorcomponent";
import Courbe from "./Poverty";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Swal from "sweetalert2";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
const Room = () => {
  const [State, setstate] = useState(false);
  const actions = [
    { icon: <FileCopyIcon onClick={() => fn()} />, name: "Copy" },
    { icon: <SaveIcon onClick={() => printDocument()} />, name: "Save" },
    { icon: <AssessmentIcon onClick={() => chartassign()} />, name: "Static" },
    { icon: <ShareIcon />, name: "Share" },
  ];

  const navigate = useNavigate()
  const { id1 } = useParams();
  const affiche_msg = () => {
    var msg = document.querySelector(".peoples-mesg-box1");
    msg.style.visibility = "visible";
    var o = document.querySelector(".o");
    o.style.visibility = "hidden";
  };
  const affiche_participant = () => {
    var o = document.querySelector(".o");
    o.style.visibility = "visible";
    var msg = document.querySelector(".peoples-mesg-box1");
    msg.style.visibility = "hidden";
  };
  const printDocument = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector(".editorclass"), {
      callback: function (pdf) {
        pdf.save("mypdf");
      },
    });
  };

  const chartassign = () => {
    setstate(false);
  };
  const fn = () => {
    setstate(true);
  };
  const { state } = useLocation();
  useEffect(() => {
    ///console.log(state);
    const user = state.user;
    const idroom = state.id;
    const socket = io.connect("http://localhost:2600");
    const videoGrid = document.getElementById("video-grid");
    const videogroup = document.getElementById("video-group");
    var options = document.querySelector(".options");
    let h = `video${id1}`;
    var myVideo = document.createElement("video");
    ////console.log(myVideo);
    myVideo.classList.add(h);
    const peers = {};
    myVideo.muted = true;
    var peer = new Peer({
      host: "peerjs-server.herokuapp.com",
      secure: true,
      port: 443,
    });

    let myVideoStream;
    ///get the media of user
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        myVideoStream = stream;
        ///add video stream
        addmyvideoVideoStream(myVideo, stream);
        ///answer the call first
        peer.on("call", (call) => {
          //// console.log("call");
          call.answer(stream);
          const video = document.createElement("video");
          video.classList.add("ab");
          call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          });
        });
        socket.on("user-connected", (userId) => {
          //// console.log("User connected"+userId);
          ///connexion a un nouveau utilisateur et l'envoyer un stream du votre video
          connectToNewUser(userId, stream);
        });
      });
    socket.on("user-disconnected", (userId) => {
      if (peers[userId]) peers[userId].close();
    });
    peer.on("open", (id) => {
      socket.emit("join-room", id1, id, user);
    });
    const addVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
        videoGrid.append(video);
      });
    };
    const addmyvideoVideoStream = (video, stream) => {
      video.srcObject = stream;
      video.addEventListener("loadedmetadata", () => {
        video.play();
        videogroup.append(video);
      });
    };
    const connectToNewUser = (userId, stream) => {
      ///faire un call a cet utilisateur
      const call = peer.call(userId, stream);
      const video = document.createElement("video");
      ////reponse a votre call avec un retour de son stream
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
      call.on("close", () => {
        video.remove();
      });
      video.classList.add("ab");
      peers[userId] = call;
    };
    const muteButton = document.querySelector("#muteButton");
    const stopVideo = document.querySelector("#stopVideo");
    muteButton.addEventListener("click", () => {
      const enabled = myVideoStream.getAudioTracks()[0].enabled;
      //// console.log(enabled)
      var html;
      if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        html = '<i class="fas fa-microphone-slash"></i>';
        muteButton.classList.toggle("background__red");
        muteButton.innerHTML = html;
      } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        html = '<i class="fas fa-microphone"></i>';
        muteButton.classList.remove("background__red");
        muteButton.innerHTML = html;
      }
    });
    stopVideo.addEventListener("click", () => {
      const enabled = myVideoStream.getVideoTracks()[0].enabled;
      var html;

      if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        /* document.documentElement.style.setProperty("--selection-background", "white");*/
        html = '<i class="fas fa-video-slash"></i>';
        stopVideo.classList.toggle("background__red");
        myVideo.classList.add("alt");
        stopVideo.innerHTML = html;
      } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        /*document.documentElement.style.setProperty("--selection-background", "none"); */
        html = '<i class="fas fa-video"></i>';
        stopVideo.classList.toggle("background__red");
        stopVideo.innerHTML = html;
      }
    });
    let text = document.querySelector("#chat_message");
    let send = document.getElementById("send");
    let messages = document.querySelector(".chatting-area");
    const inviteButton = document.querySelector("#inviteButton");
    inviteButton.addEventListener("click", async (e) => {
      await Swal.fire({
        input: "text",
        inputLabel: "Your room Id, you can share it with your friend ",
        inputValue: idroom,
        showCancelButton: true,
      });
    });
    send.addEventListener("click", (e) => {
      if (text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
      }
    });
    text.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && text.value.length !== 0) {
        socket.emit("message", text.value);
        text.value = "";
      }
    });
    socket.on("createMessage", (message, userName) => {
      messages.innerHTML =
        messages.innerHTML +
        `${
          userName == user
            ? `<li class="me"><figure><img src="images/resources/userlist-1.jpg" alt /></figure><p class="dt">${message}</p></span><p class="df" >send by ${userName}</p></li>`
            : `<li class="you"><figure><img src="images/resources/userlist-2.jpg" alt /></figure><p class="dt">${message}</p><p class="df" >send by ${userName}</p></li>`
        }`;
    });
  }, []);
  var option;
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xlg" className="bluesh high-opacity">
        <div
          className="content-bg-wrap"
        />
        <div className="container-fluid">
          <Box className="top-bannerr" sx={{ height: "100vh" }}>
            <Container sx={{ padding: 10 }} maxWidth="lg">
              <Box
                spacing={18}
                sx={{
                  bgcolor: "white",
                  height: "80vh",
                  padding: 2,
                  display: "flex",
                }}
                boxShadow={10}
                borderRadius={3}
              >
                <Box
                  sx={{ bgcolor: "#EDF0F4", height: "75vh", width: "45vh" }}
                  borderRadius={1}
                >
                  <div className="head">
                    <p className="design"> Group Chat</p>
                    <Button onClick={affiche_msg} size="small" className="butt">
                      Messages
                    </Button>
                    <Button
                      size="small"
                      onClick={affiche_participant}
                      className="butt"
                    >
                      Participants
                    </Button>
                  </div>
                  <Divider sx={{ margin: 1 }} />
                  <div className="o"> here</div>
                  <div className="peoples-mesg-box1">
                    <ul className="chatting-area"></ul>
                    <div className="message-text-container">
                      <span className="form">
                        <textarea
                          id="chat_message"
                          placeholder="write your message"
                          defaultValue={""}
                        />
                        <button className="do" id="send" title="send">
                          <i className="fa fa-paper-plane" />
                        </button>
                      </span>
                    </div>
                  </div>
                </Box>
                <div className="color">
                  <div className="front">
                    <div id="video-group">
                      <div id="video-grid"></div>
                    </div>
                    <div></div>
                    <div className="options">
                      <div id="stopVideo" className="options__button" alt="hh">
                        <i className="fa fa-video-camera" />
                      </div>
                      <div id="muteButton" className="options__button">
                        <i className="fa fa-microphone" />
                      </div>
                      <div id="showChat" className="options__button">
                        <i className="fa fa-comment" />
                      </div>
                      <div id="inviteButton" className="options__button">
                        <i className="fas fa-user-plus" />
                      </div>
                    </div>
                  </div>
                </div>
                <Fab color="primary" aria-label="add">
  <ExitToAppIcon onClick={()=>{
const video = document.querySelector('video');

// A video's MediaStream object is available through its srcObject attribute
const mediaStream = video.srcObject;

// Through the MediaStream, you can get the MediaStreamTracks with getTracks():
const tracks = mediaStream.getTracks();

// Tracks are returned as an array, so if you know you only have one, you can stop it with: 
tracks[0].stop();

// Or stop all like so:
tracks.forEach(track => track.stop())
navigate('/')
}}
    />
</Fab>
              </Box>
            </Container>
          </Box>{" "}
        </div>
        <Card className="coloring" sx={{ minWidth: 275 }}>
          <CardContent className="dflex">
            <Maptun className="centre_page"></Maptun>
            <Editorcomponent name={State} />
          </CardContent>
          <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon />}
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>

          </Box>

        </Card>
      </Container>
    </div>
  );
};

export default Room;
