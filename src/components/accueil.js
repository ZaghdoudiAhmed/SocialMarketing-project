import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Select, { AriaOnFocus } from "react-select";
import SuggestedProducts from "./timeline/SuggestedProducts";
import Ads from './timeline/ads'
import axios from "axios";
import Swal from "sweetalert2";
import { io } from "socket.io-client";
import { Modal, Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Mentions from "rc-mentions";
import Fab from '@mui/material/Fab';

import Post from "./post/post";
import Header from "./header";
import Story from "./Story/stories";
import Shortcuts from "./timeline/shortcuts";
import Loading from "./loading";

function Accueil() {
  const url = "http://localhost:2600/posts";
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const { Option } = Mentions;

  const navigate = useNavigate();
  const [userContext, setUserContext] = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [showpropic, setShowProPic] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  const [btnClass, setBtnClass] = useState(null);

  const [verif, setVerify] = useState("");
  const [result, setResult] = useState(null);
  const [fblink, setFbLink] = useState("");
  const [lilink, setLiLink] = useState("");
  const inputEl = useRef(null);
  const [interests, setInterests] = useState();

  function handleChange() {
    /*setBtnClass(selectedOption)*/
    console.log(`Option selected:`, inputEl.current.getValue());
    setInterests(inputEl.current.getValue());
    console.log(interests);
  }
  const [value, setValue] = useState();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);
  //user infos
  const [profilePic, setProfilePic] = useState();
  const [cover, setCover] = useState("images/cover-preview.jpg");
  const [file, setFile] = useState(
    "data:image/png;base64,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"
  );
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const handleClose = () => setShow1(false);

  const options = [
    {
      value: "Exercising",
      label: "Exercising " + <i className="bi bi-heart-pulse" />,
    },
    { value: "Cooking", label: "Cooking" },
    { value: "Reading", label: "Reading" },
    { value: "Coding", label: "Coding" },
    { value: "Gaming", label: "Gaming" },
  ];

  const [currentUser, setCurrentUser] = useState("");
  const currentUserId = localStorage.getItem("currentUser");

  const Toast = Swal.mixin({
    toast: true,
    position: "top-start",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  async function verification(e) {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:2600/api/users/verifyEmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser._id,
          verif,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      setResult(true);
    } else {
      setResult(false);
    }
  }

  async function updateAccount() {
    const response = await fetch(
      "http://localhost:2600/api/users/updateAccount",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentUser._id,
          bio,
          phone,
          birthday,
          address,
          interests,
          fblink,
          lilink,
        }),
      }
    );
    const data = await response.json();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const post = new FormData();

    const text = currentUser.name + " posted a post";

    post.append("Photo", files);
    post.append("Description", newDescription);
    post.append("Creator", currentUserId);

    try {
      await axios.post(url, post).then((res) => {
        Toast.fire({
          icon: "success",
          title: "Your post is added succesfuly",
        });

        if (currentUserId !== res.data.Creator._id) {
          socket.emit("sendNotification", {
            senderId: res.data.Creator._id,
            receiverId: currentUserId,
            text: text,
          });
        }

        setPostData([res.data, ...postData]);
        setNewDescription("");
        setFiles(null);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlefollow = async (userId, username) => {
    const user = {
      userId: currentUserId,
    };
    try {
      axios
        .put("http://localhost:2600/api/users/" + userId + "/follow", user)
        .then((res) => {
          Toast.fire({
            icon: "info",
            title: "you follow " + username,
          });
          const newList = setUsers.filter((u) => u._id !== userId);
          setUsers(newList);
          // reload.window()
        });
    } catch (err) {
      console.log(err);
    }
  };

  const getPosts = async () => {
    try {
      axios.get(url + "/").then((res) => {
        setPostData(res.data);
        setLoading(true);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getFriends = async () => {
    try {
      const friendList = await axios.get(
        "http://localhost:2600/api/users/friends/" + currentUserId
      );
      setFriends(friendList.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getNotFollowers = async () => {
    try {
      await axios
        .get("http://localhost:2600/api/users/all/" + currentUserId)
        .then((res) => {
          setUsers(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePost = (id) => {
    Swal.fire({
      title: "Are you sure to delete your post ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get("http://localhost:2600/posts/delete/" + id).then((res) => {
          const newList = postData.filter((post) => post._id !== id);
          setPostData(newList);
        });

        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    });
  };

  const handleConversation = (userid) => {
    const members = {
      senderId: currentUserId,
      receiverId: userid,
    };
    const status = axios
      .get(
        "http://localhost:2600/conversations/find/" +
          currentUserId +
          "/" +
          userid
      )
      .then((res) => {
        if (res.data == null) {
          axios
            .post("http://localhost:2600/conversations/", members)
            .then((res) => {
              Toast.fire({
                icon: "success",
                title: "New conversation !",
              });

              setTimeout(() => {
                navigate("/messages");
              }, 3000);
            });
        } else {
          navigate("/messages");
        }
      });
  };

  useEffect(() => {
    setSocket(io("http://localhost:2700"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    getPosts();
    getFriends();
    getNotFollowers();
  }, []);

  useEffect(() => {
    fetch("http://localhost:2600/api/users/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentUserId,
      }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setCurrentUser(data.user);
        if (data.user.firstTime.toString() === "true") {
          if (data.user.verified.toString() === "false") {
            setShow(true);
            var code = "";
            var characters =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < 8; i++) {
              code += characters.charAt(
                Math.floor(Math.random() * charactersLength)
              );
            }
            await fetch("http://localhost:2600/api/users/mail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                code: code,
                id: data.user._id,
                mail: data.user.email,
              }),
            });
          } else {
            setShowProPic(true);
          }
        } else {
          if (response.status === 401) {
            window.location.reload();
          } else {
            setUserContext((oldValues) => {
              return { ...oldValues, details: null };
            });
          }
        }
      }
    });
  }, []);

  let Options = users.map((u) => (
    <Option key={u._id} value={u.name} className="dynamic-option">
      <img src={"/uploads/users/" + u.profilepic} alt={u.profilepic} />
      <span>{u.name}</span>
    </Option>
  ));

  return (
    <>
      <>
        {/*verify email modal*/}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div className="stepper-wrapper">
                <div className="stepper-item active">
                  <div className="step-counter">1</div>
                  <div className="step-name">Email verification</div>
                </div>
                <div className="stepper-item">
                  <div className="step-counter">2</div>
                  <div className="step-name">Profile picture</div>
                </div>
                <div className="stepper-item ">
                  <div className="step-counter">3</div>
                  <div className="step-name">Cover picture</div>
                </div>
                <div className="stepper-item ">
                  <div className="step-counter">4</div>
                  <div className="step-name">Personal Information</div>
                </div>
                <div className="stepper-item">
                  <div className="step-counter">5</div>
                  <div className="step-name">Become premium</div>
                </div>
              </div>
            </>
            {result === true ? (
              <div className="alert alert-success" role="alert">
                account Verified. <i className="bi bi-check-circle" />
              </div>
            ) : result === false ? (
              <div className="alert alert-danger" role="alert">
                Wrong or expired code, please check the code or refresh the page
                to receive a new one <i className="bi bi-x-circle" />
              </div>
            ) : null}
            In order to access our web site you need to verify your Email first.{" "}
            <br />
            Please check your email and type the verification code you received.
            <div className="form-group">
              <input
                type="text"
                required
                name={"verif"}
                onChange={(e) => {
                  setVerify(e.target.value);
                }}
              />
              <label className="control-label" htmlFor="input">
                verification code
              </label>
              <i className="mtrl-select" />
              <button className="mtr-btn" type="button" onClick={verification}>
                <span>Register</span>
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {result === true ? (
              <Button
                variant="primary"
                onClick={() => {
                  setShow(false);
                  setShowProPic(true);
                }}
              >
                Next
              </Button>
            ) : null}
          </Modal.Footer>
        </Modal>
        {/*profile pic modal*/}
        <Modal
          show={showpropic}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ textAlign: "center" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ textAlign: "center" }}>
              User registration
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="offset-xs-1 offset-md-1">
              <>
                <div className="stepper-wrapper">
                  <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Email verification</div>
                  </div>
                  <div className="stepper-item active">
                    <div className="step-counter">2</div>
                    <div className="step-name">Profile picture</div>
                  </div>
                  <div className="stepper-item">
                    <div className="step-counter">3</div>
                    <div className="step-name">Cover picture</div>
                  </div>
                  <div className="stepper-item ">
                    <div className="step-counter">4</div>
                    <div className="step-name">Personal Information</div>
                  </div>
                  <div className="stepper-item">
                    <div className="step-counter">5</div>
                    <div className="step-name">Become premium</div>
                  </div>
                </div>
              </>
              <form
                method={"POST"}
                action={"http://localhost:2600/api/users/updateprofilepic"}
                encType="multipart/form-data"
                target="hidden-form"
              >
                <label>pp picker</label>
                <input
                  type={"file"}
                  accept={".png , .jpg, .jpeg"}
                  className="form-control style-none disp"
                  name={"image"}
                  onChange={(e) => {
                    setFile(window.URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <br />
                <input
                  type={"text"}
                  value={currentUser.email}
                  name={"email"}
                  readOnly
                />
                <input
                  type={"submit"}
                  value={"submit"}
                  onClick={() => {
                    setShowProPic(false);
                    setShow1(true);
                  }}
                />
              </form>
              <iframe style={{ display: "none" }} name="hidden-form" />
              <br />
              <h1>Preview</h1>
            </div>
            <div className={"preview"}>
              <img
                className={"previewPCImage"}
                src={"images/cover-preview.jpg"}
                alt={"profile cover preview"}
              />
              <img
                className={"previewPPImage"}
                src={file}
                alt={"profile picture preview"}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                setShowProPic(false);
                setShow1(true);
              }}
            >
              next
            </Button>
          </Modal.Footer>
        </Modal>
        {/*cover pic modal*/}
        <Modal
          show={show1}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{ textAlign: "center" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Cover picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="offset-xs-1 offset-md-1">
              <>
                <div className="stepper-wrapper">
                  <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Email verification</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">2</div>
                    <div className="step-name">Profile picture</div>
                  </div>
                  <div className="stepper-item active">
                    <div className="step-counter">3</div>
                    <div className="step-name">Cover picture</div>
                  </div>
                  <div className="stepper-item ">
                    <div className="step-counter">4</div>
                    <div className="step-name">Personal Information</div>
                  </div>
                  <div className="stepper-item ">
                    <div className="step-counter">5</div>
                    <div className="step-name">Become premium</div>
                  </div>
                </div>
              </>
              <form
                method={"POST"}
                action={"http://localhost:2600/api/users/updatecoverpic"}
                encType="multipart/form-data"
                target="hidden-form"
              >
                <label className={"mr-3"}>
                  please pick you first cover picture
                </label>
                <input
                className="disp"
                  type="file"
                  accept={".png , .jpg, .jpeg"}
                  name={"image"}
                  onChange={(e) => {
                    setCover(window.URL.createObjectURL(e.target.files[0]));
                  }}
                />
                <br />
                <input
                  type={"text"}
                  value={currentUser.email}
                  name={"email"}
                  hidden
                  readOnly
                />
                <input type={"submit"} value={"submit"} />
              </form>
              <iframe style={{ display: "none" }} name="hidden-form" />
              <br />
              <h1>Preview</h1>
            </div>
            <div className={"preview"}>
              <img
                className={"previewPCImage"}
                src={cover}
                alt={"profile cover preview"}
              />
              <img
                className={"previewPPImage"}
                src={file}
                alt={"profile picture preview"}
              />
            </div>
            <br />

            <input type={"submit"} value={"submit"} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow1(false);
                setShowProPic(true);
              }}
            >
              previous
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShow1(false);
                setShow2(true);
              }}
            >
              Next
            </Button>
          </Modal.Footer>
        </Modal>
        {/*personal info modal*/}
        <Modal
          show={show2}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Personal Information</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: 70 + "vh", overflowY: "auto" }}>
            <div className="offset-xs-1 offset-md-1">
              <>
                <div className="stepper-wrapper">
                  <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Email verification</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">2</div>
                    <div className="step-name">Profile picture</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">3</div>
                    <div className="step-name">Cover picture</div>
                  </div>
                  <div className="stepper-item active">
                    <div className="step-counter">4</div>
                    <div className="step-name" style={{ textAlign: "center" }}>
                      Personal Information
                    </div>
                  </div>
                  <div className="stepper-item">
                    <div className="step-counter">5</div>
                    <div className="step-name">Become premium</div>
                  </div>
                </div>
              </>
            </div>
            <div className="col-md-10 offset-xs-1 offset-md-1">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                beatae blanditiis dolorem laborum magni, modi molestiae odio
                similique vel voluptatum. A, architecto culpa impedit itaque
                nihil nostrum optio provident sit.
              </p>
              <div className="offset-md-1">
                <form>
                  <div className={"row my-1"}>
                    <label
                      htmlFor="birthday"
                      className="col-sm-2 col-form-label"
                    >
                      Birthday
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="date"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="birthday"
                        value={birthday}
                        onChange={(e) => {
                          setBirthday(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label htmlFor="phone" className="col-sm-2 col-form-label">
                      Phone
                    </label>
                    <div className="col-sm-8">
                      <PhoneInput
                        className="form-control"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={setPhone}
                        defaultCountry={"TN"}
                      />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label
                      htmlFor="address"
                      className="col-sm-2 col-form-label"
                    >
                      Address
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="address"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label htmlFor="bio" className="col-sm-2 col-form-label">
                      Bio
                    </label>
                    <div className="col-sm-8">
                      <textarea
                        className="form-control"
                        name="bio"
                        rows="5"
                        placeholder="bio"
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label
                      htmlFor="exampleFormControlSelect2"
                      className="col-sm-2 col-form-label"
                    >
                      Intrests
                    </label>
                    <div className="col-sm-8">
                      <Select ref={inputEl} options={options} isMulti={true} />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label
                      htmlFor="address"
                      className="col-sm-2 col-form-label"
                    >
                      Facebook
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="Facebook account"
                        value={fblink}
                        onChange={(e) => {
                          setFbLink(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className={"row my-1"}>
                    <label
                      htmlFor="address"
                      className="col-sm-2 col-form-label"
                    >
                      LinkedIn
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail3"
                        placeholder="linkedin Account"
                        value={lilink}
                        onChange={(e) => {
                          setLiLink(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow1(false);
                setShowProPic(true);
              }}
            >
              previous
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                handleChange();
                setShow2(false);
                setShow3(true);
              }}
            >
              Next
            </Button>
          </Modal.Footer>
        </Modal>
        {/*become premium modal*/}
        <Modal
          show={show3}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Header closeButton>
            <Modal.Title>Become Premium</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="offset-xs-1 offset-md-1">
              <>
                <div className="stepper-wrapper">
                  <div className="stepper-item completed">
                    <div className="step-counter">1</div>
                    <div className="step-name">Email verification</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">2</div>
                    <div className="step-name">Profile picture</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">3</div>
                    <div className="step-name">Cover picture</div>
                  </div>
                  <div className="stepper-item completed">
                    <div className="step-counter">4</div>
                    <div className="step-name" style={{ textAlign: "center" }}>
                      Personal Information
                    </div>
                  </div>
                  <div className="stepper-item active">
                    <div className="step-counter">5</div>
                    <div className="step-name">Become premium</div>
                  </div>
                </div>
              </>
            </div>
            <div className="col-md-10 offset-xs-1 offset-md-1">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
                beatae blanditiis dolorem laborum magni, modi molestiae odio
                similique vel voluptatum. A, architecto culpa impedit itaque
                nihil nostrum optio provident sit.
              </p>
              <div className="offset-md-4">
                <button className={"btn-lg btn-success"}>Become premium</button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow3(false);
                setShow2(true);
              }}
            >
              previous
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                updateAccount();
                setShow3(false);
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div>
        <div className="theme-layout">
          <Header
            socket={socket}
            currentUserId={currentUserId}
            friends={friends}
          />

          <div className="fixed-sidebar right">
            <div className="chat-friendz">
              <ul className="chat-users">
                {friends.map((f) => (
                  <li key={f._id}>
                    <div
                      className="author-thmb"
                      onClick={() => handleConversation(f._id)}
                    >
                      <img src={"/uploads/users/" + f.profilepic} alt />
                      <span className="status f-online" />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="chat-box">
                <div className="chat-head">
                  <span className="status f-online" />
                  <h6>Bucky Barnes</h6>
                  <div className="more">
                    <span className="more-optns">
                      <i className="ti-more-alt" />
                      <ul>
                        <li>block chat</li>
                        <li>unblock chat</li>
                        <li>conversation</li>
                      </ul>
                    </span>
                    <span className="close-mesage">
                      <i className="ti-close" />
                    </span>
                  </div>
                </div>
                <div className="chat-list">
                  <ul>
                    <li className="me">
                      <div className="chat-thumb">
                        <img src="images/resources/chatlist1.jpg" alt />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for
                          tomorrow! I’m gonna be handling the gifts and Jake’s
                          gonna get the drinks
                        </span>
                        <span className="notification-date">
                          <time
                            dateTime="2004-07-24T18:18"
                            className="entry-date updated"
                          >
                            Yesterday at 8:10pm
                          </time>
                        </span>
                      </div>
                    </li>
                    <li className="you">
                      <div className="chat-thumb">
                        <img src="images/resources/chatlist2.jpg" alt />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for
                          tomorrow! I’m gonna be handling the gifts and Jake’s
                          gonna get the drinks
                        </span>
                        <span className="notification-date">
                          <time
                            dateTime="2004-07-24T18:18"
                            className="entry-date updated"
                          >
                            Yesterday at 8:10pm
                          </time>
                        </span>
                      </div>
                    </li>
                    <li className="me">
                      <div className="chat-thumb">
                        <img src="images/resources/chatlist1.jpg" alt />
                      </div>
                      <div className="notification-event">
                        <span className="chat-message-item">
                          Hi James! Please remember to buy the food for
                          tomorrow! I’m gonna be handling the gifts and Jake’s
                          gonna get the drinks
                        </span>
                        <span className="notification-date">
                          <time
                            dateTime="2004-07-24T18:18"
                            className="entry-date updated"
                          >
                            Yesterday at 8:10pm
                          </time>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <form className="text-box">
                    <textarea
                      placeholder="Post enter to post..."
                      defaultValue={""}
                    />
                    <div className="add-smiles">
                      <span title="add icon" className="em em-expressionless" />
                    </div>
                    <div className="smiles-bunch">
                      <i className="em em---1" />
                      <i className="em em-smiley" />
                      <i className="em em-anguished" />
                      <i className="em em-laughing" />
                      <i className="em em-angry" />
                      <i className="em em-astonished" />
                      <i className="em em-blush" />
                      <i className="em em-disappointed" />
                      <i className="em em-worried" />
                      <i className="em em-kissing_heart" />
                      <i className="em em-rage" />
                      <i className="em em-stuck_out_tongue" />
                    </div>
                    <button type="submit" />
                  </form>
                </div>
              </div>
            </div>
          </div>
      
          {/* left sidebar menu */}
          <section>
            <div className="gap2 gray-bg">
              <div className="container-fluid pm">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row merged20" id="page-contents">
                      <div className="col-lg-3">
                        <aside className="sidebar static left">
                          <Shortcuts />
                          {/* Shortcuts */}
                          <div className="widget">
                            <h4 className="widget-title">Recent Activity</h4>
                            <ul className="activitiez">
                              {/* <li>
                                <div className="activity-meta">
                                  <i>10 hours Ago</i>
                                  <span>
                                    <a href="#" title>
                                      Commented on Video posted{" "}
                                    </a>
                                  </span>
                                  <h6>
                                    by <a href="time-line.html">black demon.</a>
                                  </h6>
                                </div>
                              </li>
                              <li>
                                <div className="activity-meta">
                                  <i>30 Days Ago</i>
                                  <span>
                                    <a href="#" title>
                                      Posted your status. “Hello guys, how are
                                      you?”
                                    </a>
                                  </span>
                                </div>
                              </li>
                              <li>
                                <div className="activity-meta">
                                  <i>2 Years Ago</i>
                                  <span>
                                    <a href="#" title>
                                      Share a video on her timeline.
                                    </a>
                                  </span>
                                  <h6>
                                    "<a href="#">you are so funny mr.been.</a>"
                                  </h6>
                                </div>
                              </li> */}
                            </ul>
                          </div>
                          {/* recent activites */}
                          <div className="widget stick-widget lp">
                            <h4 className="widget-title">Other Users</h4>
                            <ul className="followers">
                              {users.map((u) => (
                                <li key={u._id}>
                                  <figure>
                                    <img
                                      src={
                                        u.profilepic
                                          ? "/uploads/users/" + u.profilepic
                                          : "/images/resources/friend-avatar2.jpg"
                                      }
                                      alt
                                    />
                                  </figure>
                                  <div className="friend-meta">
                                    <h4>
                                      <Link to={`/timeline/${u._id}`} title>
                                        {u.name}
                                      </Link>
                                    </h4>
                                    {currentUser?.followers?.includes(
                                      u._id
                                    ) ? null : (
                              
                                    
<Fab className="cop" color="primary">
  <PersonAddIcon onClick={() =>
                                        handlefollow(u._id, u.name)
                                      }
                                  />
</Fab>

                                    )}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* who's following */}
                        </aside>
                      </div>
                      {/* sidebar */}
                      {/* <div style={{ paddingTop: 200 }}>
                        <Mentions autoSize transitionName="motion-zoom">
                          {Options}
                        </Mentions>
                      </div> */}
                      <div className="col-lg-6">
                        <div className="central-meta">
                          <Story
                            currentUserId={currentUserId}
                            currentUser={currentUser}
                          />
                        </div>
                        <SuggestedProducts/>
                        <div className="central-meta">
                          <div className="new-postbox">
                            <figure>
                              <img
                                width="35"
                                height="35"
                                src={"/uploads/users/" + currentUser.profilepic}
                                alt
                              />
                            </figure>
                            <div className="newpst-input">
                              <form>
                                <textarea
                                  rows={2}
                                  placeholder="share something .."
                                  onChange={(e) =>
                                    setNewDescription(e.target.value)
                                  }
                                  value={newDescription}
                                ></textarea>

                                <div className="attachments">
                                  <ul>
                                    <li>
                                      <i className="fa fa-image" />
                                      <label className="fileContainer">
                                        <input
                                          type="file"
                                          onChange={(e) => {
                                            setFiles(e.target.files[0]);
                                          }}
                                          id="file"
                                        />
                                      </label>
                                    </li>
                                    <li>
                                      <i className="fa fa-video-camera" />
                                      <label className="fileContainer">
                                        <input type="file" />
                                      </label>
                                    </li>

                                    <li>
                                      <button
                                        onClick={handleSubmit}
                                        type="submit"
                                      >
                                        Share
                                      </button>
                                    </li>
                                    <br />
                                    {files && (
                                      <div className="center">
                                        <img
                                          style={{ position: "center" }}
                                          alt=""
                                          src={URL.createObjectURL(files)}
                                        />
                                      </div>
                                    )}
                                  </ul>
                                </div>
                              </form>
                              <br />
                            </div>
                          </div>
                        </div>
                        {/* add post new box */}
                        {loading ? (
                          <div className="loadMore">
                            {postData
                              .sort(
                                (a, b) =>
                                  new Date(b.Date_creation) -
                                  new Date(a.Date_creation)
                              )
                              .map((p) => (
                                <Post
                                  key={p._id}
                                  post={p}
                                  socket={socket}
                                  currentUser={currentUser}
                                  friends={friends}
                                  handleDeletePost={handleDeletePost}
                                />
                              ))}
                          </div>
                        ) : (
                          <Loading />
                        )}
                      </div>
                      {/* centerl meta */}
                      <div className="col-lg-3">
                        <aside className="sidebar static right">
                          <div className="widget">
                            <h4 className="widget-title">Your page</h4>
                            <div className="your-page">
                              <figure>
                                <a href="#" title>
                                  <img
                                    src="images/resources/friend-avatar9.jpg"
                                    alt
                                  />
                                </a>
                              </figure>
                              <div className="page-meta">
                                <a href="#" title className="underline">
                                  My page
                                </a>
                                <span>
                                  <i className="ti-comment" />
                                  <a href="insight.html">
                                    Messages <em>9</em>
                                  </a>
                                </span>
                                <span>
                                  <i className="ti-bell" />
                                  <a href="insight.html">
                                    Notifications <em>2</em>
                                  </a>
                                </span>
                              </div>
                              <div className="page-likes">
                                <ul className="nav nav-tabs likes-btn">
                                  <li className="nav-item">
                                    <a
                                      className="active"
                                      href="#link1"
                                      data-toggle="tab"
                                    >
                                      likes
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className
                                      href="#link2"
                                      data-toggle="tab"
                                    >
                                      views
                                    </a>
                                  </li>
                                </ul>
                                {/* Tab panes */}
                                <div className="tab-content">
                                  <div
                                    className="tab-pane active fade show "
                                    id="link1"
                                  >
                                    <span>
                                      <i className="ti-heart" />
                                      884
                                    </span>
                                    <a href="#" title="weekly-likes">
                                      35 new likes this week
                                    </a>
                                    <div className="users-thumb-list">
                                      <a
                                        href="#"
                                        title="Anderw"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-1.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="frank"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-2.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Sara"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-3.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Amy"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-4.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Ema"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-5.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Sophie"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-6.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Maria"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-7.jpg"
                                          alt
                                        />
                                      </a>
                                    </div>
                                  </div>
                                  <div className="tab-pane fade" id="link2">
                                    <span>
                                      <i className="ti-eye" />
                                      440
                                    </span>
                                    <a href="#" title="weekly-likes">
                                      440 new views this week
                                    </a>
                                    <div className="users-thumb-list">
                                      <a
                                        href="#"
                                        title="Anderw"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-1.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="frank"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-2.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Sara"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-3.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Amy"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-4.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Ema"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-5.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Sophie"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-6.jpg"
                                          alt
                                        />
                                      </a>
                                      <a
                                        href="#"
                                        title="Maria"
                                        data-toggle="tooltip"
                                      >
                                        <img
                                          src="images/resources/userlist-7.jpg"
                                          alt
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Ads */}
                          <Ads />
                          <div className="widget stick-widget ">
                            <h4 className="widget-title">Profile intro</h4>
                            <ul className="short-profile">
                              <li>
                                <span>about</span>
                                <p>
                                  Hi, i am jhon kates, i am 32 years old and
                                  worked as a web developer in microsoft{" "}
                                </p>
                              </li>
                              <li>
                                <span>fav tv show</span>
                                <p>
                                  Sacred Games, Spartcus Blood, Games of Theron{" "}
                                </p>
                              </li>
                              <li>
                                <span>favourit music</span>
                                <p>Justin Biber, Shakira, Nati Natasah</p>
                              </li>
                            </ul>
                          </div>
                        </aside>
                      </div>
                      {/* sidebar */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="bottombar">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <span className="copyright">
                    <a target="_blank" href="https://www.templateshub.net">
                      Templates Hub
                    </a>
                  </span>
                  <i>
                    <img src="images/credit-cards.png" alt />
                  </i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-panel">
          <h4 className="panel-title">General Setting</h4>
          <form method="post">
            <div className="setting-row">
              <span>use night mode</span>
              <input type="checkbox" id="nightmode1" />
              <label
                htmlFor="nightmode1"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Notifications</span>
              <input type="checkbox" id="switch22" />
              <label
                htmlFor="switch22"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Notification sound</span>
              <input type="checkbox" id="switch33" />
              <label
                htmlFor="switch33"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>My profile</span>
              <input type="checkbox" id="switch44" />
              <label
                htmlFor="switch44"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Show profile</span>
              <input type="checkbox" id="switch55" />
              <label
                htmlFor="switch55"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
          </form>
          <h4 className="panel-title">Account Setting</h4>
          <form method="post">
            <div className="setting-row">
              <span>Sub users</span>
              <input type="checkbox" id="switch66" />
              <label
                htmlFor="switch66"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>personal account</span>
              <input type="checkbox" id="switch77" />
              <label
                htmlFor="switch77"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Business account</span>
              <input type="checkbox" id="switch88" />
              <label
                htmlFor="switch88"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Show me online</span>
              <input type="checkbox" id="switch99" />
              <label
                htmlFor="switch99"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Delete history</span>
              <input type="checkbox" id="switch101" />
              <label
                htmlFor="switch101"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
            <div className="setting-row">
              <span>Expose author name</span>
              <input type="checkbox" id="switch111" />
              <label
                htmlFor="switch111"
                data-on-label="ON"
                data-off-label="OFF"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Accueil;