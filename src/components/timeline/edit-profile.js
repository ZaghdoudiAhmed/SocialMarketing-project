import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Header from "../header";
import TimelineCover from "./timeline-cover";

function EditProfile(props) {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState('')
    const currentUserId = localStorage.getItem('currentUser')
    const [name, setName]= useState('')
    const [lastname, setLastName]= useState('')
    const [phone, setPhone]= useState('')
    const [address, setAddress]= useState('')
    const [bio, setBio]= useState('')
    const [birthday, setBirthday]= useState('')
    const [coverPath, setCoverPath] = useState('')
    const [propicPath, setProPicPath] = useState('')
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
                        setName(data.user.name)
                        setLastName(data.user.lastname)
                        setAddress(data.user.address)
                        setBio(data.user.bio)
                        setPhone(data.user.phone)
                        setBirthday(data.user.birthday)
                        setCoverPath('uploads/users/'+data.user.coverpic[data.user.coverpic.length - 1])
                        setProPicPath('uploads/users/'+data.user.profilepic[data.user.profilepic.length - 1])
                        if (response.status === 401) {
                            window.location.reload()
                        }
                    }
                }
            )}
    },[])
    async function updateAccount(event){
        event.preventDefault()
        const response = await fetch ('http://localhost:2600/api/users/updateAccount',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: currentUser._id,
                    name,
                    lastname,
                    bio,
                    phone,
                    birthday,
                    address
                })
            })
        const data = await response.json()
        if (data.success === true) {
            NotificationManager.success('Account Modified', 'Your informations has been modified successfully!');
        }

    }
    return (
        <>
            <NotificationContainer/>
            <body>
            <div className="theme-layout">
                <Header currentUserId={currentUserId}/>
                <TimelineCover/>

                <section>
                    <div className="gap gray-bg">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row" id="page-contents">
                                        <div className="col-lg-3">
                                            <aside className="sidebar static">
                                                <div className="widget">
                                                    <h4 className="widget-title">Recent Activity</h4>
                                                    <ul className="activitiez">
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>10 hours Ago</i>
                                                                <span><a title=""
                                                                         href="#">Commented on Video posted </a></span>
                                                                <h6>by <a href="time-line.html">black demon.</a></h6>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>30 Days Ago</i>
                                                                <span><a title="" href="#">Posted your status. “Hello guys, how are you?”</a></span>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="activity-meta">
                                                                <i>2 Years Ago</i>
                                                                <span><a title="" href="#">Share a video on her timeline.</a></span>
                                                                <h6>"<a href="#">you are so funny mr.been.</a>"</h6>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="widget stick-widget">
                                                    <h4 className="widget-title">Edit info</h4>
                                                    <ul className="naves">
                                                        <li>
                                                            <i className="ti-info-alt"></i>
                                                            <a href="edit-profile-basic.html" title="">Basic info</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-mouse-alt"></i>
                                                            <a href="edit-work-eductation.html" title="">Education &
                                                                Work</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-heart"></i>
                                                            <a href="edit-interest.html" title="">My interests</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-settings"></i>
                                                            <a href="edit-account-setting.html" title="">account
                                                                setting</a>
                                                        </li>
                                                        <li>
                                                            <i className="ti-lock"></i>
                                                            <a href="edit-password.html" title="">change password</a>
                                                        </li>
                                                    </ul>
                                                </div>

                                            </aside>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="central-meta">
                                                <div className="editing-info">
                                                    <h5 className="f-title"><i className="ti-info-alt"></i> Edit Basic
                                                        Information</h5>

                                                    <form>
                                                        <div className="form-group half">
                                                            <input type="text" id="input" required="required" value={name} onChange={(e)=> {
                                                                setName(e.target.value)
                                                            }}/>
                                                            <label className="control-label" htmlFor="input">First
                                                                Name</label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="form-group half">
                                                            <input type="text" required="required" value={lastname} onChange={(e)=> {
                                                                setLastName(e.target.value)
                                                            }}/>
                                                            <label className="control-label" htmlFor="input">Last
                                                                Name</label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" required="required" value={phone} onChange={(e)=> {
                                                                setPhone(e.target.value)
                                                            }}/>
                                                            <label className="control-label" htmlFor="input">Phone
                                                                No.</label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="date" required="required" value={birthday} onChange={(e)=> {
                                                                setBirthday(e.target.value)
                                                            }}/>
                                                            <label className="control-label" htmlFor="input">birthday
                                                                </label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="form-group">
                                                            <input type="text" required="required" value={address} onChange={(e)=> {
                                                                setAddress(e.target.value)
                                                            }}/>
                                                            <label className="control-label" htmlFor="input">Phone
                                                                No.</label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="form-radio">
                                                            <div className="radio">
                                                                <label>
                                                                    <input type="radio" checked="checked"
                                                                           name="radio"/><i className="check-box"/>Male
                                                                </label>
                                                            </div>
                                                            <div className="radio">
                                                                <label>
                                                                    <input type="radio" name="radio"/><i
                                                                        className="check-box"/>Female
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <textarea value={bio} onChange={(e)=>{setBio(e.target.value)}} rows="4" id="textarea"
                                                                      required="required"/>
                                                            <label className="control-label" htmlFor="textarea">About
                                                                Me</label><i className="mtrl-select"></i>
                                                        </div>
                                                        <div className="submit-btns">
                                                            <button type="button" className="mtr-btn">
                                                                <span>Cancel</span></button>
                                                            <button className="mtr-btn" onClick={updateAccount}>
                                                                <span >Update</span></button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-3">
                                            <aside className="sidebar static">
                                                <div className="widget">
                                                    <h4 className="widget-title">Your page</h4>
                                                    <div className="your-page">
                                                        <figure>
                                                            <a title="" href="#"><img alt=""
                                                                                      src="images/resources/friend-avatar9.jpg"/></a>
                                                        </figure>
                                                        <div className="page-meta">
                                                            <a className="underline" title="" href="#">My page</a>
                                                            <span><i
                                                                className="ti-comment"/>Messages <em>9</em></span>
                                                            <span><i
                                                                className="ti-bell"/>Notifications <em>2</em></span>
                                                        </div>
                                                        <div className="page-likes">
                                                            <ul className="nav nav-tabs likes-btn">
                                                                <li className="nav-item"><a data-toggle="tab"
                                                                                            href="#link1"
                                                                                            className="active">likes</a>
                                                                </li>
                                                                <li className="nav-item"><a data-toggle="tab"
                                                                                            href="#link2"
                                                                                            className="">views</a></li>
                                                            </ul>

                                                            <div className="tab-content">
                                                                <div id="link1" className="tab-pane active fade show">
                                                                    <span><i className="ti-heart"></i>884</span>
                                                                    <a title="weekly-likes" href="#">35 new likes this
                                                                        week</a>
                                                                    <div className="users-thumb-list">
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Anderw">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-1.jpg" />
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="frank">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-2.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Sara">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-3.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Amy">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-4.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Ema">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-5.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Sophie">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-6.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Maria">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-7.jpg"/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div id="link2" className="tab-pane fade">
                                                                    <span><i className="ti-eye"></i>445</span>
                                                                    <a title="weekly-likes" href="#">440 new views this
                                                                        week</a>
                                                                    <div className="users-thumb-list">
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Anderw">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-1.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="frank">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-2.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Sara">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-3.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Amy">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-4.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Ema">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-5.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Sophie">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-6.jpg"/>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title="" href="#"
                                                                           data-original-title="Maria">
                                                                            <img alt=""
                                                                                 src="images/resources/userlist-7.jpg"/>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                                <h4><a href="time-line.html" title="">Issabel</a></h4>
                                                                <a href="#" title="" className="underline">Add
                                                                    Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar6.jpg"
                                                                         alt=""/></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="time-line.html" title="">Andrew</a></h4>
                                                                <a href="#" title="" className="underline">Add
                                                                    Friend</a>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <figure><img src="images/resources/friend-avatar8.jpg"
                                                                         alt=""/></figure>
                                                            <div className="friend-meta">
                                                                <h4><a href="time-line.html" title="">Sophia</a></h4>
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
                        <label htmlFor="nightmode1" data-on-label="ON" data-off-label="OFF"/>
                    </div>
                    <div className="setting-row">
                        <span>Notifications</span>
                        <input type="checkbox" id="switch22"/>
                        <label htmlFor="switch22" data-on-label="ON" data-off-label="OFF"/>
                    </div>
                    <div className="setting-row">
                        <span>Notification sound</span>
                        <input type="checkbox" id="switch33"/>
                        <label htmlFor="switch33" data-on-label="ON" data-off-label="OFF"/>
                    </div>
                    <div className="setting-row">
                        <span>My profile</span>
                        <input type="checkbox" id="switch44"/>
                        <label htmlFor="switch44" data-on-label="ON" data-off-label="OFF"/>
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

            <script data-cfasync="false"
                    src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
            <script src="js/main.min.js"></script>
            <script src="js/script.js"></script>
            <script src="js/map-init.js"></script>
            <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8c55_YHLvDHGACkQscgbGLtLRdxBDCfI"></script>

            </body>
        </>
    );
}

export default EditProfile;