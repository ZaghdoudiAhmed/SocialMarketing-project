import React, { useEffect, useState } from 'react';

export default function Feedback(props) {
console.log(props)
  return (
    <>
    <li>
                                  <span>Last feedback</span>
                                  <p>
                               {props.props.messagefeedback}
                                  </p>
                                </li>
    
    </>
  );
}
