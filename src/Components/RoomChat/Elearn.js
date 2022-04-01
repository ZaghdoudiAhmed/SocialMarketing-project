import React,{useEffect} from 'react';
import Peer from 'peerjs';
import {io}  from "socket.io-client";
import { Outlet, Link ,route,Routes,useLocation ,useNavigate,useParams} from "react-router-dom";
function Elearn(props) {
  const { id1 } = useParams();
  console.log(id1)
    useEffect(() => {
      const user = prompt("Enter your name");
      const socket = io.connect("http://localhost:2600");
      const videoGrid = document.getElementById("video-grid");
      const myVideo = document.createElement("video");
      myVideo.muted = true;
      const peers = {}
      var peer = new Peer({
        host: '/',
        path: '/peerjs',
        debug: 3,
        port: 2600,
        secure: false,
    });
       let myVideoStream;
   ///get the media of user 
      navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        }).then((stream) => {
      
          myVideoStream = stream;
          ///add video stream 
          addVideoStream(myVideo, stream);

///answer the call first
          peer.on("call", (call) => {
            console.log("call");
            call.answer(stream);
           const video = document.createElement("video");
            call.on("stream", (userVideoStream) => {
            addVideoStream(video, userVideoStream);
          
          });
          });

          socket.on("user-connected", (userId) => {
            console.log("User connected"+userId);
            ///connexion a un nouveau utilisateur et l'envoyer un stream du votre video
            connectToNewUser(userId, stream);
          });
         
        });
         socket.on("user-disconnected", (userId) => {
            if (peers[userId]) peers[userId].close()
          });
  ////a connection to the PeerServer is established
      peer.on("open", (id) => {
        socket.emit("join-room", id1, id,user);
      });


      const addVideoStream = (video, stream) => {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
          video.play();
          videoGrid.append(video);
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
        call.on('close', () => {
          video.remove()
        })
      
        peers[userId] = call
      };
      const inviteButton = document.querySelector("#inviteButton");
const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");
const change=document.querySelector("video");

muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;  
  console.log(enabled)
 var html
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
  console.log(change)
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  var html;
  if (enabled) {

    myVideoStream.getVideoTracks()[0].enabled = false;
    myVideo.srcObject = null;
    html = '<i class="fas fa-video-slash"></i>';
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    html = '<i class="fas fa-video"></i>';
    stopVideo.classList.toggle("background__red");
    stopVideo.innerHTML = html;
  }
});

inviteButton.addEventListener("click", (e) => {
  prompt(
    "Copy this link and send it to people you want to meet with",
    window.location.href
  );
});
let text = document.querySelector("#chat_message");
let send = document.getElementById("send");
let messages = document.querySelector(".messages");

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
  console.log(message);
  messages.innerHTML = messages.innerHTML +`<div class="message"> <b><i class="far fa-user-circle"></i> <span> ${userName == user ? "me" : userName}</span> </b><span>${message}</span></div>`;
    });
  
    },[]);
    return (
<div>
<div>
  <div className="header">
    <div className="logo">
      <div className="header__back">
        <i className="fas fa-angle-left" />
      </div>
      <h3>Video Chat</h3>
    </div>
  </div>  
  <div className="main">  
    <div className="main__left">
      <div className="videos__group">
        <div id="video-grid">
        </div>
      </div>
      <div className="options">
        <div className="options__left">
          <div id="stopVideo" className="options__button">
            <i className="fa fa-video-camera" />
          </div>
          <div id="muteButton" className="options__button">
            <i className="fa fa-microphone" />
          </div>
          <div id="showChat" className="options__button">
            <i className="fa fa-comment" />
          </div>
        </div>
        <div className="options__right">
          <div id="inviteButton" className="options__button">
            <i className="fas fa-user-plus" />
          </div>
        </div>
      </div>
    </div>
    <div className="main__right">
      <div className="main__chat_window">
      <div className="peoples-mesg-box">
        <div className="messages">
        </div>
      </div>
      <div className="main__message_container">
        <input id="chat_message" type="text" autoComplete="off" placeholder="Type message here..." />
        <div id="send" className="options__button">
          <i className="fa fa-plus" aria-hidden="true" />
        </div>
      </div>
    </div>
    </div>
  </div>
</div>

          
        </div>

    );
}

export default Elearn;

