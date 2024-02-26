import './DeleteProfileModal.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom'; //redirect to another page



function DeleteProfileModal({ userType, userId, setIsDeleteProfileModalOpened}){
    
        function handleSubmit(e){
            e.preventDefault();
            //console.log("order id to delete" + orderId);
            fetch(`http://localhost:3000/${userType}/${userId}`, {
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
                        <h6>Are you sure you want to delete this {userType}?</h6>

                        <div className="delete-order-buttons">
                            <Button  variant="outline-danger" size="sm" className="delete-order-button" type="submit" onClick={handleSubmit}>Delete</Button>
                            <Button  variant="outline-dark" size="sm"  className="delete-order-button" onClick={()=>setIsDeleteProfileModalOpened(false)}>Cancel</Button>


                        </div>


                </form>


                <div className="overlay"></div>
            
            </>
        )}

export default DeleteProfileModal;
