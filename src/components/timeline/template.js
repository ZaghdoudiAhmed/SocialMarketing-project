import React, {useEffect, useMemo, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {NotificationContainer, NotificationManager} from "react-notifications";


function Template(props) {

    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')
    const [coverPath, setCoverPath] = useState('')
    const [propicPath, setProPicPath] = useState('')
    const currentUserId = localStorage.getItem('currentUser')
    const [listOfUsers, setListOfUsers] = useState([])
    const [listOfUsersPagin, setListOfUsersPagin] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setUsersPerPage] = useState(6)
    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = listOfUsers.slice(indexOfFirstUser, indexOfLastUser)
    const pageNumbers= []
    for(let i=1;i<=Math.ceil(listOfUsers.length/usersPerPage);i++){
        pageNumbers.push(i)
    }
    const paginate=(n)=>setCurrentPage(n)
        function makeAdmin(e,id) {
        e.preventDefault()
            fetch("http://localhost:3000/api/users/makeAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }).then(async response => {
                    if (response.ok){
                        NotificationManager.success('Password Modified', 'Your password has been modified successfully!');
                    }
                }
            )
        }
        function makeUser(e,id) {
        e.preventDefault()
            fetch("http://localhost:3000/api/users/makeUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }).then(async response => {
                    if (response.ok){
                        NotificationManager.success('Password Modified', 'Your password has been modified successfully!');
                    }
                }
            )
        }
        function blockAccount(e,id) {
        e.preventDefault()
            fetch("http://localhost:3000/api/users/blockAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }).then(async response => {
                    if (response.ok){
                        NotificationManager.success('Password Modified', 'Your password has been modified successfully!');
                    }
                }
            )
        }
        function unblockAccount(e,id) {
        e.preventDefault()
            fetch("http://localhost:3000/api/users/unblockAccount", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id
                })
            }).then(async response => {
                    if (response.ok){
                        NotificationManager.success('Password Modified', 'Your password has been modified successfully!');
                    }
                }
            )
        }


        useEffect(() => {
            if (!currentUserId) {
                navigate('/login')
            } else {
                fetch("http://localhost:3000/api/users/me", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        currentUserId
                    })
                }).then(async response => {
                        if (response.ok) {
                            const data = await response.json()
                            setCurrentUser(data.user)

                            setCoverPath('uploads/users/' + data.user.coverpic[data.user.coverpic.length - 1])
                            setProPicPath('uploads/users/' + data.user.profilepic[data.user.profilepic.length - 1])
                            if (response.status === 401) {
                                window.location.reload()
                            }
                        }
                    }
                )
                fetch("http://localhost:3000/api/users/getAllUsers", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(async response => {
                        const data = await response.json()
                        setListOfUsers(data.users)
                        console.log('************')
                        console.log(listOfUsers)
                    }
                )
            }
        }, [])
        return (
            <>
                <NotificationContainer/>
                <body>
                <div className="theme-layout">
                    <div className="topbar stick">
                        <div className="logo">
                            <a title="" href="newsfeed.html"><img src="images/logo.png" alt=""/></a>
                        </div>

                        <div className="top-area">
                            <ul className="main-menu">
                                <li>
                                    <a href="#" title="">Home</a>
                                    <ul>
                                        <li><a href="index-2.html" title="">Home Social</a></li>
                                        <li><a href="index2.html" title="">Home Social 2</a></li>
                                        <li><a href="index-company.html" title="">Home Company</a></li>
                                        <li><a href="landing.html" title="">Login page</a></li>
                                        <li><a href="logout.html" title="">Logout Page</a></li>
                                        <li><a href="newsfeed.html" title="">news feed</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" title="">timeline</a>
                                    <ul>
                                        <li><a href="time-line.html" title="">timeline</a></li>
                                        <li><a href="timeline-friends.html" title="">timeline friends</a></li>
                                        <li><a href="timeline-groups.html" title="">timeline groups</a></li>
                                        <li><a href="timeline-pages.html" title="">timeline pages</a></li>
                                        <li><a href="timeline-photos.html" title="">timeline photos</a></li>
                                        <li><a href="timeline-videos.html" title="">timeline videos</a></li>
                                        <li><a href="fav-page.html" title="">favourit page</a></li>
                                        <li><a href="groups.html" title="">groups page</a></li>
                                        <li><a href="page-likers.html" title="">Likes page</a></li>
                                        <li><a href="people-nearby.html" title="">people nearby</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" title="">account settings</a>
                                    <ul>
                                        <li><a href="create-fav-page.html" title="">create fav page</a></li>
                                        <li><a href="edit-account-setting.html" title="">edit account setting</a></li>
                                        <li><a href="edit-interest.html" title="">edit-interest</a></li>
                                        <li><a href="edit-password.html" title="">edit-password</a></li>
                                        <li><a href="edit-profile-basic.html" title="">edit profile basics</a></li>
                                        <li><a href="edit-work-eductation.html" title="">edit work educations</a></li>
                                        <li><a href="messages.html" title="">message box</a></li>
                                        <li><a href="inbox.html" title="">Inbox</a></li>
                                        <li><a href="notifications.html" title="">notifications page</a></li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" title="">more pages</a>
                                    <ul>
                                        <li><a href="404.html" title="">404 error page</a></li>
                                        <li><a href="about.html" title="">about</a></li>
                                        <li><a href="contact.html" title="">contact</a></li>
                                        <li><a href="faq.html" title="">faq's page</a></li>
                                        <li><a href="insights.html" title="">insights</a></li>
                                        <li><a href="knowledge-base.html" title="">knowledge base</a></li>
                                        <li><a href="widgets.html" title="">Widgts</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="setting-area">
                                <li>
                                    <a href="#" title="Home" data-ripple=""><i className="ti-search"></i></a>
                                    <div className="searched">
                                        <form method="post" className="form-search">
                                            <input type="text" placeholder="Search Friend"/>
                                            <button data-ripple><i className="ti-search"/></button>
                                        </form>
                                    </div>
                                </li>
                                <li><a href="newsfeed.html" title="Home" data-ripple=""><i className="ti-home"></i></a>
                                </li>
                                <li>
                                    <a href="#" title="Notification" data-ripple="">
                                        <i className="ti-bell"></i><span>20</span>
                                    </a>
                                    <div className="dropdowns">
                                        <span>4 New Notifications</span>
                                        <ul className="drops-menu">
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-1.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>sarah Loren</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag green">New</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-2.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Jhon doe</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag red">Reply</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-3.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Andrew</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag blue">Unseen</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-4.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Tom cruse</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag">New</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-5.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Amy</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag">New</span>
                                            </li>
                                        </ul>
                                        <a href="notifications.html" title="" className="more-mesg">view more</a>
                                    </div>
                                </li>
                                <li>
                                    <a href="#" title="Messages" data-ripple=""><i
                                        className="ti-comment"></i><span>12</span></a>
                                    <div className="dropdowns">
                                        <span>5 New Messages</span>
                                        <ul className="drops-menu">
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-1.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>sarah Loren</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag green">New</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-2.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Jhon doe</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag red">Reply</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-3.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Andrew</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag blue">Unseen</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-4.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Tom cruse</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag">New</span>
                                            </li>
                                            <li>
                                                <a href="notifications.html" title="">
                                                    <img src="images/resources/thumb-5.jpg" alt=""/>
                                                    <div className="mesg-meta">
                                                        <h6>Amy</h6>
                                                        <span>Hi, how r u dear ...?</span>
                                                        <i>2 min ago</i>
                                                    </div>
                                                </a>
                                                <span className="tag">New</span>
                                            </li>
                                        </ul>
                                        <a href="messages.html" title="" className="more-mesg">view more</a>
                                    </div>
                                </li>
                                <li><a href="#" title="Languages" data-ripple=""><i className="fa fa-globe"></i></a>
                                    <div className="dropdowns languages">
                                        <a href="#" title=""><i className="ti-check"></i>English</a>
                                        <a href="#" title="">Arabic</a>
                                        <a href="#" title="">Dutch</a>
                                        <a href="#" title="">French</a>
                                    </div>
                                </li>
                            </ul>
                            <div className="user-img">
                                <img src="images/resources/admin.jpg" alt=""/>
                                <span className="status f-online"></span>
                                <div className="user-setting">
                                    <a href="#" title=""><span className="status f-online"></span>online</a>
                                    <a href="#" title=""><span className="status f-away"></span>away</a>
                                    <a href="#" title=""><span className="status f-off"></span>offline</a>
                                    <a href="#" title=""><i className="ti-user"></i> view profile</a>
                                    <a href="#" title=""><i className="ti-pencil-alt"></i>edit profile</a>
                                    <a href="#" title=""><i className="ti-target"></i>activity log</a>
                                    <a href="#" title=""><i className="ti-settings"></i>account setting</a>
                                    <a href="#" title=""><i className="ti-power-off"></i>log out</a>
                                </div>
                            </div>
                            <span className="ti-menu main-menu" data-ripple=""></span>
                        </div>
                    </div>

                    <section>
                        <div className="feature-photo">
                            <figure><img src="images/resources/timeline-1.jpg" alt=""/></figure>
                            <div className="add-btn">
                                <span>1205 followers</span>
                                <a href="#" title="" data-ripple="">Add Friend</a>
                            </div>
                            <form className="edit-phto">
                                <i className="fa fa-camera-retro"></i>
                                <label className="fileContainer">
                                    Edit Cover Photo
                                    <input type="file"/>
                                </label>
                            </form>
                            <div className="container-fluid">
                                <div className="row merged">
                                    <div className="col-lg-2 col-sm-3">
                                        <div className="user-avatar">
                                            <figure>
                                                <img src="images/resources/user-avatar.jpg" alt=""/>
                                                <form className="edit-phto">
                                                    <i className="fa fa-camera-retro"></i>
                                                    <label className="fileContainer">
                                                        Edit Display Photo
                                                        <input type="file"/>
                                                    </label>
                                                </form>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-lg-10 col-sm-9">
                                        <div className="timeline-info">
                                            <ul>
                                                <li className="admin-name">
                                                    <h5>Janice Griffith</h5>
                                                    <span>Group Admin</span>
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
                                                    <a className="" href="about.html" title="" data-ripple="">about</a>
                                                    <a className="" href="#" title="" data-ripple="">more</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div className="gap gray-bg">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row" id="page-contents">
                                            <div className="col-lg-3">
                                                <aside className="sidebar static">
                                                    <div className="widget">
                                                        <h4 className="widget-title">Recent Photos</h4>
                                                        <ul className="recent-photos">
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-11.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-1.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-22.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-2.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-33.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-3.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-44.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-4.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-55.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-5.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-66.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-6.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-77.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-7.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-88.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-8.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                            <li>
                                                                <a className="strip"
                                                                   href="images/resources/recent-99.jpg"
                                                                   title="" data-strip-group="mygroup"
                                                                   data-strip-group-options="loop: false">
                                                                    <img src="images/resources/recent-9.jpg"
                                                                         alt=""/></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="widget stick-widget">
                                                        <h4 className="widget-title">Shortcuts</h4>
                                                        <ul className="naves">
                                                            <li>
                                                                <i className="ti-clipboard"></i>
                                                                <a title="" href="#">News feed</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-mouse-alt"></i>
                                                                <a title="" href="inbox.html">Inbox</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-files"></i>
                                                                <a title="" href="page.html">My pages</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-user"></i>
                                                                <a title="" href="friends-list.html">friends</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-image"></i>
                                                                <a title="" href="images.html">images</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-video-camera"></i>
                                                                <a title="" href="videos.html">videos</a>
                                                            </li>
                                                            <li>
                                                                <i className="ti-comments-smiley"></i>
                                                                <a title="" href="inbox.html">Messages</a>
                                                            </li>

                                                        </ul>
                                                    </div>
                                                </aside>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="central-meta">
                                                    <div className="editing-interest">
                                                        <h5 className="f-title"><i className="ti-user"></i>All Users
                                                        </h5>
                                                        <div className="notification-box">
                                                            <ul>
                                                                {currentUsers?.map((value, index) => {
                                                                    return (
                                                                        <>
                                                                            <li>
                                                                                <div className={'row'}>
                                                                                    <div className={'col-md-9'}>
                                                                                        {value.profilepic.length !== 0 ? (
                                                                                            <figure><img
                                                                                                src={"uploads/users/" + value.profilepic[value.profilepic.length - 1]}
                                                                                                alt=""/></figure>
                                                                                        ) : (
                                                                                            <figure><img
                                                                                                src={"uploads/users/default-avatar.png"}
                                                                                                alt=""/></figure>
                                                                                        )}
                                                                                        <div className="notifi-meta">
                                                                                            <p>
                                                                                                <b>{value.name + " " + value.lastName}&nbsp;&nbsp;</b>
                                                                                                {value.verified ? (
                                                                                                    <>
                                                                                                        <i style={{color: 'green'}}
                                                                                                           className="bi bi-patch-check-fill"/>&nbsp; Verified</>
                                                                                                ) : (
                                                                                                    <>
                                                                                                        <i style={{color: 'red'}}
                                                                                                           className="bi bi-patch-exclamation-fill"/>&nbsp;Not
                                                                                                        verified
                                                                                                    </>
                                                                                                )}
                                                                                            </p>
                                                                                            <span>Email : {value.email}</span><br/>
                                                                                            <span>{value.role}</span><br/>
                                                                                            <span>{value.status}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className={'col-md-3'}>
                                                                                        {value.role ==='user' ? (
                                                                                            <button onClick={(e) => {makeAdmin(e,value._id)}} className="exp-button  mt-2 exp-admin">
                                                                                            <span className="exp-icon"><i
                                                                                                className="bi bi-person-check-fill"/> </span>
                                                                                                <span className="exp-text">Make Admin</span>
                                                                                            </button>
                                                                                        ): (
                                                                                            <button onClick={(e) => {
                                                                                                makeUser(e,value._id)
                                                                                                value.role='user'
                                                                                            }} className="exp-button  mt-2" style={{backgroundColor:'#89CFF0'}}>
                                                                                            <span className="exp-icon"><i
                                                                                                className="bi bi-person-dash-fill"/> </span>
                                                                                                <span className="exp-text">Make User</span>
                                                                                            </button>
                                                                                        )}

                                                                                        <br/>
                                                                                        {value.status === 'active' ? (
                                                                                            <>
                                                                                                <button onClick={(e) => {blockAccount(e,value._id)}}
                                                                                                        className="exp-button my-1 exp-block">
                                                                                                    <span
                                                                                                        className="exp-icon"><i
                                                                                                        className="bi bi-dash-circle-fill"/> </span>
                                                                                                    <span
                                                                                                        className="exp-text">BLock Account.</span>
                                                                                                </button>
                                                                                                <br/>
                                                                                            </>
                                                                                        ) : (
                                                                                            <>
                                                                                                <button onClick={(e) => {unblockAccount(e,value._id)}}
                                                                                                    className="exp-button my-1 " style={{backgroundColor:'#15D508'}}>
                                                                                            <span className="exp-icon">
                                                                                                <i className="bi bi-check-circle-fill"/> </span>
                                                                                                    <span
                                                                                                        className="exp-text">UnBLock Account</span>
                                                                                                </button>
                                                                                                <br/>
                                                                                            </>
                                                                                        )}

                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        </>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <nav>
                                                    <ul className={'pagination offset-4'}>
                                                        {pageNumbers.map(n=>(
                                                            <li key={n} className={'page-item'}>
                                                                <a onClick={()=>paginate(n)} className={'page-link'}>
                                                                    {n}
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </nav>
                                            </div>

                                            <div className="col-lg-3">
                                                <aside className="sidebar static">
                                                    <div className="widget">
                                                        <div className="banner medium-opacity bluesh">
                                                            <div className="bg-image"
                                                                 style={{background: 'url(images/resources/baner-widgetbg.jpg)'}}></div>
                                                            <div className="baner-top">
                                                                <span><img alt="" src="images/book-icon.png"/></span>
                                                                <i className="fa fa-ellipsis-h"></i>
                                                            </div>
                                                            <div className="banermeta">
                                                                <p>
                                                                    create your own favourit page.
                                                                </p>
                                                                <span>like them all</span>
                                                                <a data-ripple="" title="" href="#">start now!</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="widget stick-widget">
                                                        <h4 className="widget-title">Who's follownig</h4>
                                                        <ul className="followers">
                                                            <li>
                                                                <figure><img src="images/resources/friend-avatar2.jpg"
                                                                             alt=""/></figure>
                                                                <div className="friend-meta">
                                                                    <h4><a href="time-line.html" title="">Kelly Bill</a>
                                                                    </h4>
                                                                    <a href="#" title="" className="underline">Add
                                                                        Friend</a>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <figure><img src="images/resources/friend-avatar4.jpg"
                                                                             alt=""/></figure>
                                                                <div className="friend-meta">
                                                                    <h4><a href="time-line.html" title="">Issabel</a>
                                                                    </h4>
                                                                    <a href="#" title="" className="underline">Add
                                                                        Friend</a>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <figure><img src="images/resources/friend-avatar6.jpg"
                                                                             alt=""/></figure>
                                                                <div className="friend-meta">
                                                                    <h4><a href="time-line.html" title="">Andrew</a>
                                                                    </h4>
                                                                    <a href="#" title="" className="underline">Add
                                                                        Friend</a>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <figure><img src="images/resources/friend-avatar8.jpg"
                                                                             alt=""/></figure>
                                                                <div className="friend-meta">
                                                                    <h4><a href="time-line.html" title="">Sophia</a>
                                                                    </h4>
                                                                    <a href="#" title="" className="underline">Add
                                                                        Friend</a>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <figure><img src="images/resources/friend-avatar3.jpg"
                                                                             alt=""/></figure>
                                                                <div className="friend-meta">
                                                                    <h4><a href="time-line.html" title="">Allen</a></h4>
                                                                    <a href="#" title="" className="underline">Add
                                                                        Friend</a>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </aside>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <footer>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-4">
                                    <div className="widget">
                                        <div className="foot-logo">
                                            <div className="logo">
                                                <a href="index-2.html" title=""><img src="images/logo.png" alt=""/></a>
                                            </div>
                                            <p>
                                                The trio took this simple idea and built it into the world’s leading
                                                carpooling platform.
                                            </p>
                                        </div>
                                        <ul className="location">
                                            <li>
                                                <i className="ti-map-alt"></i>
                                                <p>33 new montgomery st.750 san francisco, CA USA 94105.</p>
                                            </li>
                                            <li>
                                                <i className="ti-mobile"></i>
                                                <p>+1-56-346 345</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4">
                                    <div className="widget">
                                        <div className="widget-title"><h4>follow</h4></div>
                                        <ul className="list-style">
                                            <li><i className="fa fa-facebook-square"></i> <a
                                                href="https://web.facebook.com/shopcircut/" title="">facebook</a></li>
                                            <li><i className="fa fa-twitter-square"></i><a
                                                href="https://twitter.com/login?lang=en" title="">twitter</a></li>
                                            <li><i className="fa fa-instagram"></i><a
                                                href="https://www.instagram.com/?hl=en" title="">instagram</a></li>
                                            <li><i className="fa fa-google-plus-square"></i> <a
                                                href="https://plus.google.com/discover" title="">Google+</a></li>
                                            <li><i className="fa fa-pinterest-square"></i> <a
                                                href="https://www.pinterest.com/" title="">Pintrest</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4">
                                    <div className="widget">
                                        <div className="widget-title"><h4>Navigate</h4></div>
                                        <ul className="list-style">
                                            <li><a href="about.html" title="">about us</a></li>
                                            <li><a href="contact.html" title="">contact us</a></li>
                                            <li><a href="terms.html" title="">terms & Conditions</a></li>
                                            <li><a href="#" title="">RSS syndication</a></li>
                                            <li><a href="sitemap.html" title="">Sitemap</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4">
                                    <div className="widget">
                                        <div className="widget-title"><h4>useful links</h4></div>
                                        <ul className="list-style">
                                            <li><a href="#" title="">leasing</a></li>
                                            <li><a href="#" title="">submit route</a></li>
                                            <li><a href="#" title="">how does it work?</a></li>
                                            <li><a href="#" title="">agent listings</a></li>
                                            <li><a href="#" title="">view All</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4">
                                    <div className="widget">
                                        <div className="widget-title"><h4>download apps</h4></div>
                                        <ul className="colla-apps">
                                            <li><a href="https://play.google.com/store?hl=en" title=""><i
                                                className="fa fa-android"></i>android</a></li>
                                            <li><a href="https://www.apple.com/lae/ios/app-store/" title=""><i
                                                className="ti-apple"></i>iPhone</a></li>
                                            <li><a href="https://www.microsoft.com/store/apps" title=""><i
                                                className="fa fa-windows"></i>Windows</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer>
                    <div className="bottombar">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <span className="copyright"><a target="_blank" href="https://www.templateshub.net">Templates Hub</a></span>
                                    <i><img src="images/credit-cards.png" alt=""/></i>
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
                            <input type="checkbox" id="nightmode1"/>
                            <label htmlFor="nightmode1" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Notifications</span>
                            <input type="checkbox" id="switch22"/>
                            <label htmlFor="switch22" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Notification sound</span>
                            <input type="checkbox" id="switch33"/>
                            <label htmlFor="switch33" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>My profile</span>
                            <input type="checkbox" id="switch44"/>
                            <label htmlFor="switch44" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Show profile</span>
                            <input type="checkbox" id="switch55"/>
                            <label htmlFor="switch55" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                    </form>
                    <h4 className="panel-title">Account Setting</h4>
                    <form method="post">
                        <div className="setting-row">
                            <span>Sub users</span>
                            <input type="checkbox" id="switch66"/>
                            <label htmlFor="switch66" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>personal account</span>
                            <input type="checkbox" id="switch77"/>
                            <label htmlFor="switch77" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Business account</span>
                            <input type="checkbox" id="switch88"/>
                            <label htmlFor="switch88" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Show me online</span>
                            <input type="checkbox" id="switch99"/>
                            <label htmlFor="switch99" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Delete history</span>
                            <input type="checkbox" id="switch101"/>
                            <label htmlFor="switch101" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                        <div className="setting-row">
                            <span>Expose author name</span>
                            <input type="checkbox" id="switch111"/>
                            <label htmlFor="switch111" data-on-label="ON" data-off-label="OFF"></label>
                        </div>
                    </form>
                </div>

                <script src="js/main.min.js"></script>
                <script src="js/script.js"></script>

                </body>

            </>
        );
}
export default Template;