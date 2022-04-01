import React,{useEffect} from 'react';

import axios from "axios";
const Insta = () => {

    const fetchimages = async () => {
        try {
          const response = await axios.get(
            "http://localhost:2600/api/"
          );
          console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchimages();
    }, []);
    return (
        <div>
            
        </div>
    );
}

export default Insta;
