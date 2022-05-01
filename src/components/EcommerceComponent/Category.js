import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Category() {

const[categories,setCategories]=useState();
  const [loadCategories , setLoadCategories] = useState("")
 
  useEffect(() => {
    let getCatg= async()=>{
      try {
        const resGet = await axios.get('https://api.bestbuy.com/v1/categories?format=json&show=id&apiKey=qhqws47nyvgze2mq3qx4jadt')
        console.log(resGet.data.categories)
        //setLoadCategories('done!')
        //setLoadCategories(resGet.data.categories)
     } catch (error) {
        console.log(error);
     }
    }
    
  }, [loadCategories])
  return (
    <>
    <h1>categories:</h1>
    <ul className="forum-static">
                {categories?.map((item,i)=>
                <li key={i}>
                <a href="#" title>{item}</a>
                <span>13</span>
              </li>
    )}
                  
                  
                </ul>
    
    </>
  );
}
