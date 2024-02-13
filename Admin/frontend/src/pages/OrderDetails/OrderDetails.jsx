import {React, useEffect, useState} from 'react';
import './OrderDetails.css'
import { useParams } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; //for redirecting to client profile page



function OrderDetails(props){
     const { orderId } = useParams(); //ORDER ID 
     const [balance, setBalance] = useState(0);

     const [statuses, setStatuses] = useState([]);  //list of statuses for an order (select-option)
     const [billingData, setBillingData] = useState([]);
     const[orderData, setOrderData] = useState({});   //doesnt include timeline 





     // FETCHING ALL ORDER INFORMATION, BILLING DATA, TIMELINE, STATUSES FROM BACKEND (for select-option):
     useEffect(()=>{
        async function fetchStatusesData(){
            try{
                const response = await fetch(`http://localhost:3000/statuses`); //returns all statuses 
                const data = await response.json();
                //console.log(data);

                setStatuses(data);
            } catch(err){
                console.error('Error fetching statuses:', err); 
            }
        }



        async function fetchBillingData(){ //info about all invoices (including unpaid ones) and receipts
            try{
                //console.log(orderId);
                const response = await fetch(`http://localhost:3000/billing/${orderId}`); 
                const billingData = await response.json();
                //console.log(billingData);

                setBillingData(billingData);

            } catch(err){
                console.error('Error fetching billing data:', err); 
            }
        }


        async function fetchOrderData(){
            try{
                //console.log(orderId);
                const response = await fetch(`http://localhost:3000/order/${orderId}`); 
                const orderData = await response.json();
                console.log(orderData);   //{clientid, createdat, fname, lname, orderid, servicename, statusname}

                setOrderData(orderData);
                
            } catch(err){
                console.error('Error fetching order data:', err); 
            }
        }


        
        fetchStatusesData();
        fetchOrderData();
        fetchBillingData();
    }, [orderId]) //ensures that the effect is re-run whenever orderId changes.




    useEffect(() => {
        function calculateBalance() {
            let invoiceSum = 0;
            let receiptSum = 0;
    
            billingData.forEach(row => {
                invoiceSum += parseFloat(row.amountdue);
                if (row.amountpaid) receiptSum += parseFloat(row.amountpaid);
            });
    
            setBalance(invoiceSum - receiptSum);
        }
    
        if (billingData.length > 0) {
            calculateBalance();
        }
    }, [billingData]); // Calculate balance whenever billingData changes
    
  




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
                                        <p>#{orderId}</p>
                                    </div>

                                    <div className='order-information-row'>
                                        <p className='title'>Client ID</p>
                                        <p>#{orderData.clientid}</p>
                                    </div>

                                    <div className='order-information-row'>
                                        <p className='title'>Client Name</p>
                                        <Link to={`/profile/client/${encodeURIComponent(orderData.clientid)}`} className="custom-link">{orderData.fname + " "+orderData.lname}</Link>
                                    </div>

                                    <div className='order-information-row'>
                                        <p className='title'>Service Type</p>
                                        <p>{orderData.servicename}</p>
                                    </div>


                                    <br></br>
                                    <p className='title'>Status</p>


                                    <div className='order-buttons'>
                                        <select name='status' id='status'  className='order-details-status-option'>
                                            <option value="">{orderData.statusname}</option>
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
                            
                            
                            <div className="balance">
                                <div className='balance-title'>
                                    <h6>Balance</h6>
                                    <b>{balance} CAD</b>
                                </div>

                                
                                {billingData.map((row, index)=>{
                                    if(!row.amountpaid) return <i key={index}>Payment required by {row.duedate.substring(0,10)}</i>

                                })

                                }

                            </div>
                            
                                                      
                            
                            <hr />



                            {/* <h6 style={{marginBottom:"1rem"}}>Invoices</h6> */}
                            {billingData ? (
                                <div className='billing-table'>
                                    <div>
                                    <b>Invoice</b>
                                        {billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">#{row.invoiceid}</p>
                                                            
                                                        )
                                                })
                                            }

                                    </div>




                                    <div>
                                    <b>Due Date</b>
                                        { billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">{row.duedate.substring(0,10)}</p>
                                                            
                                                        )
                                                })
                                        }
                                    </div>


                                    <div>
                                    <b>Receipt</b>
                                        {billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">{row.receiptid ? '#' : ''}{row.receiptid}</p>
                                                            
                                                        )
                                                })
                                        }
                                    </div>



                                    <div>
                                    <b>Amount</b>
                                        {billingData.map((row, index)=>{
                                                    if(row.receiptid != null)
                                                        return (
                                                            <p key={index} style={{color:"#59BE9C"}} className="billing-tb-cell">PAID</p>  
                                                        )
                                                    else return (
                                                            <p key={index} style={{color:"red"}} className="billing-tb-cell">{row.amountdue}</p>
                                                            
                                                    )
                                             }
                                            )
                                        }
                                    </div>
                                    
                                </div>
                            ) : <p className="loading"></p>}
                                   
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