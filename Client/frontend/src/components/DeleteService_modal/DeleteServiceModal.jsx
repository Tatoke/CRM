import './DeleteServiceModal.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";







function DeleteServiceModal({serviceid, name, setDeleteModalIsOpened}){
    
    //delete service by service id:
    function handleSubmit(e){
        //e.preventDefault();
       
       

        fetch(`http://localhost:3000/services/${serviceid}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to delete service');
              }
              
              console.log('Service deleted successfully');
              
        })
            .catch((error) => {
              console.error('Error deleting service:', error);
        });
    }




    return(
        <>
            <form className="universal-modal delete-service-modal">
                    <h6>Are you sure you want to delete this service?</h6>
                    <br></br>
                    <p>Service: "{name}"</p>

                    <div className="delete-order-buttons">
                        <Button  variant="outline-danger" size="sm" className="delete-service-button" type="submit" onClick={handleSubmit}>Delete</Button>
                        <Button  variant="outline-dark" size="sm"  className="delete-service-button" onClick={()=>setDeleteModalIsOpened(false)}>Cancel</Button>


                    </div>


            </form>


            <div className="overlay"></div>
           
        </>
    )

}





export default DeleteServiceModal;

