import React ,{useEffect,useState}from 'react';

const Donationbyuser = (props) => {
  
const [state , setstate]= useState(true);

function transition(card) {
   //// console.log(card.classList)
  if (card.classList.contains('notactive')) {

    card.classList.remove('notactive')
    card.classList.toggle('active');
    setstate(false)
  }


}
function transition1(card) {
   /// console.log(card.classList)
  if (card.classList.contains('active')) {

    card.classList.remove('active')
    card.classList.toggle('notactive')
    setstate(true);
  }


}
useEffect (() => {



  const cards = document.querySelectorAll('.container2');
cards.forEach(card => card.addEventListener('click', function (){
    console.log(state)
    if(state==true)
transition(card)
else{
    transition1(card)
}
}));  


},[state])
 
    return (
        <div>
            <a href="https://front.codes/" className="logo" target="_blank">
</a>
	
<div className="section over-hide">
  <div className="container2 notactive">
    <div className="row full-height justify-content-center">
      <div className="col-12 text-center align-self-center py-5">
        <div className="section text-center py-5 py-md-0">
          <div className="card-3d-wrap mx-auto">
            <div className="card-3d-wrapper">
              <div className="card-front">
                <div className="pricing-wrap"> 
                  <p className="mb-4">Your donation</p>
                  <h4 className="mb-5">{props.name.description}</h4>
                  <p className="mb-1"><i className="uil uil-location-pin-alt size-22" /></p>
                  <p className="mb-4">{props.name.state}</p>
                  <div className="img-wrap img-2">
                    <img src="https://assets.codepen.io/1462889/sea.png" alt />
                  </div>
                  <div className="img-wrap img-1">
                    <img src="https://assets.codepen.io/1462889/kayak.png" alt />
                  </div>
                  <div className="img-wrap img-3">
                    <img src="https://assets.codepen.io/1462889/water.png" alt />
                  </div>
                  <div className="img-wrap img-6">
                    <img src="https://assets.codepen.io/1462889/Stone.png" alt />
                  </div>
                </div>
              </div>
              <div className="card-back">
                <div className="pricing-wrap">
                  <h4 className="mb-5">{props.name.title}</h4>
                  <h2 className="mb-2">{props.name.datecre}</h2>

                  <p className="mb-4">Category : {props.name.category}</p>
                  <p className="mb-1"><i className="uil uil-location-pin-alt size-22" /></p>
                  <p className="mb-4">{props.name.location}</p>
                  <div className="img-wrap img-2">
                    <img src="https://assets.codepen.io/1462889/grass.png" alt />
                  </div>
                  <div className="img-wrap img-4">
                    <img src="https://assets.codepen.io/1462889/camp.png" alt />
                  </div>
                  <div className="img-wrap img-5">
                    <img src="https://assets.codepen.io/1462889/Ivy.png" alt />
                  </div>
                  <div className="img-wrap img-7">
                    <img src="https://assets.codepen.io/1462889/IvyRock.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 
        </div>
 

    );
}

export default Donationbyuser;
