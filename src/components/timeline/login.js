import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../../Context/UserContext";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function Login(props) {
    const navigate = useNavigate()

    const [showRegisterCb,setShowRegister] = useState(false)
    const [showLoginCb,setShowLogin] = useState(true)
    const[classForLogin, setClassForLogin]= useState("")
    const[logoClass, setLogoClass]= useState("")

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[loginemail, setLoginEmail] = useState('')
    const[resetEmail, setResetEmail] = useState('')
    const[loginpassword, setLoginPassword] = useState('')
    const[gender, setGender] = useState('')
    const[password, setPassword] = useState('')
    const[errors,setErrors]= useState('')

    const[isSubmitting, setIsSubmitting]=useState(false)
    const [userContext, setUserContext]= useContext(UserContext)

    const [reset, setReset]= useState(false)
    const [sent, setSent]= useState(false)
    const [resetCode, setResetCode] = useState('')
    const[resetPwd, setResetPwd]=useState(false)
    const[pwd,setpwd]=useState('')
    const[confPwd,setConfPwd]=useState('')

    async function registerUser(event){
        event.preventDefault()
        if(gender ==='' || password ==='' || name==='' || email ===''){
            setErrors("Please fill all fields!")
        }else {
            const response = await fetch('http://localhost:3000/api/users/register',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                        gender
                    })
                })
            const data = await response.json()
            if (data.message) {
                setErrors(data.message)
            }
            if (data.success === true) {
                setClassForLogin("slide-out")
                setLogoClass('spin-me-back')
            }
        }
    }

    async function loginUser(event){
        event.preventDefault()
        console.log('password = ' +loginemail + 'email : '+loginpassword)
        fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: loginemail,
                password: loginpassword
            })
        })

                .then(async response=>{
                    setIsSubmitting(false)
                    if(!response.ok) {
                        if (response.status === 400) {
                            setErrors('Please fill all the fields correctly!')
                        } else if (response.status === 401) {
                            setErrors('Invalid email and password combination.')
                        } else {
                            setErrors('Something went wrong! please try again later!')
                        }
                    }
                    else{
                        const data = await response.json()
                        localStorage.setItem("currentUser" , data.id);
                        setUserContext(oldValues=>{
                            return {...oldValues, token : data.token}
                        })
                        navigate('/test')
                       /* if(data.role==='admin'){
                            navigate('/test')
                        } else {
                            navigate('/home')
                        }*/
                    }
                })

    }

    async function handleReset(e){
       // e.preventDefault()
        var code           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < 10; i++ ) {
            code += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        await fetch("http://localhost:3000/api/users/ResetMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                code : code,
                mail : resetEmail
            })
        })
        setSent(true)
    }
    async function handleResetPwd(){
        const response = await fetch("http://localhost:3000/api/users/ResetPwd", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                mail : resetEmail,
                code : resetCode
            })
        })
        const data = await response.json()
        if (data.success){
            setResetPwd(true)
            setSent(false)
        } else {
            setResetPwd(false)
        }
    }
    async function handleResetPassword(){
        const response = await fetch("http://localhost:3000/api/users/Resetpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                mail : resetEmail,
                pwd : pwd
            })
        })
        const data = await response.json()
        if (data.success){
            NotificationManager.success('your password has been modified successfully.', 'Password modified');
            setReset(false)
        } else {
            console.log('fail')
        }
    }

    return (
        <>
            <NotificationContainer/>
            <div className="theme-layout">
                <div className="row" style={{marginTop : 24+"rem"}}>
                    {showLoginCb ?
                        reset===true ? (
                            <div className="col-md-6">
                                <div className="log-reg-area login_form">
                                    <h2 className="log-title">Reset pwd</h2>
                                    <form method="post">
                                        <div className="form-group">
                                            <input type="text" id="input" required="required" value={resetEmail} onChange={(e)=>{setResetEmail(e.target.value)}}/>
                                            <label className="control-label" htmlFor="input">Email</label><i className="mtrl-select"/>
                                        </div>
                                        {sent && !resetPwd ?(
                                            <div className="form-group">
                                                <input type="text" required="required" value={resetCode} onChange={(e) => {setResetCode(e.target.value)}}/>
                                                <label className="control-label" htmlFor="input">Reset code</label><i  className="mtrl-select"/>
                                            </div>
                                        ):null}
                                        {resetPwd ? (
                                            <>
                                        <div className="form-group">
                                            <input type="password" required="required" value={pwd} onChange={(e) => {setpwd(e.target.value)}}/>
                                            <label className="control-label" htmlFor="input">New Password</label><i  className="mtrl-select"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" required="required" value={confPwd} onChange={(e) => {setConfPwd(e.target.value)}}/>
                                            <label className="control-label" htmlFor="input">Confirm Password</label><i  className="mtrl-select"/>
                                        </div>
                                                {pwd.length>7 && pwd===confPwd ?
                                                    (<button onClick={() => {handleResetPassword() }} className="mtr-btn signin" type="button"><span>Reset password</span></button>)
                                                :null}
                                            </>
                                        ):null}
                                        {!sent ?
                                            (<button onClick={() => {handleReset() }} className="mtr-btn signin" type="button"><span>Reset</span></button>)
                                            :!resetPwd ?
                                             (<button onClick={() => {handleResetPwd()}} className="mtr-btn signin" type="button"><span>Verify</span></button>)
                                            :null
                                        }
                                        <a href="#" title="" className="forgot-pwd" onClick={(e)=>{setReset(false)}}>Login</a>
                                        <div className="submit-btns">
                                            <button onClick={loginUser} className="mtr-btn signin" type="button"><span>Login</span></button>
                                            <button onClick={()=>{
                                                setClassForLogin("slide-in")
                                                console.log("clicked")
                                                setLogoClass('spin-me')
                                            }} className="mtr-btn" type="button"><span>Register</span>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            ):(
                    <div className="col-md-6">
                        <div className="log-reg-area login_form">
                            <h2 className="log-title">Login</h2>
                            <p>
                                Don’t use Winku Yet? <a href="#" title="">Take the tour</a> or <a href="#" title="">Join
                                now</a>
                            </p>
                            <form method="post">
                                <div className="form-group">
                                    <input type="text" id="input" required="required" value={loginemail} onChange={(e)=>{setLoginEmail(e.target.value)}}/>
                                    <label className="control-label" htmlFor="input">Email</label><i className="mtrl-select"></i>
                                </div>
                                <div className="form-group">
                                    <input type="password" required="required" value={loginpassword} onChange={(e) => {setLoginPassword(e.target.value)}}/>
                                    <label className="control-label" htmlFor="input">Password</label><i  className="mtrl-select"></i>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" defaultChecked={true}/><i className="check-box"></i>Always
                                        Remember Me.
                                    </label>
                                </div>
                                <a href="#" title="" className="forgot-pwd" onClick={(e)=>{setReset(true)}}>Forgot Password?</a>
                                <div className="submit-btns">
                                    <button onClick={loginUser} className="mtr-btn signin" type="button"><span>Login</span></button>
                                    <button onClick={()=>{
                                        setClassForLogin("slide-in")
                                        console.log("clicked")

                                        setLogoClass('spin-me')
                                    }} className="mtr-btn" type="button"><span>Register</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>)
                    : null}
                    <div className="col-md-6">
                        <div className="log-reg-area register_form fading">
                            <h2 className="log-title">Register</h2>
                            { errors ? <div className="alert alert-danger" role="alert" >
                                {errors}
                            </div> : null }

                            <p>
                                Don’t use 2nd Chance Yet? <a href="#" title="">Take the tour</a> or <a href="#" title="">Join
                                now</a>
                            </p>
                            <form method="post">
                                <div className="form-group">
                                    <input type="text" required="required" value={name} onChange={(e)=>setName(e.target.value)}/>
                                    <label className="control-label" htmlFor="input" >First & Last Name</label><i
                                    className="mtrl-select"></i>
                                </div>
                                <div className="form-group">
                                    <input type="text" required="required"/>
                                    <label className="control-label" htmlFor="input">User Name</label><i
                                    className="mtrl-select"></i>
                                </div>
                                <div className="form-group">
                                    <input type="password" required="required" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    <label className="control-label" htmlFor="input">Password</label><i
                                    className="mtrl-select"></i>
                                </div>
                                <div className="form-radio">
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="radio" defaultChecked={false} value={'Male'}  onChange={(e)=>setGender(e.target.value)}/><i
                                            className="check-box"></i>Male
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input type="radio" name="radio" value={'Female'} onChange={(e)=>setGender(e.target.value)}/><i className="check-box"></i>Female
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" required="required" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    <label className="control-label" htmlFor="input"><a
                                        href="https://wpkixx.com/cdn-cgi/l/email-protection" className="__cf_email__"
                                        data-cfemail="6c29010d05002c">[email&#160;protected]</a></label><i
                                    className="mtrl-select"></i>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" defaultChecked={false} required/><i className="check-box"></i>Accept
                                        Terms & Conditions ?
                                    </label>
                                </div>
                                <a onClick={()=>{
                                    setClassForLogin("slide-out")
                                    setLogoClass('spin-me-back')
                                }} href="#" title="" className="forgot-pwd" style={{marginTop:0.8+"rem"}}>Already have an account</a>
                                <div className="submit-btns">
                                    <button  className="mtr-btn" type="button" onClick={registerUser}><span>Register</span></button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className={"login-banner "+classForLogin}>
                    <div className="land-featurearea">
                        <div className="land-meta">
                            <h1>2nd Chance</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            </p>
                            <div className="second-chance-logo">
                                <span><img className={"snd-chance-logo "+logoClass} src="images/2nd-Chance-Icon-sm.png"
                                           alt="2nd chance logo" width="500px" height="250px" /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;