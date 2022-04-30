import React, {useEffect, useState} from 'react';

function Ads(props) {
    const [id,setId]= useState('')
    const [title,setTitle]= useState('')
    const [description,setDescription]= useState('')
    const [link,setLink]= useState('')
    const [imagepath,setImagePath]= useState('')
    useEffect(()=> {fetch("http://localhost:2600/ads/getOne", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async response => {
                const data = await response.json()
                setId(data.ad._id)
                setLink(data.ad.link)
                setTitle(data.ad.title)
                setDescription(data.ad.description)
                setImagePath(data.ad.image)
            }
        )
        },
        [])

    async function handleopen(e,_id,str){
        e.preventDefault()
        console.log('******eeeeeeeee**********')
        await fetch("http://localhost:2600/ads/addClick", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({id :_id })
        })
        window.open('http://localhost:3000'+str, '_blank')
    }
    return (
        <>
            <div className="widget">
                <div className="banner medium-opacity bluesh">
                    <div className="bg-image" style={{backgroundImage : 'url(uploads/ads/'+imagepath+')'}} />
                    <div className="baner-top">
                        <span><img alt="" src='images/book-icon.png'/></span>
                        <i className="fa fa-ellipsis-h"></i>
                    </div>
                    <div className="banermeta">
                        <p>
                            {title}
                        </p>
                        <span>{description}</span>
                        <a data-ripple="" title="" href="#" onClick={(e) => {
                            handleopen(e,id,link)
                        }}>Check it now!</a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ads;