import React from 'react'
import { useState } from 'react'
import { Image } from "cloudinary-react";
import './gallary.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const Gallary = ({images}) => {
    let [index, setIndex] = useState(0);
  
  const onMoveHandler = (sign) => {

    if(sign === '-')
    {
      if(index === 0)
      setIndex(prevState => ((prevState % images.length) + images.length - 1 ));
      else
        setIndex(prevState => prevState - 1);
    }
    else 
    {
      if(index === images.length - 1)
        setIndex(prevState => (images.length - (prevState % images.length) - 1) );
      else
        setIndex(prevState => prevState + 1);
    }
    console.log(index)
  }  
  return (
    <div className='gallary'>
        <Image
          className="gallary-img"
          cloudName="dim6g5ogz"
          publicId={images[index].publicId}
        />
       
        <div onClick={() => onMoveHandler('+')} className='forword'><ArrowForwardIosIcon/></div>
        <div onClick={() => onMoveHandler('-')} className='back'><ArrowBackIosIcon/></div>

        <strong>{index+1} / {images.length}</strong>
    </div>
  )
}

export default Gallary