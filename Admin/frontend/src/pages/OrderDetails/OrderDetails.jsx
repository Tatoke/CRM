import {React, useEffect, useState} from 'react';
import './OrderDetails.css'
import { useParams } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';





function OrderDetails(props){
    const { orderId } = useParams(); //ORDER ID 

    const [statuses, setStatuses] = useState([]);  //list of statuses for an order (select-option)
    const [responseOrderData, setResponseOrderData] = useState(null); //data that is returned back from database


     // FETCHING ALL ORDER INFORMATION, STATUSES FROM BACKEND (for select-option):
     useEffect(()=>{
        async function fetchStatusesData(){
            try{
                const response = await fetch(`http://localhost:3000/statuses`); //returns all statuses 
                const data = await response.json();
                console.log(data);

                setStatuses(data);
            } catch(err){
                console.error('Error fetching statuses:', err); 
            }
        }




        //!!!need to change to order billing history and timeline:
        async function fetchOrderData(){ //(will need to fetch several different endpoints separately in here : billing, timiline, order details)
            try{
                //console.log(orderId);
                const response = await fetch(`http://localhost:3000/order/?orderId=${orderId}&orderName=null&clientName=null&serviceType=null`); //returns basic order details
                const data = await response.json();
                console.log(data);

                setResponseOrderData(data);
            } catch(err){
                console.error('Error fetching statuses:', err); 
            }

        }


        
        fetchStatusesData();
        fetchOrderData();
    }, [])








    return(
        <div className="page-layout">
            <h4>Dashboard / Order Details</h4>

          
          
          
            <div className='order'>
                 {/* //BOXES (order details + billing): */}
                <div className="order-left-panel">
                        {/* BOX 1 */}
                        <div className='order-details box'>
                           <h5>Comfy Sloth</h5>
                           <hr/>


                           <div className='order-information'>
                                    <div className='order-information-row'>
                                        <p className='title'>Order ID</p>
                                        <p>#1111</p>
                                    </div>

                                    <div className='order-information-row'>
                                        <p className='title'>Client ID</p>
                                        <p>#id</p>
                                    </div>

                                    <div className='order-information-row'>
                                        <p className='title'>Service Type</p>
                                        <p>Website Development</p>
                                    </div>


                                    <br></br>
                                    <p className='title'>Status</p>


                                    <div className='order-buttons'>
                                        <select name='status' id='status'  className='order-details-status-option'>
                                            <option value="">Current Status</option>
                                            {
                                                statuses.map((status, index)=>{
                                                    return  <option key={index} value={status.name}>{status.name}</option>
                                                })
                                            }
                                        </select>
                                        <br></br>

                                        <Button  variant="dark" size="sm"  style={{padding:"10px", margin:"0"}}>Request More Information</Button>
                                    </div>                              
                           </div>
                        </div>


                        {/* BOX 2 */}
                        <div className="order-billing box">
                        <h5>Billing History</h5>
                        <hr />

                        </div>  

                </div>
                



                {/* //BOX 3: (timeline) */}
                <div className="order-timeline box">
                        <h5>Timeline</h5>
                        <hr />

                </div>

            </div>
           


            



        </div>
    )
}




export default OrderDetails;