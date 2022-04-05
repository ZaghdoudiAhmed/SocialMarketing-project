import React, {useCallback, useContext, useEffect, useState} from "react"
import {UserContext} from "../Context/UserContext";
import { Modal, Button } from 'react-bootstrap';
import axios from "axios";

function Test() {
        const [userContext, setUserContext] = useContext(UserContext)
        const [currentUser, setCurrentUser] = useState('')
        const currentUserId = localStorage.getItem('currentUser')
        const [show, setShow] = useState(false);
        const [showpropic, setShowProPic] = useState(false);
        const [show1, setShow1] = useState(false);
        const [show2, setShow2] = useState(false);
        const [btnClass, setBtnClass] = useState('reg-button');

        const [verif, setVerify]=useState('')



        //user infos
        const [profilePic, setProfilePic]= useState()
        const [file, setFile] = useState(
            'data:image/png;base64,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'
        )

        const handleClose = () => setShow2(false);
        const handleShow = () => setShow(true);


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
                        }else {
                            setShowProPic(true)
                        }
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
                                id : data.user._id
                            })
                        })
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

    }
    function testBtn(e){
        e.preventDefault()
        setBtnClass(btnClass+' active')
    }
  /*  async  function handleSubmit(e){
        e.preventDefault();
        try{
            let imageUrl='';
            if(profilePic){
                const formData = new FormData();
                formData.append('file', profilePic)
                //formData.append('_id', '62262c5a81ea9c7812c02b72')
                formData.append('upload_preset','presetName')
                const dataRes= await axios.post(
                    "http://localhost:3000/api/users/update",
                    formData
                )
                imageUrl=dataRes.data.url;
                console.log(imageUrl)
            }
        }catch (e) {

        }
    }*/
        return ((currentUserId === null)||!currentUserId) ? (
            "Error Loading User details"
        ) : (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        In order to access our web site you need to verify your Email first. <br/>
                        Please check your email and type the verification code you received.
                        <br/>
                        <input type={"text"} name={'verif'} onChange={(e)=>{setVerify(e.target.value)}}/>
                        <input type={'button'} value={'verify me'} onClick={verification} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>{
                            setShow(false)
                            setShowProPic(true)
                        }}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showpropic} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered style={{'textAlign': 'center'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{'text-align': 'center'}}>User registration</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className={'col-xs-12 col-md-8 offset-xs-3 offset-md-2'}>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid dolorem, eius eum ex expedita natus perferendis quia, quibusdam quis rerum tempore totam ullam.
                            </p>
                            <form method={'POST'} action={'http://localhost:3000/api/users/update'} encType="multipart/form-data">
                            <input type="file" accept={".png , .jpg, .jpeg"} name={'image'}
                                   onChange={(e)=>{

                                       setFile(URL.createObjectURL(e.target.files[0]))
                                   }} />
                            <br/>
                            <input type={'text'} value={currentUser.email} name={'email'} readOnly/>
                            <br/>
                            <h1>Preview</h1>
                            <img className={'previewImage'} src={file} alt={'preview'}/>
                            <br/>

                            <input type={'submit'}  value={"submit"}/>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={()=>{
                                setShowProPic(false)
                                setShow2(true)
                            }}>
                                next
                            </Button>
                        </Modal.Footer>
                </Modal>
                <Modal show={show2} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal 3!
                        <div className="container">
                            <button className={btnClass} id="btn" onClick={testBtn}>
                                <p id="btnText">Submit</p>
                                <div className="check-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                                        <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={()=>{
                            setShow2(false)
                            setShowProPic(true)
                        }}>
                            previous
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
               <p>
                   {currentUser.email}
               </p>
            </>
        )
}
    export default Test;
