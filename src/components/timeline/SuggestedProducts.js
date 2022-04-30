import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";

function SuggestedProducts(props) {
    const [currentUser, setCurrentUser] = useState("");
    const currentUserId = localStorage.getItem("currentUser");
    const [product, setProduct]= useState([])

    useEffect(() => {
        async function fetchData(){
            await fetch("http://localhost:2600/api/users/me", {
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
                    let sexe=0;
                    if (data.user.gender==="Female"){
                        sexe=1
                    }
                    fetch("http://localhost:2600/dm/kmeans/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body:JSON.stringify({
                            birthday: data.user.birthday,
                            sexe,
                            nationality:1,
                            premium:0
                        })
                    }).then(async response => {
                            const data = await response.json()
                            setProduct(data.products)
                        }
                    )

                }
            });
        }
        fetchData()
    }, []);
    return (
        <div className="central-meta">
            <div className={'row'}>
            <p>Suggested for you</p>
            <div className={'offset-lg-9'}>
                <Link to={'/shop'}>
                    <i className="bi bi-three-dots" title={'more'}/>
                </Link>
                &nbsp;
                <i className="bi bi-eye-slash" title={'hide'}/>
            </div>

            </div>
            <Container>
            <div className="row">
                { product?.map((item , i ) =>
                    <>
                        <div className="col-lg-3 col-sm-6" key={i}>
                            <div className="product-box">
                                <figure>
                                    <span className="new">New</span>
                                    <img src={item?.ProductImage} width={200} height={150} />
                                    <ul className="cart-optionz">
                                        <li><Link  to={`/detailProduct/${item?._id}`}><i className="ti-shopping-cart"/></Link></li>
                                        <li><Link  to={`/detailProduct/${item?._id}`}><i className="ti-eye" /></Link></li>
                                    </ul>
                                </figure>
                                <ul className="product-name">
                                    <h2 title={item?.productName} style={{'font-size': 1.5+'rem'}}>{item?.productName}</h2>
                                    <div className="prices">
                                        <span>{item?.productPrice} DT</span>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </>
                ) }
            </div>
        </Container>
        </div>
    );
}
const Container = styled.div`
    max-height: 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export default SuggestedProducts;