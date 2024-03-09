"use client";

import {useState, useEffect} from 'react'

export  function ShowOffCanvas({state}) {

    const [showcanvas, setShowCanvas] = useState(state);

   const toggleShowCanvas = () => {
    setShowCanvas(!showcanvas);
   }

    
  return 
    showcanvas
  
}
