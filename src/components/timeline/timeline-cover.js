import React, {useEffect, useState} from 'react';
import {useNavigate, Link} from "react-router-dom";
function TimelineCover() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')
    const [coverPath, setCoverPath] = useState('')
    const [propicPath, setProPicPath] = useState('')
    const currentUserId = localStorage.getItem('currentUser')
    useEffect(() => {
        if(!currentUserId){
            navigate('/login')
        }else{
            fetch("http://localhost:2600/api/users/me", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    currentUserId
                })
            }).then(async response => {
                    if (response.ok) {
                        const data = await response.json()
                        setCurrentUser(data.user)
                        if (data.user.coverpic.length===0){
                            setCoverPath('uploads/users/cover-preview.jpg')
                        }else{
                            setCoverPath('uploads/users/'+data.user.coverpic[data.user.coverpic.length - 1])
                        }
                        if (data.user.profilepic.length===0){
                            setProPicPath('uploads/users/default-avatar.png')
                        }else{
                            setProPicPath('uploads/users/'+data.user.profilepic[data.user.profilepic.length - 1])
                        }
                        if (response.status === 401) {
                            window.location.reload()
                        }
                    }
                }
            )}
    },[])
    return (
        <>
            <section>
                <div className="feature-photo">
                    <figure><img src={coverPath} style={{height:400+'px'}} alt={"cover pic"} /></figure>
                    <div className="add-btn">
                        <span>1205 followers</span>
                        <a href="#" title="" data-ripple="">Add Friend</a>
                    </div>
                    <form
                method={"POST"}
                action={"http://localhost:2600/api/users/updatecoverpic/"+currentUserId}
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
                    setCoverPath(window.URL.createObjectURL(e.target.files[0]));
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
                    <div className="container-fluid">
                        <div className="row merged">
                            <div className="col-lg-2 col-sm-3">
                                <div className="user-avatar">
                                    <figure>
                                        <img src={propicPath} alt={"profile picture"} />
                                        <form    method={"POST"}
                action={"http://localhost:2600/api/users/updateprofilepic/"+currentUserId}
                encType="multipart/form-data"
                target="hidden-form"
                className="edit-phto">
                                            <i className="fa fa-camera-retro"/>
                                            <label className="fileContainer">
                                                Edit Display Photo  </label>
                                                <input      
                                                className="disp"
                  type="file"
                  accept={".png , .jpg, .jpeg"}
                  name={"image"}
                  onChange={(e) => {
                    setProPicPath(window.URL.createObjectURL(e.target.files[0]));
                  }}/>
                                          
                                            <input type={"submit"} value={"submit"} />
                                        </form>
                                    </figure>
                                </div>
                            </div>
                            <div className="col-lg-10 col-sm-9">
                                <div className="timeline-info">
                                    <ul>
                                        <li className="admin-name">
                                            <h5 style={{textTransform:'capitalize'}}>{currentUser.name+' '+currentUser.lastname}</h5>
                                        </li>
                                        <li>
                                            <a className="active" href="time-line.html" title="" data-ripple="">time
                                                line</a>
                                            <a className="" href="timeline-photos.html" title=""
                                               data-ripple="">Photos</a>
                                            <a className="" href="timeline-videos.html" title=""
                                               data-ripple="">Videos</a>
                                            <a className="" href="timeline-friends.html" title=""
                                               data-ripple="">Friends</a>
                                            <a className="" href="groups.html" title=""
                                               data-ripple="">Groups</a>
                                            <Link to={'/about'}>about</Link>
                                            <a className="" href="#" title="" data-ripple="">more</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TimelineCover;