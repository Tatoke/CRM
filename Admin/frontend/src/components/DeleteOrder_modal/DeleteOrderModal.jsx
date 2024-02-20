import './DeleteOrderModal.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom'; //redirect to another page





function DeleteOrderModal({orderId, setIsDeleteOrderModalOpened}){
    const navigateTo = useNavigate();
    
    //delete order by orderId:
    function handleSubmit(e){
        e.preventDefault();
        //console.log("order id to delete" + orderId);

        fetch(`http://localhost:3000/orders/${orderId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
        .then((response) => {
              if (!response.ok) {
                throw new Error('Failed to delete order');
              }
              
              console.log('Order deleted successfully');
              navigateTo(`/`); //redirect to home page
        })
            .catch((error) => {
              console.error('Error deleting order:', error);
        });
    }




    return(
        <>
            <form className="universal-modal delete-order-modal">
                    <h6>Are you sure you want to delete this order?</h6>

                    <div className="delete-order-buttons">
                        <Button  variant="outline-danger" size="sm" className="delete-order-button" type="submit" onClick={handleSubmit}>Delete</Button>
                        <Button  variant="outline-dark" size="sm"  className="delete-order-button" onClick={()=>setIsDeleteOrderModalOpened(false)}>Cancel</Button>


                    </div>


            </form>


            <div className="overlay"></div>
           
        </>
    )

}





export default DeleteOrderModal;

