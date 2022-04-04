import React, {Fragment, useCallback, useContext, useEffect, useRef, useState} from "react"
import {UserContext} from "../Context/UserContext";
import { Modal, Button } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'font-awesome/css/font-awesome.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Select,{ AriaOnFocus } from "react-select";
import makeAnimated from 'react-select/animated';
import {Link, useNavigate} from "react-router-dom";

function Test() {
        const navigate = useNavigate()
        const [userContext, setUserContext] = useContext(UserContext)
        const [currentUser, setCurrentUser] = useState('')
        const currentUserId = localStorage.getItem('currentUser')
        const [show, setShow] = useState(false);
        const [showpropic, setShowProPic] = useState(false);
        const [show1, setShow1] = useState(false);
        const [show2, setShow2] = useState(false);
        const [show3, setShow3] = useState(false);
        const [btnClass, setBtnClass] = useState(null);

        const [verif, setVerify]=useState('')
        const [result, setResult]=useState(null)
        const[fblink,setFbLink]=useState('')
        const[lilink,setLiLink]=useState('')
        const inputEl = useRef(null);
        const[interests,setInterests]=useState()

    function handleChange (){
        /*setBtnClass(selectedOption)*/
            console.log(`Option selected:`, inputEl.current.getValue())
            setInterests(inputEl.current.getValue())
        console.log(interests)
    }
    const [value, setValue] = useState()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const onMenuOpen = () => setIsMenuOpen(true);
    const onMenuClose = () => setIsMenuOpen(false);
        //user infos
        const [profilePic, setProfilePic]= useState()
        const[cover, setCover]= useState('images/cover-preview.jpg')
        const [file, setFile] = useState(
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXBx9D///+9w83Y3OHDydLIzdXt7/HN0tn3+Pnq7O/S1t319vfh5Ojd4OX8/P3r7fDhTC8lAAAKfElEQVR4nN2d67LrJgyFOWB8wZf9/m9bO44TOzEgoYVNumY6/dHdhC/chJCE+pddU1t3w2hcY21VVWr+x9rGmXHo6nbK//Uq54dP9WBspWepMy3/obJmqLNy5iJsu7FZyM7ZDpwLaWO6NlNLchC2nas83RYA1ZXpcnQmmnCqjWXTvSmtqcENwhJOnVPJeBukch2yTUjCBU9E96Z0f7hmoQhrI+y8D0hlelDLMIQDf2WJQ1rMaAUQTiNodH4xqhGwuIoJe5cH7wnpxINVSJiXD8IoIuyb3HwARgFhm73/3owCky6ZcDJX8T0YzeWEw4V4q4ZLCXt7ZQeu0jZtOiYRXjpAd4xJQzWBsL4Fb1XCyYNPeNkKeqaEbuQS9tWNfIsq7mxkEo53duAqPWYknG5YQr+lLcse5xDeucQcxVlwGIQFjNBNnJFKJ7zEyqZKN3DCyd4N9SHyZCQS9ncDnYi4bdAI/0oaoZs0zSFHIhxKBJwRSccNCmGhgEREAmGxgLRdI05Y0Db4LQJilLBoQApijLDgIboqOhcjhMUDxhHDhF35gDNi+H4jSFj/AuCMGDxqhAj73wCcFXIYBwinu9vNUMAMDxCWdpoIyaYQNuhWPMJKVuEvHP3nRS8hdp+YoRozdHXdt31fd4NppCENn1/g3TN8hMhldAmv+D7MtbDIhvVLfAuqhxC4ymjnX8z/kO5lz2rjIUStMtrGjKoB5qH0rDbnhCBzW1eUcIquAn3buRF+SoiZhJp85TdgVp3zqXhKCLmb0I7ump4w87GiEjrEt0Xs4U9hbHxHI0Q41nTDjfWBOGTP3G8nhIhvSrmthdwsUwiN/Gu4F2BPIcyo75/2ixBwZKL5MfMg6i/j6YtQPh2YawwY8Wvf/ySUf0dyDy6SmxpfX/9JKP0CSfTSIsBOFSaULzP0i71zyWfJx098JGzl80Aa8yo/1eij1+ZIKB4jxBuvkOQGx9GyORDKd4ozs4krsY163DEOhHLXDAAQME4Pa8G+TeIuFOyEe4l3rEMn7gnFXRjw6bEkXk/3nbgjlHchKtNFfJTad+KOULyQoroQcATfrXhvwqmQWbhIPhPfe+KbcBR+KGYh3Zol1duwUTk+VC7xaVh/E2KXaKnE3r73EeNFKF6hTx1dyZK25r3sbYTyrQI5SBHDdBtSCvaJ2NxWsf39+sU3QvnZGpuHLd67XmvNk1DukMVt96vEm/42qJ6EcucB4ty0F6xFKyHgujDNReqX3AB5uhtWQvkgBS80wCathPIhEY7aSRDghs/tCMUf9un+kQvgFFNvQsDvBd4sENvFc1w9CAG3PkUSmhch4OpOh9ubIMAotRshYsiX2Ifr4rAQIm6YyyTsnoSIe/si19LHfrEQIkIvoOffRZDg1molhPxaBdo0ah1ZChXoIbkXPROkpMHyuytIaAL8iA9q1eIdU6goPfT5ENYqBdlaFf6MD2nUYogozEIDP1yAInjnpUbBsiexR2DAAXjR/Lsr1GeBJyKqdMMwE0IiERXYqgFNncWqUbi0CuSOCCvwY2dCWCkP5DCFNar6p3BR+cDVFJgLMSlg+pY0HOotXL6O7hXw54KdL4C/uq5VB/swXCciU646hSxLBpqJ0MTOQUFztTHLKTItUI8Kc0rZPg+xJ2Lz441CmTSrAIYNzJxZ5RQ4kVI+TsGpq41C58JKz/rQWTPLwgmFLil4iQOr4BXmRFsGvgJABkKJaZOhAkCVgTAdMUc1qkxVENMGaqZqVFkYk5abPHVUsoxSleQgzlT2NReh0pZn3bS5ik5W8P3wLY6Nmq/SD37Hf4te2rjOWDXUou3Sg2iVxvNWdm/AZ4sP6XjF+DpzXWKHPR+eSNvBf2cz4WpG+GSwZ/xTad0MZz3ZDxeURJ3P+NeUj9eqGV9PdC2PeI1Npmc/PjVcRLjoUVxoeZfM+4hXDnVIf2mJ0jXS512idA+8tyhTE/DuqUhVyPvDImWBd8BlygHv8cvUCIzFKFL6DxdPU6Ye8TSgmKgypYFxbWVqjWu76eWfS2SA8aVF6hlf+j9eap4xwv9ju+0Z542wanQOyZu1xerLJuJ8qm2cM3g511QyR8Ar3yJ9Imrthj7nq9pTP7j0znzlzKRORNRrrzF1qQ65R4mA9Nw13aCTSPxKcxrvctcSjG9t4Q9oB5Xi+F/r5STmkCbWfpSIP9DWjMHEPOBrO3AV+1G0fR4wc7+oci6ffk28FfGQy807QaHTY+hiHYOeaa0JNRXuA+T14qGmAmeYwnMpOWrpgB91MeirKby0AE+MS4iN7Plv8lqMzsLjinrf+VWfhnp9ga2VlCLiVPyqMURcpm4eo4uI4/SrThQx3gOXUpEuUmzFSa0v0pZYQBdSO/H157yaezduhTtRJtRZzT1KEQN0wnaaCBfzp3UTCXYNvDREmgh9cVr7krBhlDFICcPUU780ukjBc+5TFTVPPDVoo50IrwyRqpgV7a0jHOtEeHWPVMW6wlsLOvZ/FrLQRJeaQD3v2HJ6KUZI4WYGarJHfMP3W92bgtZ3sK5++GzyI4TBtxHC/f8jhB9/y3mj5CcIo2+UhOyFnyCMvjMT2jF+gZDwVlBgsfkFQsJ7T4HF5hcIv/+W8+5a+YTEd9e8lk35hMS387wfUDwh+f1Dn6+ndELGG5aesgaFE3LeIfXt+2U4onzF3FhvyXo+44a77TN57th47wF7pmIRnpr2fIwy33T2meAaXVyer/OUdv/w4r6tru++ufDEKyS8re49ZdwUpvCUx80W8OQGCL35Qjdez/iyJQO/esi75DtIQSoJJckT/BV0cwb9Z757rJvWm97zRHn4zi/sIfT6NKobnMO+xkSGVMQH6kW8fKROvvDEWEtiXl5vIjT/5W2R/nzRwtGfOurH9ud6X3hR439dPm5Ixj31AcTmovCozhvuTbCUCXcRARfqJaZ46w8QpqwGlNuWEGKVffsPlEQgLXek+6TQjWTmcO9QVAJtIaDdmAVDWGgVTJLUefb4VbThQ7wTDFbh0pkYw3yKOHaot55TOP4hw1gdwnyWuh3T73UjKQ+6Qb2Vu2gaw/lAjGMq4+Y6VudFV4FKNCzVsQQSzi7FuZuPh8zpRm7n9CaezsXZoljRB1M8cUUrIxmt/Tz7Yt+hyVPwIWZ8BaEi0dxC1yUN19qEF5fn5zPtKG4ESU0KQtbajn8syn4gFh1iG1H8GBlqbS6tKzfUBMy+Gy01xzDBu5AQBfRHa8yG2ZhhKxB11KNclLOKkUGZYgUnxTlx08geSb22ccaM47jkvzbWVvxU3zSPe1okV5+W1bkSJSaE0osUIgiBT2yQleoYSo/Gu7TYhOBKSBBv2GaueLjjk5xdRBGVeatWvvhk5xZhzGjURr6bT0w492PWsRqvDpqfcJ6PJlMZRK0NwHeAiWzuyGYXgw9UsQEVu0051XHwlEG5RYDR6V0D6sjl+IVrFjT+fuocx44+pcPi/QMTLqpN+pycTyIG7kPPkUPRDi7uizihc10Ot2uuLJG2Gxvq6Wj+u2bMQrcoax5MWw/OPuoG+8hUZd18QM7ZiAsyfZaz/DCux96qWmol2+U0PA7d+dkfrP8AELeBvwZOOcwAAAAASUVORK5CYII='
        )
        const[birthday,setBirthday]=useState('')
        const[phone,setPhone]=useState('')
        const[address,setAddress]=useState('')
        const[bio,setBio]=useState('')

        const handleClose = () => setShow1(false);


    const options = [
        { value: 'Exercising', label: 'Exercising '+<i className="bi bi-heart-pulse"/> },
        { value: 'Cooking', label: 'Cooking' },
        { value: 'Reading', label: 'Reading' },
        { value: 'Coding', label: 'Coding' },
        { value: 'Gaming', label: 'Gaming' }
    ]
        useEffect(() => {
                fetch("http://localhost:3000/api/users/me", {
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
                        if (data.user.firstTime.toString()==='true'){
                            if(data.user.verified.toString()==='false'){
                                        setShow(true)
                                    var code           = '';
                                    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                                    var charactersLength = characters.length;
                                    for ( var i = 0; i < 8; i++ ) {
                                        code += characters.charAt(Math.floor(Math.random() *
                                            charactersLength));
                                    }
                                    await fetch("http://localhost:3000/api/users/mail", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body:JSON.stringify({
                                            code : code,
                                            id : data.user._id,
                                            mail : data.user.email
                                        })
                                    })
                            }
                        else {
                            setShowProPic(true)
                        }
                    } else {
                            if (response.status === 401) {
                                window.location.reload()
                            } else {
                                setUserContext(oldValues => {
                                    return {...oldValues, details: null}
                                })
                            }
                        }
                }
                })
            },[])
        async function verification (e){
        e.preventDefault()
            const response = await fetch ('http://localhost:3000/api/users/verifyEmail',
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: currentUser._id,
                    verif
                })
            })
            const data = await response.json()
        if (data.success){
            setResult(true)
        } else {
            setResult(false)
        }

    }

        async function updateAccount(){
            const response = await fetch ('http://localhost:3000/api/users/updateAccount',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: currentUser._id,
                        bio,
                        phone,
                        birthday,
                        address,
                        interests,
                        fblink,
                        lilink
                    })
                })
            const data = await response.json()
        }
        return ((currentUserId === null)||!currentUserId) ? (
            "Error Loading User details"
        ) : (
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
                        {(result===true) ?(
                            <div className="alert alert-success" role="alert">
                                account Verified. <i className="bi bi-check-circle"/>
                            </div>
                        ):(result===false) ? (
                            <div className="alert alert-danger" role="alert">
                                Wrong or expired code, please check the code or refresh the page to receive a new one <i className="bi bi-x-circle"/>
                            </div>
                        ): null
                        }
                        In order to access our web site you need to verify your Email first. <br/>
                        Please check your email and type the verification code you received.

                        <div className="form-group">
                            <input type="text" required name={'verif'} onChange={(e)=>{setVerify(e.target.value)}}/>
                            <label className="control-label" htmlFor="input" >verification code</label><i className="mtrl-select"/>
                            <button  className="mtr-btn" type="button" onClick={verification}><span>Register</span></button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {(result === true) ? (
                            <Button variant="primary" onClick={() => {
                                setShow(false)
                                setShowProPic(true)
                            }}>
                                Next
                            </Button>
                        ):null
                        }
                    </Modal.Footer>
                </Modal>
                {/*profile pic modal*/}
                <Modal show={showpropic} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{'textAlign': 'center'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{'textAlign': 'center'}}>User registration</Modal.Title>
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
                                <form method={'POST'} action={'http://localhost:3000/api/users/updateprofilepic'} encType="multipart/form-data" target="hidden-form">
                                    <label>pp picker</label>
                                    <input  type="file" accept={".png , .jpg, .jpeg"} name={'image'}
                                           onChange={(e)=>{
                                               setFile(URL.createObjectURL(e.target.files[0]))
                                           }} />
                                    <br/>
                                    <input type={'text'} value={currentUser.email} name={'email'} readOnly/>
                                    <input type={'submit'}  value={"submit"} onClick={()=>{
                                        setShowProPic(false)
                                        setShow1(true)
                                    }}/>
                                </form>
                                <iframe style={{display: 'none'}} name="hidden-form"/>
                                <br/>
                                <h1>Preview</h1>
                            </div>
                            <div className={'preview'}>
                            <img className={'previewPCImage'} src={"images/cover-preview.jpg"} alt={'profile cover preview'}/>
                            <img className={'previewPPImage'} src={file} alt={'profile picture preview'}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={()=>{
                                setShowProPic(false)
                                setShow1(true)
                            }}>
                                next
                            </Button>
                        </Modal.Footer>
                </Modal>
                {/*cover pic modal*/}
                <Modal show={show1} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{'textAlign': 'center'}}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Cover picture
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
                            <form method={'POST'} action={'http://localhost:3000/api/users/updatecoverpic'} encType="multipart/form-data" target="hidden-form">
                                <label className={'mr-3'}>please pick you first cover picture</label>
                                <input  type="file" accept={".png , .jpg, .jpeg"} name={'image'}
                                        onChange={(e)=>{
                                            setCover(URL.createObjectURL(e.target.files[0]))
                                        }} />
                                <br/>
                                <input type={'text'} value={currentUser.email} name={'email'} hidden readOnly/>
                                <input type={'submit'}  value={"submit"}/>
                            </form >
                            <iframe style={{display: 'none'}} name="hidden-form"/>
                            <br/>
                            <h1>Preview</h1>
                        </div>
                        <div className={'preview'}>
                            <img className={'previewPCImage'} src={cover} alt={'profile cover preview'}/>
                            <img className={'previewPPImage'} src={file} alt={'profile picture preview'}/>
                        </div>
                        <br/>

                        <input type={'submit'}  value={"submit"}/>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            setShow1(false)
                            setShowProPic(true)
                        }}>
                            previous
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            setShow1(false)
                            setShow2(true)
                        }}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*personal info modal*/}
                <Modal show={show2} onHide={handleClose}  size="lg" aria-labelledby="contained-modal-title-vcenter" >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Personal Information
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{maxHeight : 70+'vh',overflowY: 'auto'}}>
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
                                        <div className="step-name" style={{textAlign:'center'}}>Personal Information</div>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae blanditiis dolorem laborum magni, modi molestiae odio similique vel voluptatum.
                                A, architecto culpa impedit itaque nihil nostrum optio provident sit.
                            </p>
                            <div className='offset-md-1'>
                                <form>
                                        <div className={'row my-1'}>
                                            <label htmlFor="birthday" className="col-sm-2 col-form-label">Birthday</label>
                                            <div className="col-sm-8">
                                                <input type="date" className="form-control" id="inputEmail3" placeholder="birthday" value={birthday} onChange={(e)=>{setBirthday(e.target.value)}}/>
                                            </div>
                                        </div>
                                        <div className={'row my-1'}>
                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-8">
                                                <PhoneInput
                                                    className="form-control"
                                                    placeholder="Enter your phone number"
                                                    value={phone}
                                                    onChange={setPhone}
                                                defaultCountry={"TN"}/>
                                            </div>
                                        </div>
                                        <div className={'row my-1'}>
                                            <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                                            <div className="col-sm-8">
                                                <input type="text" className="form-control" id="inputEmail3" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                                            </div>
                                        </div>
                                        <div className={'row my-1'}>
                                            <label htmlFor="bio" className="col-sm-2 col-form-label">Bio</label>
                                            <div className="col-sm-8">
                                                <textarea className="form-control" name="bio" rows="5" placeholder="bio" value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
                                            </div>
                                        </div>
                                    <div className={'row my-1'}>
                                        <label htmlFor="exampleFormControlSelect2" className="col-sm-2 col-form-label">Intrests</label>
                                        <div className="col-sm-8">
                                            <Select ref={inputEl} options={options} isMulti={true}/>
                                        </div>
                                    </div>
                                    <div className={'row my-1'}>
                                        <label htmlFor="address" className="col-sm-2 col-form-label">Facebook</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="inputEmail3" placeholder="Facebook account" value={fblink} onChange={(e)=>{setFbLink(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className={'row my-1'}>
                                        <label htmlFor="address" className="col-sm-2 col-form-label">LinkedIn</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control" id="inputEmail3" placeholder="linkedin Account" value={lilink} onChange={(e)=>{setLiLink(e.target.value)}}/>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            setShow1(false)
                            setShowProPic(true)
                        }}>
                            previous
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            handleChange()
                            setShow2(false)
                            setShow3(true)
                        }}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
                {/*become premium modal*/}
                <Modal show={show3} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Become Premium
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
                                        <div className="step-name" style={{textAlign:'center'}}>Personal Information</div>
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae blanditiis dolorem laborum magni, modi molestiae odio similique vel voluptatum.
                                A, architecto culpa impedit itaque nihil nostrum optio provident sit.
                            </p>
                            <div className='offset-md-4'>
                               <button className={'btn-lg btn-success'}>Become premium</button>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            setShow3(false)
                            setShow2(true)
                        }}>
                            previous
                        </Button>
                        <Button variant="primary" onClick={()=>{
                            updateAccount()
                            setShow3(false)
                        }}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

                <>
                    <div>
                        <div className="theme-layout">
                            <div className="responsive-header">
                                <div className="mh-head first Sticky">
            <span className="mh-btns-left">
              <a className href="#menu">
                <i className="fa fa-align-justify" />
              </a>
            </span>
                                    <span className="mh-text">
              <a href="newsfeed.html" title>
                <img src="images/logo2.png" alt />
              </a>
            </span>
                                    <span className="mh-btns-right">
              <a className="fa fa-sliders" href="#shoppingbag" />
            </span>
                                </div>
                                <div className="mh-head second">
                                    <form className="mh-form">
                                        <input placeholder="search" />
                                        <a href="#/" className="fa fa-search" />
                                    </form>
                                </div>
                                <nav id="shoppingbag">
                                    <div>
                                        <div className>
                                            <form method="post">
                                                <div className="setting-row">
                                                    <span>use night mode</span>
                                                    <input type="checkbox" id="nightmode" />
                                                    <label
                                                        htmlFor="nightmode"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Notifications</span>
                                                    <input type="checkbox" id="switch2" />
                                                    <label
                                                        htmlFor="switch2"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Notification sound</span>
                                                    <input type="checkbox" id="switch3" />
                                                    <label
                                                        htmlFor="switch3"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>My profile</span>
                                                    <input type="checkbox" id="switch4" />
                                                    <label
                                                        htmlFor="switch4"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Show profile</span>
                                                    <input type="checkbox" id="switch5" />
                                                    <label
                                                        htmlFor="switch5"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                            </form>
                                            <h4 className="panel-title">Account Setting</h4>
                                            <form method="post">
                                                <div className="setting-row">
                                                    <span>Sub users</span>
                                                    <input type="checkbox" id="switch6" />
                                                    <label
                                                        htmlFor="switch6"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>personal account</span>
                                                    <input type="checkbox" id="switch7" />
                                                    <label
                                                        htmlFor="switch7"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Business account</span>
                                                    <input type="checkbox" id="switch8" />
                                                    <label
                                                        htmlFor="switch8"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Show me online</span>
                                                    <input type="checkbox" id="switch9" />
                                                    <label
                                                        htmlFor="switch9"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Delete history</span>
                                                    <input type="checkbox" id="switch10" />
                                                    <label
                                                        htmlFor="switch10"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                                <div className="setting-row">
                                                    <span>Expose author name</span>
                                                    <input type="checkbox" id="switch11" />
                                                    <label
                                                        htmlFor="switch11"
                                                        data-on-label="ON"
                                                        data-off-label="OFF"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <div className="topbar stick">
                                <div className="logo">
                                    <Link to="/" title>
                                        <img src="images/logo.png" alt />
                                    </Link>
                                </div>
                                <div className="top-area">
                                    <ul className="main-menu">
                                        <li>
                                            <a href="#" title>
                                                Home
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="index-2.html" title>
                                                        Home Social
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index2.html" title>
                                                        Home Social 2
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="index-company.html" title>
                                                        Home Company
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="landing.html" title>
                                                        Login page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="logout.html" title>
                                                        Logout Page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="newsfeed.html" title>
                                                        news feed
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" title>
                                                timeline
                                            </a>
                                            <ul>
                                                <li>
                                                    <Link to="/timeline" title>
                                                        timeline
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/timelinefriends" title>
                                                        timeline friends
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/timelinegroups" title>
                                                        timeline groups
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/tim" title>
                                                        timeline pages
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/timelinephotos" title>
                                                        timeline photos
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="/timelinevideos" title>
                                                        timeline videos
                                                    </Link>
                                                </li>
                                                <li>
                                                    <a href="fav-page.html" title>
                                                        favourit page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="groups.html" title>
                                                        groups page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="page-likers.html" title>
                                                        Likes page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="people-nearby.html" title>
                                                        people nearby
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" title>
                                                account settings
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="create-fav-page.html" title>
                                                        create fav page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="edit-account-setting.html" title>
                                                        edit account setting
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="edit-interest.html" title>
                                                        edit-interest
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="edit-password.html" title>
                                                        edit-password
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="edit-profile-basic.html" title>
                                                        edit profile basics
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="edit-work-eductation.html" title>
                                                        edit work educations
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="messages.html" title>
                                                        message box
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="inbox.html" title>
                                                        Inbox
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="notifications.html" title>
                                                        notifications page
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" title>
                                                more pages
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="404.html" title>
                                                        404 error page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="about.html" title>
                                                        about
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="contact.html" title>
                                                        contact
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="faq.html" title>
                                                        faq's page
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="insights.html" title>
                                                        insights
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="knowledge-base.html" title>
                                                        knowledge base
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="widgets.html" title>
                                                        Widgts
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="setting-area">
                                        <li>
                                            <a href="#" title="Home" data-ripple>
                                                <i className="ti-search" />
                                            </a>
                                            <div className="searched">
                                                <form method="post" className="form-search">
                                                    <input type="text" placeholder="Search Friend" />
                                                    <button data-ripple>
                                                        <i className="ti-search" />
                                                    </button>
                                                </form>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="newsfeed.html" title="Home" data-ripple>
                                                <i className="ti-home" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Notification" data-ripple>
                                                <i className="ti-bell" />
                                                <span>20</span>
                                            </a>
                                            <div className="dropdowns">
                                                <span>4 New Notifications</span>
                                                <ul className="drops-menu">
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-1.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>sarah Loren</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag green">New</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-2.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Jhon doe</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag red">Reply</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-3.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Andrew</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag blue">Unseen</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-4.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Tom cruse</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag">New</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-5.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Amy</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag">New</span>
                                                    </li>
                                                </ul>
                                                <a href="notifications.html" title className="more-mesg">
                                                    view more
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#" title="Messages" data-ripple>
                                                <i className="ti-comment" />
                                                <span>12</span>
                                            </a>
                                            <div className="dropdowns">
                                                <span>5 New Messages</span>
                                                <ul className="drops-menu">
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-1.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>sarah Loren</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag green">New</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-2.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Jhon doe</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag red">Reply</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-3.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Andrew</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag blue">Unseen</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-4.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Tom cruse</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag">New</span>
                                                    </li>
                                                    <li>
                                                        <a href="notifications.html" title>
                                                            <img src="images/resources/thumb-5.jpg" alt />
                                                            <div className="mesg-meta">
                                                                <h6>Amy</h6>
                                                                <span>Hi, how r u dear ...?</span>
                                                                <i>2 min ago</i>
                                                            </div>
                                                        </a>
                                                        <span className="tag">New</span>
                                                    </li>
                                                </ul>
                                                <a href="messages.html" title className="more-mesg">
                                                    view more
                                                </a>
                                            </div>
                                        </li>
                                        <li>
                                            <a href="#" title="Languages" data-ripple>
                                                <i className="fa fa-globe" />
                                            </a>
                                            <div className="dropdowns languages">
                                                <a href="#" title>
                                                    <i className="ti-check" />
                                                    English
                                                </a>
                                                <a href="#" title>
                                                    Arabic
                                                </a>
                                                <a href="#" title>
                                                    Dutch
                                                </a>
                                                <a href="#" title>
                                                    French
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="user-img">
                                        <img src="images/resources/admin.jpg" alt />
                                        <span className="status f-online" />
                                        <div className="user-setting">
                                            <a href="#" title>
                                                <span className="status f-online" />
                                                online
                                            </a>
                                            <a href="#" title>
                                                <span className="status f-away" />
                                                away
                                            </a>
                                            <a href="#" title>
                                                <span className="status f-off" />
                                                offline
                                            </a>
                                            <a href="#" title>
                                                <i className="ti-user" /> view profile
                                            </a>
                                            <Link to="/login" replace >
                                                <i className="ti-pencil-alt" />
                                                edit profile
                                            </Link>
                                            <a href="#" title>
                                                <i className="ti-target" />
                                                activity log
                                            </a>
                                            <a href="#" title>
                                                <i className="ti-settings" />
                                                account setting
                                            </a>
                                            <a href="#" title>
                                                <i className="ti-power-off" />
                                                log out
                                            </a>
                                        </div>
                                    </div>
                                    <span className="ti-menu main-menu" data-ripple />
                                </div>
                            </div>

                            <div className="fixed-sidebar right">
                                <div className="chat-friendz">
                                    <ul className="chat-users">
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend1.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend2.jpg" alt />
                                                <span className="status f-away" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend3.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend4.jpg" alt />
                                                <span className="status f-offline" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend5.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend6.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend7.jpg" alt />
                                                <span className="status f-offline" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend8.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend9.jpg" alt />
                                                <span className="status f-away" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend10.jpg" alt />
                                                <span className="status f-away" />
                                            </div>
                                        </li>
                                        <li>
                                            <div className="author-thmb">
                                                <img src="images/resources/side-friend8.jpg" alt />
                                                <span className="status f-online" />
                                            </div>
                                        </li>
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
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                        Hi James! Please remember to buy the food for tomorrow!
                        I’m gonna be handling the gifts and Jake’s gonna get the
                        drinks
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
                            <div className="fixed-sidebar left">
                                <div className="menu-left">
                                    <ul className="left-menu">
                                        <li>
                                            <a
                                                href="newsfeed.html"
                                                title="Newsfeed Page"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-magnet" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="fav-page.html"
                                                title="favourit page"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="fa fa-star-o" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="insights.html"
                                                title="Account Stats"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-stats-up" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="inbox.html"
                                                title="inbox"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-import" />
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                to="/messages"
                                                title="Messages"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-comment-alt" />
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                                href="edit-account-setting.html"
                                                title="Setting"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-panel" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="faq.html"
                                                title="Faq's"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-light-bulb" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="timeline-friends.html"
                                                title="Friends"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-themify-favicon" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="widgets.html"
                                                title="Widgets"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-eraser" />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="notifications.html"
                                                title="Notification"
                                                data-toggle="tooltip"
                                                data-placement="right"
                                            >
                                                <i className="ti-bookmark-alt" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* left sidebar menu */}
                            <section>
                                <div className="gap2 gray-bg">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="row merged20" id="page-contents">
                                                    <div className="col-lg-3">
                                                        <aside className="sidebar static left">
                                                            <div className="widget">
                                                                <h4 className="widget-title">Shortcuts</h4>
                                                                <ul className="naves">
                                                                    <li>
                                                                        <i className="ti-clipboard" />
                                                                        <a href="newsfeed.html" title>
                                                                            News feed
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-mouse-alt" />
                                                                        <a href="inbox.html" title>
                                                                            Inbox
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-files" />
                                                                        <a href="fav-page.html" title>
                                                                            My pages
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-user" />
                                                                        <Link to="/timelinefriends" title>
                                                                            friends
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-image" />
                                                                        <a href="timeline-photos.html" title>
                                                                            images
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-video-camera" />
                                                                        <a href="timeline-videos.html" title>
                                                                            videos
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-comments-smiley" />
                                                                        <a href="messages.html" title>
                                                                            Messages
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-bell" />
                                                                        <a href="notifications.html" title>
                                                                            Notifications
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-share" />
                                                                        <a href="people-nearby.html" title>
                                                                            People Nearby
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-bar-chart-o" />
                                                                        <a href="insights.html" title>
                                                                            insights
                                                                        </a>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-direction" />
                                                                        <Link to="/company">Company</Link>
                                                                    </li>
                                                                    <li>
                                                                        <i className="ti-power-off" />
                                                                        <a href="landing.html" title>
                                                                            Logout
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* Shortcuts */}
                                                            <div className="widget">
                                                                <h4 className="widget-title">Recent Activity</h4>
                                                                <ul className="activitiez">
                                                                    <li>
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
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* recent activites */}
                                                            <div className="widget stick-widget">
                                                                <h4 className="widget-title">Who's follownig</h4>
                                                                <ul className="followers">
                                                                    <li>
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar2.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-meta">
                                                                            <h4>
                                                                                <a href="time-line.html" title>
                                                                                    Kelly Bill
                                                                                </a>
                                                                            </h4>
                                                                            <a href="#" title className="underline">
                                                                                Add Friend
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar4.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-meta">
                                                                            <h4>
                                                                                <a href="time-line.html" title>
                                                                                    Issabel
                                                                                </a>
                                                                            </h4>
                                                                            <a href="#" title className="underline">
                                                                                Add Friend
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar6.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-meta">
                                                                            <h4>
                                                                                <a href="time-line.html" title>
                                                                                    Andrew
                                                                                </a>
                                                                            </h4>
                                                                            <a href="#" title className="underline">
                                                                                Add Friend
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar8.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-meta">
                                                                            <h4>
                                                                                <a href="time-line.html" title>
                                                                                    Sophia
                                                                                </a>
                                                                            </h4>
                                                                            <a href="#" title className="underline">
                                                                                Add Friend
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                    <li>
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar3.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-meta">
                                                                            <h4>
                                                                                <a href="time-line.html" title>
                                                                                    Allen
                                                                                </a>
                                                                            </h4>
                                                                            <a href="#" title className="underline">
                                                                                Add Friend
                                                                            </a>
                                                                        </div>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            {/* who's following */}
                                                        </aside>
                                                    </div>
                                                    {/* sidebar */}
                                                    <div className="col-lg-6">
                                                        <div className="central-meta">
                                                            <div className="new-postbox">
                                                                <figure>
                                                                    <img src="images/resources/admin2.jpg" alt />
                                                                </figure>
                                                                <div className="newpst-input">
                                                                    <form method="post">
                              <textarea
                                  rows={2}
                                  placeholder="write something"
                                  defaultValue={""}
                              />
                                                                        <div className="attachments">
                                                                            <ul>
                                                                                <li>
                                                                                    <i className="fa fa-music" />
                                                                                    <label className="fileContainer">
                                                                                        <input type="file" />
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-image" />
                                                                                    <label className="fileContainer">
                                                                                        <input type="file" />
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-video-camera" />
                                                                                    <label className="fileContainer">
                                                                                        <input type="file" />
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <i className="fa fa-camera" />
                                                                                    <label className="fileContainer">
                                                                                        <input type="file" />
                                                                                    </label>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="submit">Post</button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* add post new box */}
                                                        <div className="loadMore">
                                                            <div className="central-meta item">
                                                                <div className="user-post">
                                                                    <div className="friend-info">
                                                                        <figure>
                                                                            <img
                                                                                src="images/resources/friend-avatar10.jpg"
                                                                                alt
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-name">
                                                                            <ins>
                                                                                <a href="time-line.html" title>
                                                                                    Janice Griffith
                                                                                </a>
                                                                            </ins>
                                                                            <span>published: june,2 2018 19:PM</span>
                                                                        </div>
                                                                        <div className="post-meta">
                                                                            <img src="images/resources/user-post.jpg" alt />
                                                                            <div className="we-video-info">
                                                                                <ul>
                                                                                    <li>
                                      <span
                                          className="views"
                                          data-toggle="tooltip"
                                          title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="comment"
                                          data-toggle="tooltip"
                                          title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="like"
                                          data-toggle="tooltip"
                                          title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="dislike"
                                          data-toggle="tooltip"
                                          title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li className="social-media">
                                                                                        <div className="menu">
                                                                                            <div className="btn trigger">
                                                                                                <i className="fa fa-share-alt" />
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-html5" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-facebook" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-google-plus" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-twitter" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-css3" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-instagram" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-dribbble" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-pinterest" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="description">
                                                                                <p>
                                                                                    World's most beautiful car in Curabitur{" "}
                                                                                    <a href="#" title>
                                                                                        #test drive booking !
                                                                                    </a>{" "}
                                                                                    the most beatuiful car available in america
                                                                                    and the saudia arabia, you can book your
                                                                                    test drive by our official website
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="coment-area">
                                                                        <ul className="we-comet">
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-1.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Jason borne
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 year ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this car is very awesome for the
                                                                                        youngster. please vote this car and like
                                                                                        our post
                                                                                    </p>
                                                                                </div>
                                                                                <ul>
                                                                                    <li>
                                                                                        <div className="comet-avatar">
                                                                                            <img
                                                                                                src="images/resources/comet-2.jpg"
                                                                                                alt
                                                                                            />
                                                                                        </div>
                                                                                        <div className="we-comment">
                                                                                            <div className="coment-head">
                                                                                                <h5>
                                                                                                    <a href="time-line.html" title>
                                                                                                        alexendra dadrio
                                                                                                    </a>
                                                                                                </h5>
                                                                                                <span>1 month ago</span>
                                                                                                <a
                                                                                                    className="we-reply"
                                                                                                    href="#"
                                                                                                    title="Reply"
                                                                                                >
                                                                                                    <i className="fa fa-reply" />
                                                                                                </a>
                                                                                            </div>
                                                                                            <p>
                                                                                                yes, really very awesome car i see the
                                                                                                features of this car in the official
                                                                                                website of{" "}
                                                                                                <a href="#" title>
                                                                                                    #Mercedes-Benz
                                                                                                </a>{" "}
                                                                                                and really impressed :-)
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div className="comet-avatar">
                                                                                            <img
                                                                                                src="images/resources/comet-3.jpg"
                                                                                                alt
                                                                                            />
                                                                                        </div>
                                                                                        <div className="we-comment">
                                                                                            <div className="coment-head">
                                                                                                <h5>
                                                                                                    <a href="time-line.html" title>
                                                                                                        Olivia
                                                                                                    </a>
                                                                                                </h5>
                                                                                                <span>16 days ago</span>
                                                                                                <a
                                                                                                    className="we-reply"
                                                                                                    href="#"
                                                                                                    title="Reply"
                                                                                                >
                                                                                                    <i className="fa fa-reply" />
                                                                                                </a>
                                                                                            </div>
                                                                                            <p>
                                                                                                i like lexus cars, lexus cars are most
                                                                                                beautiful with the awesome features,
                                                                                                but this car is really outstanding
                                                                                                than lexus
                                                                                            </p>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </li>
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-1.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Donald Trump
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 week ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this video is very awesome for the
                                                                                        youngster. please vote this video and like
                                                                                        our channel
                                                                                        <i className="em em-smiley" />
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    href="#"
                                                                                    title
                                                                                    className="showmore underline"
                                                                                >
                                                                                    more comments
                                                                                </a>
                                                                            </li>
                                                                            <li className="post-comment">
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-1.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="post-comt-box">
                                                                                    <form method="post">
                                      <textarea
                                          placeholder="Post your comment"
                                          defaultValue={""}
                                      />
                                                                                        <div className="add-smiles">
                                        <span
                                            className="em em-expressionless"
                                            title="add icon"
                                        />
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
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="central-meta item">
                                                                <div className="user-post">
                                                                    <div className="friend-info">
                                                                        <figure>
                                                                            <img src="images/resources/nearly1.jpg" alt />
                                                                        </figure>
                                                                        <div className="friend-name">
                                                                            <ins>
                                                                                <a href="time-line.html" title>
                                                                                    Sara Grey
                                                                                </a>
                                                                            </ins>
                                                                            <span>published: june,2 2018 19:PM</span>
                                                                        </div>
                                                                        <div className="post-meta">
                                                                            <iframe
                                                                                width
                                                                                height={315}
                                                                                src="https://www.youtube.com/embed/5JJ_jqqpTMY"
                                                                                allow="autoplay;"
                                                                                allowFullScreen
                                                                            />
                                                                            <div className="we-video-info">
                                                                                <ul>
                                                                                    <li>
                                      <span
                                          className="views"
                                          data-toggle="tooltip"
                                          title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="comment"
                                          data-toggle="tooltip"
                                          title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="like"
                                          data-toggle="tooltip"
                                          title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="dislike"
                                          data-toggle="tooltip"
                                          title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li className="social-media">
                                                                                        <div className="menu">
                                                                                            <div className="btn trigger">
                                                                                                <i className="fa fa-share-alt" />
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-html5" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-facebook" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-google-plus" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-twitter" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-css3" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-instagram" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-dribbble" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-pinterest" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="description">
                                                                                <p>
                                                                                    Lonely Cat Enjoying in Summer Curabitur{" "}
                                                                                    <a href="#" title>
                                                                                        #mypage
                                                                                    </a>{" "}
                                                                                    ullamcorper ultricies nisi. Nam eget dui.
                                                                                    Etiam rhoncus. Maecenas tempus, tellus eget
                                                                                    condimentum rhoncus, sem quam semper libero,
                                                                                    sit amet adipiscing sem neque sed ipsum. Nam
                                                                                    quam nunc,
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="coment-area">
                                                                        <ul className="we-comet">
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-1.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Jason borne
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 year ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this video is very awesome for the
                                                                                        youngster. please vote this video and like
                                                                                        our channel
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-2.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Sophia
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 week ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this video is very awesome for the
                                                                                        youngster.
                                                                                        <i className="em em-smiley" />
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    href="#"
                                                                                    title
                                                                                    className="showmore underline"
                                                                                >
                                                                                    more comments
                                                                                </a>
                                                                            </li>
                                                                            <li className="post-comment">
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-2.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="post-comt-box">
                                                                                    <form method="post">
                                      <textarea
                                          placeholder="Post your comment"
                                          defaultValue={""}
                                      />
                                                                                        <div className="add-smiles">
                                        <span
                                            className="em em-expressionless"
                                            title="add icon"
                                        />
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
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="central-meta item">
                                                                <div className="user-post">
                                                                    <div className="friend-info">
                                                                        <figure>
                                                                            <img src="images/resources/nearly6.jpg" alt />
                                                                        </figure>
                                                                        <div className="friend-name">
                                                                            <ins>
                                                                                <a href="time-line.html" title>
                                                                                    Sophia
                                                                                </a>
                                                                            </ins>
                                                                            <span>published: january,5 2018 19:PM</span>
                                                                        </div>
                                                                        <div className="post-meta">
                                                                            <div className="post-map">
                                                                                <div className="nearby-map">
                                                                                    <div id="map-canvas" />
                                                                                </div>
                                                                            </div>
                                                                            {/* near by map */}
                                                                            <div className="we-video-info">
                                                                                <ul>
                                                                                    <li>
                                      <span
                                          className="views"
                                          data-toggle="tooltip"
                                          title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="comment"
                                          data-toggle="tooltip"
                                          title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="like"
                                          data-toggle="tooltip"
                                          title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="dislike"
                                          data-toggle="tooltip"
                                          title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li className="social-media">
                                                                                        <div className="menu">
                                                                                            <div className="btn trigger">
                                                                                                <i className="fa fa-share-alt" />
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-html5" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-facebook" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-google-plus" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-twitter" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-css3" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-instagram" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-dribbble" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-pinterest" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div className="description">
                                                                                <p>
                                                                                    Curabitur Lonely Cat Enjoying in Summer{" "}
                                                                                    <a href="#" title>
                                                                                        #mypage
                                                                                    </a>{" "}
                                                                                    ullamcorper ultricies nisi. Nam eget dui.
                                                                                    Etiam rhoncus. Maecenas tempus, tellus eget
                                                                                    condimentum rhoncus, sem quam semper libero,
                                                                                    sit amet adipiscing sem neque sed ipsum. Nam
                                                                                    quam nunc,
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="coment-area">
                                                                        <ul className="we-comet">
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-1.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Jason borne
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 year ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this video is very awesome for the
                                                                                        youngster. please vote this video and like
                                                                                        our channel
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-2.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="we-comment">
                                                                                    <div className="coment-head">
                                                                                        <h5>
                                                                                            <a href="time-line.html" title>
                                                                                                Sophia
                                                                                            </a>
                                                                                        </h5>
                                                                                        <span>1 week ago</span>
                                                                                        <a
                                                                                            className="we-reply"
                                                                                            href="#"
                                                                                            title="Reply"
                                                                                        >
                                                                                            <i className="fa fa-reply" />
                                                                                        </a>
                                                                                    </div>
                                                                                    <p>
                                                                                        we are working for the dance and sing
                                                                                        songs. this video is very awesome for the
                                                                                        youngster.
                                                                                        <i className="em em-smiley" />
                                                                                    </p>
                                                                                </div>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    href="#"
                                                                                    title
                                                                                    className="showmore underline"
                                                                                >
                                                                                    more comments
                                                                                </a>
                                                                            </li>
                                                                            <li className="post-comment">
                                                                                <div className="comet-avatar">
                                                                                    <img
                                                                                        src="images/resources/comet-2.jpg"
                                                                                        alt
                                                                                    />
                                                                                </div>
                                                                                <div className="post-comt-box">
                                                                                    <form method="post">
                                      <textarea
                                          placeholder="Post your comment"
                                          defaultValue={""}
                                      />
                                                                                        <div className="add-smiles">
                                        <span
                                            className="em em-expressionless"
                                            title="add icon"
                                        />
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
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="central-meta item">
                                                                <div className="user-post">
                                                                    <div className="friend-info">
                                                                        <figure>
                                                                            <img
                                                                                alt
                                                                                src="images/resources/friend-avatar10.jpg"
                                                                            />
                                                                        </figure>
                                                                        <div className="friend-name">
                                                                            <ins>
                                                                                <a title href="time-line.html">
                                                                                    Janice Griffith
                                                                                </a>
                                                                            </ins>
                                                                            <span>published: june,2 2018 19:PM</span>
                                                                        </div>
                                                                        <div className="description">
                                                                            <p>
                                                                                Curabitur World's most beautiful car in{" "}
                                                                                <a title href="#">
                                                                                    #test drive booking !
                                                                                </a>{" "}
                                                                                the most beatuiful car available in america
                                                                                and the saudia arabia, you can book your test
                                                                                drive by our official website
                                                                            </p>
                                                                        </div>
                                                                        <div className="post-meta">
                                                                            <div className="linked-image align-left">
                                                                                <a title href="#">
                                                                                    <img alt src="images/resources/page1.jpg" />
                                                                                </a>
                                                                            </div>
                                                                            <div className="detail">
                                                                                <span>Love Maid - ChillGroves</span>
                                                                                <p>
                                                                                    Lorem ipsum dolor sit amet, consectetur
                                                                                    ipisicing elit, sed do eiusmod tempor
                                                                                    incididunt ut labore et dolore magna
                                                                                    aliqua...{" "}
                                                                                </p>
                                                                                <a title href="#">
                                                                                    www.sample.com
                                                                                </a>
                                                                            </div>
                                                                            <div className="we-video-info">
                                                                                <ul>
                                                                                    <li>
                                      <span
                                          className="views"
                                          data-toggle="tooltip"
                                          title="views"
                                      >
                                        <i className="fa fa-eye" />
                                        <ins>1.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="comment"
                                          data-toggle="tooltip"
                                          title="Comments"
                                      >
                                        <i className="fa fa-comments-o" />
                                        <ins>52</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="like"
                                          data-toggle="tooltip"
                                          title="like"
                                      >
                                        <i className="ti-heart" />
                                        <ins>2.2k</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li>
                                      <span
                                          className="dislike"
                                          data-toggle="tooltip"
                                          title="dislike"
                                      >
                                        <i className="ti-heart-broken" />
                                        <ins>200</ins>
                                      </span>
                                                                                    </li>
                                                                                    <li className="social-media">
                                                                                        <div className="menu">
                                                                                            <div className="btn trigger">
                                                                                                <i className="fa fa-share-alt" />
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-html5" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-facebook" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-google-plus" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-twitter" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-css3" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-instagram" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-dribbble" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="rotater">
                                                                                                <div className="btn btn-icon">
                                                                                                    <a href="#" title>
                                                                                                        <i className="fa fa-pinterest" />
                                                                                                    </a>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                <a href="insight.html" title>
                                  Messages <em>9</em>
                                </a>
                              </span>
                                                                        <span>
                                <i className="ti-bell" />
                                <a href="insight.html" title>
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
                                                                                <a className href="#link2" data-toggle="tab">
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
                                                            {/* page like widget */}
                                                            <div className="widget">
                                                                <div className="banner medium-opacity bluesh">
                                                                    <div
                                                                        className="bg-image"
                                                                        style={{
                                                                            backgroundImage:
                                                                                "url(images/resources/baner-widgetbg.jpg)",
                                                                        }}
                                                                    />
                                                                    <div className="baner-top">
                              <span>
                                <img alt src="images/book-icon.png" />
                              </span>
                                                                        <i className="fa fa-ellipsis-h" />
                                                                    </div>
                                                                    <div className="banermeta">
                                                                        <p>create your own favourit page.</p>
                                                                        <span>like them all</span>
                                                                        <a data-ripple title href="#">
                                                                            start now!
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="widget stick-widget">
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
                                    <label htmlFor="switch22" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>Notification sound</span>
                                    <input type="checkbox" id="switch33" />
                                    <label htmlFor="switch33" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>My profile</span>
                                    <input type="checkbox" id="switch44" />
                                    <label htmlFor="switch44" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>Show profile</span>
                                    <input type="checkbox" id="switch55" />
                                    <label htmlFor="switch55" data-on-label="ON" data-off-label="OFF" />
                                </div>
                            </form>
                            <h4 className="panel-title">Account Setting</h4>
                            <form method="post">
                                <div className="setting-row">
                                    <span>Sub users</span>
                                    <input type="checkbox" id="switch66" />
                                    <label htmlFor="switch66" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>personal account</span>
                                    <input type="checkbox" id="switch77" />
                                    <label htmlFor="switch77" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>Business account</span>
                                    <input type="checkbox" id="switch88" />
                                    <label htmlFor="switch88" data-on-label="ON" data-off-label="OFF" />
                                </div>
                                <div className="setting-row">
                                    <span>Show me online</span>
                                    <input type="checkbox" id="switch99" />
                                    <label htmlFor="switch99" data-on-label="ON" data-off-label="OFF" />
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
            </>
        )
}
    export default Test;
