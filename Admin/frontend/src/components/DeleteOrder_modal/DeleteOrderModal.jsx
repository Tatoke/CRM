import './DeleteOrderModal.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";





function DeleteOrderModal({orderId}){

    


    return(
        <>
            <form className="universal-modal">
                    <h6>Are you sure you want to delete this order?</h6>

            </form>


            <div className="overlay"></div>
           
        </>
    )

}





export default DeleteOrderModal;

