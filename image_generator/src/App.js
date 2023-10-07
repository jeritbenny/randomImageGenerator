import { useEffect, useRef, useState } from 'react';
import './App.css';
import {  Form,Button } from 'react-bootstrap';
// import REACT_APP_API_KEY  from './.env';

import axios from 'axios';
function App() {

  const[image,setImage]=useState([])
  const[page,setPage]=useState(1)
  const[totalPage,setTotalPages]=useState(0)

  useEffect(()=>{
    fetchImages();
  },[image])


console.log(process.env.REACT_APP_API_KEY);
const API_URL = 'https://api.unsplash.com/search/photos'
const IMAGE_SIZE =20;
  const searchInput =useRef(null);

  const handleSearch= (event) =>{
event.preventDefault();
fetchImages();

  }


  const handleSelection =(selection) =>{
    searchInput.current.value = selection;
    fetchImages();
  }



  const fetchImages= async()=>{
    try{
      const result=  await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGE_SIZE}&client_id=ncrdo8IltjsEPBpmTjsYbGj--YgmGTfnLCBcC63atic`)
      console.log(result);
      setImage(result.data.results)
    setTotalPages(result.data.total_pages)
    }catch(err){
    console.log(err);
    }
  }

  


  return (
    <div className="container">
      <h1 className='title'>Image Search</h1>
     <div className='search-section'>
      <Form onSubmit={handleSearch}>
      <Form.Control className='inp' type='search' placeholder='search anything'

      
      ref={searchInput}/>
      </Form>

     </div>
     <div className='filters'>
                   <div className='item' onClick={()=>handleSelection('cars')}>Cars</div>
                   <div className='item' onClick={()=>handleSelection('fish')}>Fish</div>
                   <div className='item' onClick={()=>handleSelection('nature')}>Nature</div>
                   <div className='item' onClick={()=>handleSelection('motorbike')}>Bikes</div>
     </div>
     <div className='image'>
      {
        image.map((item)=>(
          
            <img key={item.id} 
            src={item.urls.small} 
            alt={item.alt_description}
            className='img'/>
        
          
        ))
      }
     </div>
     <div className='button'>
      {
      page > 1 && (<Button  className='btn1' onClick={()=> setPage(page -1)}>Previous</Button>
      )}
    {page<totalPage &&
    (<Button className='btn2' onClick={()=> setPage(page + 1)}>Next</Button>)
      
         }  
     </div>
      
    </div>
  );
}

export default App;
