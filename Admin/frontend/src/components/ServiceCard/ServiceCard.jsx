import './ServiceCard.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';






function ServiceCard({serviceid, name, image, description, createdat, index}){


    return (
        <div className="box service-card">  
            <span className='service-card-id'>#{index+1}</span>
            
            <img src={image}></img>

            <div>
                <h6 style={{textAlign:"center"}}>{name}</h6>
                <br></br>
                <p>{description}</p>
            </div>
           

            <div style={{marginTop:"1.5rem", textAlign:"center"}}>
                <Button variant="outline-dark" size="sm" >Edit</Button>
            </div>
            
        </div>
    )
}




export default ServiceCard;




