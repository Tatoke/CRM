import React, { useState, useEffect } from 'react';
import './RequestInfoModal.css';

import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";
import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";

function RequestInfoModal({setIsRequestMoreInformationModalOpened, orderData, orders}){
    
    const [optionSelected, setOptionSelected] = useState(); 
    const [message, setMessage] = useState('');
    
    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        alert(message)
    }

    useEffect(() => {
        if (orders.length === 0) {
          setOptionSelected('Order');
        }
    }, [orders]);

    return (
    <>
        <div className='universal-modal'>
            <IoCloseOutline size="2em" onClick={()=>setIsRequestMoreInformationModalOpened(false)}  className='close-btn'/>
            <h5 style={{textAlign:"center", marginBottom: '2.5em'}}>Request additional Information</h5>
            <h6><span style={{ fontWeight: 'bold' }}>Client&nbsp;&nbsp;&nbsp;</span>{orderData.fname + " " + (orderData.mname ? " " + orderData.mname : "") + " " + orderData.lname}</h6>
            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center'}}>
                <h6 style={{ marginTop: '1rem', fontWeight: 'bold'}}>Order</h6>
                <select style={{ width: '15vw', marginTop: '2rem', marginLeft: '17.5vw'}} id="selectedOption" name="selectedOption" onChange={(e)=>setOptionSelected(e.target.value)} value={optionSelected}>
                    {orders.length!=0 ?(
                        orders.filter(orders => orders.clientId === orderData.clientId).map((orders, index) => (
                                <option key={index} value={orders.orderid}>{orders.orderid}{" " + orders.name}</option>
                            ))
                    )  : (
                        <option  value="Order">Order</option>
                    )}

                                
                </select>
            </div>
            <h6 style={{ marginTop: '5rem', fontWeight: 'bold'}}>Message</h6>
            <form>
                <textarea style={{ marginTop: '1rem', width: '44vw', height: '10rem' }} onChange={handleMessage} value={message} required></textarea>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <Button variant="dark" size="sm" style={{marginTop: "3rem", width:"8rem"}} type="submit" onClick={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    </>
    )
}

export default RequestInfoModal;