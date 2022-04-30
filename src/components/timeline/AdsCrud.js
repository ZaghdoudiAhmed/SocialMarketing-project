import React, {useEffect, useState} from 'react';
import Header from "../header";
import TimelineCover from "./timeline-cover";
import {Button, Modal} from "react-bootstrap";
import {Switch} from "@mui/material";
import {NotificationContainer, NotificationManager} from "react-notifications";
import Swal from 'sweetalert2'
import Tour from 'reactour'
function AdsCrud(props) {
    const [largeBox, setLargeBox]=useState(false)
    const [currentStep, setCurrentStep]=useState()
    const[tourStyle,setTourStyle]= useState('')
    useEffect(()=>{
        if(currentStep===2){
            setTourStyle('reactour_helper_large-centered')
        }
        if(currentStep===3){
            setTourStyle('reactour_helper_large')
        }
        if(currentStep===4){
            setTourStyle('')
        }
    },[currentStep])
    const steps = [
        {
            selector: '[data-tut="opps-area"]',
            content: 'It looks like you this is your first time posting an add! In order to make it easier for you, here is some help ',
        },
        {
            selector: '[data-tut="btn-test"]',
            content: 'So let\'s get started! Press this button to create your first add!',
        },
        {
            selector: '.third',
            content: ()=>(
                <div>
                    <p>Once your ad is created, you'll be able to manage it : </p>
                    <ul className={"ml-4"}>
                        <li>
                            <button className={"btn-sm btn-outline-warning"}>
                                <i className="bi bi-clipboard-data-fill"/>
                            </button>
                            &nbsp;&nbsp; : To edit your ad.
                        </li>
                        <li>
                            <button className={"btn-sm btn-outline-danger"}>
                                <i className="bi bi-trash"/>
                            </button>&nbsp;&nbsp; : To delete your ad.
                        </li>
                    </ul>
                    <table>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Link</th>
                        <th scope="col">Remaining time</th>
                        <th scope="col">Analytics</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td className="w-25">
                            <img
                                src={"/uploads/ads/1650375735094.jpg"}
                                className="img-fluid img-thumbnail"
                                alt="ads-pic"/>
                        </td>
                        <td>Your Title</td>
                        <td>Your Description</td>
                        <td>
                            <button
                                className="btn-sm btn-success"
                                onClick={() => {
                                    window.open('http://google.com', '_blank')
                                }}> Preview
                            </button>
                        </td>
                        <td>
                            3 Day(s)
                        </td>
                        <td>
                            <button
                                className={"btn-sm btn-info"}>
                                <i className="bi bi-graph-up-arrow"/>&nbsp;
                                80%
                            </button>
                        </td>
                        <td>
                            <button className={"btn-sm btn-outline-warning"}>
                                <i className="bi bi-clipboard-data-fill"/>
                            </button>
                            &nbsp;
                            <button className={"btn-sm btn-outline-danger"}>
                                <i className="bi bi-trash"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>)
        },
        {
            selector: '[data-tut="btn-stats"]',
            content: ()=>(
                <div>
                    <p>Pressing on
                        <span className="badge badge-light">View analytics</span>
                        allows you to check how well your add is doing.
                        <br/>
                        It will show you how many views and clicks your add got.
                    </p>

                    <table>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Image</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Description</th>
                        <th scope="col">Link</th>
                        <th scope="col">Remaining time</th>
                        <th scope="col">Analytics</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td className="w-25">
                            <img
                                src={"/uploads/ads/1650375735094.jpg"}
                                className="img-fluid img-thumbnail"
                                alt="ads-pic"/>
                        </td>
                        <td>Your Title</td>
                        <td>Your Description</td>
                        <td>
                            <button
                                className="btn-sm btn-success"
                                onClick={() => {
                                    window.open('http://google.com', '_blank')
                                }}> Preview
                            </button>
                        </td>
                        <td>
                            3 Day(s)
                        </td>
                        <td>
                                    <button
                                        className={"btn-sm btn-secondary"}>
                                        <i className="bi bi-eye"/>&nbsp;
                                        20
                                    </button>
                                    &nbsp;
                                    <button
                                        className={"btn-sm btn-info"}>
                                        <i className="bi bi-cursor"/>&nbsp;
                                       10
                                    </button>
                        </td>
                        <td>
                            <button className={"btn-sm btn-outline-warning"}>
                                <i className="bi bi-clipboard-data-fill"/>
                            </button>
                            &nbsp;
                            <button className={"btn-sm btn-outline-danger"}>
                                <i className="bi bi-trash"/>
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>)
        },
        {
            selector: '.enjoy',
            content: ()=>(
                <div style={{textAlign:'center'}}>
                    <img src={'/images/2nd-Chance-Icon-sm-blue.png'} height={'35%'}/>
                    <h3>Enjoy</h3>
                    <p>That's all for our tutorial! have fun.</p>
                </div>
            )
        }
    ]
    const[isTourOpen,setisTourOpen]=useState(true)
    function closeTour(){
        setisTourOpen(false)
    }

    const currentUserId = localStorage.getItem('currentUser')
    const[bool,setBool]=useState(false)
    const[details,setDetails]=useState(false)
    const [listOfAds, setListOfAds] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [adsPerPage, setAdsPerPage] = useState(6)
    const indexOfLastAd = currentPage * adsPerPage
    const indexOfFirstAd = indexOfLastAd - adsPerPage
    const currentAds = listOfAds.slice(indexOfFirstAd, indexOfLastAd)
    const pageNumbers= []
    const [adId,setAdId]=useState('')
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [link,setLink]=useState('')
    const [edit,setEdit]=useState(false)
    const [duration,setDuration]=useState(0)
    for(let i=1;i<=Math.ceil(listOfAds.length/adsPerPage);i++){
        pageNumbers.push(i)
    }
    const paginate=(n)=>setCurrentPage(n)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleCloseEdit = () => setEdit(false);
    const handleShow = () => setShow(true);
    useEffect(()=> {
        fetch("http://localhost:2600/ads", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(async response => {
            const data = await response.json()
            setListOfAds(data.ads)
            console.log('************')
            console.log(listOfAds)
        }
    )
}, [])
    async function handleDelete(e,_id){
        e.preventDefault()
        await fetch("http://localhost:2600/ads/"+_id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    async function handleEdit(e,ad){
        e.preventDefault()
        setAdId(ad._id)
        setTitle(ad.title)
        setDescription(ad.description)
        setLink(ad.link)
        setDuration(Math.ceil((Date.parse(ad.expiresAt)- Date.now())/(1000*60*60*24)))
        setEdit(true)
    }

    return (
        <>
            <NotificationContainer/>
            <div className="theme-layout">
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Creating an add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <form method={"POST"}
                            action={"http://localhost:2600/ads/"+currentUserId}
                            encType="multipart/form-data"
                            target="hidden-form">
                            <div className={"row my-1"}>
                                <label htmlFor="birthday" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="text" className="form-control" placeholder="Title" name={"title"}/>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="birthday" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="text" className="form-control" placeholder="Description" name={"description"}/>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="picture" className="col-sm-2 col-form-label">Picture</label>
                                <div className="col-sm-8 offset-1">
                                    <input
                                        type="file"
                                        accept={".png , .jpg, .jpeg"}
                                        name={"image"}
                                        style={{display:'block'}}
                                    />
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="link" className="col-sm-2 col-form-label">Link</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="url" className="form-control" placeholder="Optional" name={"link"}/>
                                    <small id="link" className="form-text text-muted">By default, clicking on your add will redirect users to your profile.</small>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="duration" className="col-sm-2 col-form-label">Duration</label>
                                <div className="col-sm-8 offset-1">
                                    <select className="form-control" name={"duration"}>
                                        <option value={1}>1 Day</option>
                                        <option value={7}>1 Week</option>
                                        <option value={30}>1 Month</option>
                                    </select>
                                </div>
                            </div>
                            <input className={'btn btn-primary offset-lg-9 col-2'} type={"submit"} value={"submit"} onClick={()=> {
                                window.location.reload(false);
                                handleClose()
                            }} />
                        </form>
                        <iframe style={{ display: "none" }} name="hidden-form" />
                    </Modal.Body>
                    {/*<Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>*/}
                </Modal>
                <Modal show={edit} onHide={handleCloseEdit} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>Editing an add</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form method={"POST"}
                            action={"http://localhost:2600/ads/edit/"+adId}
                            encType="multipart/form-data"
                            target="hidden-form">
                            <div className={"row my-1"}>
                                <label htmlFor="birthday" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="text" className="form-control" placeholder="Title" name={"title"} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="birthday" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="text" className="form-control" placeholder="Description" name={"description"} value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="picture" className="col-sm-2 col-form-label">Picture</label>
                                <div className="col-sm-8 offset-1">
                                    <input
                                        type="file"
                                        accept={".png , .jpg, .jpeg"}
                                        name={"image"}
                                        style={{display:'block'}}
                                    />
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="link" className="col-sm-2 col-form-label">Link</label>
                                <div className="col-sm-8 offset-1">
                                    <input type="url" className="form-control" placeholder="Optional" name={"link"} value={link} onChange={(e)=>{setLink(e.target.value)}}/>
                                </div>
                            </div>
                            <div className={"row my-1"}>
                                <label htmlFor="duration" className="col-sm-2 col-form-label">Duration</label>
                                <div className="col-sm-8 offset-1">
                                <input type={'text'} className={'form-control'} readOnly value={duration + ' day(s)'}/>
                                </div>
                            </div>
                            <input className={'btn btn-primary offset-lg-9 col-2'} type={"submit"} value={"submit"} onClick={()=> {
                                handleClose()
                                window.location.reload(false);
                            }} />
                        </form>
                        <iframe style={{ display: "none" }} name="hidden-form" />
                    </Modal.Body>
                    {/*<Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>*/}
                </Modal>
                <Header/>
                <TimelineCover/>
                <section>
                    <div className="gap gray-bg">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row" id="page-contents">
                                        <div className="col-lg-8 offset-lg-2">
                                            <div className="central-meta">
                                                <div className="editing-interest">
                                                    <div className={'row'}>
                                                        <div className={'col-lg-9'}>
                                                            <h5 className="f-title"><i className="ti-arrow-top-right"/> &nbsp;All Ads</h5>
                                                        </div>
                                                        <div className={'col-lg-3'} data-tut="btn-stats">
                                                            <p>View analytics &nbsp;
                                                           <Switch onChange={(e)=>{
                                                               setDetails(!details)
                                                               console.log(details)
                                                           }}/>
                                                            </p>
                                                         </div>
                                                    </div>
                                                    <div className="notification-box">
                                                        <ul>
                                                            {(currentAds.length < 1 || bool)? (
                                                                <div style={{textAlign :'center'}}>
                                                                    <Tour
                                                                        getCurrentStep={(curr) => {
                                                                            setCurrentStep(curr)
                                                                        }}
                                                                        className={tourStyle}
                                                                        steps={steps}
                                                                        isOpen={isTourOpen}
                                                                        onRequestClose={closeTour} />
                                                                    <p data-tut="opps-area">opps no ads found, start by creating your first ad here :</p>
                                                                    {!isTourOpen ? (
                                                                        <>
                                                                        <button className={'btn-sm btn-info my-4'} onClick={()=>{setisTourOpen(true)}}>Watch the tutorial!</button>
                                                                        <br/>
                                                                        </>
                                                                        ): null}
                                                                    <button data-tut="btn-test" className={'btn btn-outline-primary'} onClick={handleShow}>
                                                                        <i className={'ti-plus'}/> &nbsp;
                                                                        Create an add
                                                                    </button>
                                                                </div>
                                                            ):(
                                                                <>
                                                                    <div className="container" style={{paddingTop:0}}>
                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <table className="table table-image">
                                                                                    <thead>
                                                                                    <tr>
                                                                                        <th scope="col">#</th>
                                                                                        <th scope="col">Image</th>
                                                                                        <th scope="col">Titre</th>
                                                                                        <th scope="col">Description</th>
                                                                                        <th scope="col">Link</th>
                                                                                        <th scope="col">Remaining time</th>
                                                                                        <th scope="col">Analytics</th>
                                                                                        <th scope="col">Action</th>
                                                                                    </tr>
                                                                                    </thead>
                                                                                    <tbody>

                                                                                        {currentAds?.map((val,index)=>{
                                                                                            if (val.publisher==currentUserId) {
                                                                                                return (
                                                                                                    <tr>
                                                                                                        <th scope="row">{index+1}</th>
                                                                                                        <td className="w-25">
                                                                                                            <img
                                                                                                                src={"/uploads/ads/"+val.image}
                                                                                                                className="img-fluid img-thumbnail"
                                                                                                                alt="ads-pic"/>
                                                                                                        </td>
                                                                                                        <td>{val.title}</td>
                                                                                                        <td>{val.description}</td>
                                                                                                        <td>
                                                                                                            <button
                                                                                                                className="btn-sm btn-success"
                                                                                                                onClick={() => {
                                                                                                                    window.open('http://google.com', '_blank')
                                                                                                                }}> Preview
                                                                                                            </button>
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {Math.ceil((Date.parse(val.expiresAt)- Date.now())/(1000*60*60*24))} Day(s)
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            {details ? (
                                                                                                                <>
                                                                                                                <button
                                                                                                                    className={"btn-sm btn-secondary"}>
                                                                                                                    <i className="bi bi-eye"/>&nbsp;
                                                                                                                    {val.views}
                                                                                                                </button>
                                                                                                                &nbsp;
                                                                                                                <button
                                                                                                                className={"btn-sm btn-info"}>
                                                                                                                <i className="bi bi-cursor"/>&nbsp;
                                                                                                            {val.clickes}
                                                                                                                </button>
                                                                                                                </>
                                                                                                            ):(
                                                                                                                <>
                                                                                                                    <button
                                                                                                                        className={"btn-sm btn-info"}>
                                                                                                                        <i className="bi bi-graph-up-arrow"/>&nbsp;
                                                                                                                        {(val.clickes*100/val.views).toFixed(1)}%
                                                                                                                    </button>
                                                                                                                </>
                                                                                                                )}
                                                                                                        </td>
                                                                                                        <td>
                                                                                                            <button
                                                                                                                onClick={(e)=> {
                                                                                                                    handleEdit(e,val)
                                                                                                                }}
                                                                                                                className={"btn-sm btn-outline-warning"}>
                                                                                                                <i className="bi bi-clipboard-data-fill"/>
                                                                                                            </button>
                                                                                                            &nbsp;
                                                                                                            <button
                                                                                                                onClick={(e)=> {
                                                                                                                    Swal.fire({
                                                                                                                        title: 'Are you sure you want to delete this ad permanently?',
                                                                                                                        showConfirmButton: false,
                                                                                                                        showDenyButton: true,
                                                                                                                        showCancelButton: true,
                                                                                                                        imageUrl: 'images/2nd-Chance-Icon-sm-blue.png',
                                                                                                                        imageHeight: 150,
                                                                                                                        denyButtonText: `Delete`,
                                                                                                                    }).then((result) => {
                                                                                                                        /* Read more about isConfirmed, isDenied below */
                                                                                                                        if (result.isDenied) {
                                                                                                                            /**/
                                                                                                                            handleDelete(e,val._id)
                                                                                                                            Swal.fire('Ad deleted!', '', 'success')
                                                                                                                        }
                                                                                                                    })
                                                                                                                }}
                                                                                                                className={"btn-sm btn-outline-danger"}>
                                                                                                                <i className="bi bi-trash"/>
                                                                                                            </button>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                )
                                                                                            }
                                                                                            else setBool(true)
                                                                                        })}
                                                                                    </tbody>
                                                                                </table>
                                                                                <button className={'btn btn-outline-primary'} onClick={handleShow}>
                                                                                    <i className={'ti-plus'}/> &nbsp;
                                                                                    Create an add
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <nav>
                                                {/*pagination*/}
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default AdsCrud;