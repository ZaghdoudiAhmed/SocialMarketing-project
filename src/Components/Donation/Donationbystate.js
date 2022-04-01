import React from 'react';

function Donationbystate(props) {
   const result =props.name;
    return (
        <div>
               <div className="l-post">
                  <figure>
                    <img src={result.image} alt />
                  </figure>
                  <div className="l-post-meta">
                    <h4><a href="#" title>{result.title}</a></h4>
                    <div className="l-post-ranking">
                      <a className="admin" href="#" title>{result.donator }</a>
                      <a className="pdate" href="#" title>04-23-19</a>
                      <a className="time-post" href="#" title> -12 hours ago</a>
                    </div>
                    <p>
                   {result.description}
                    </p>
                    <a href="#" title className="read">Read More</a>
                  </div>
                </div> 
        </div>
    );
}

export default Donationbystate;