import {React, useEffect, useState} from 'react';
import './OrderDetails.css'
import { useParams } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'; //for redirecting to client profile page


import OrderTimeline from './OrderTimeline.jsx';
import DeleteOrderModal from '../../components/DeleteOrder_modal/DeleteOrderModal.jsx';
import RequestMoreInformationModal from '../../components/RequestInfo_modal/RequestInfoModal.jsx';






function OrderDetails(props){
    let loggedInEmpId = 1;   //FIGURE OUT THIS LATER!!! NEED TO KEEP TRACK OF WHO IS LOGGED IN RIGHT NOW TO KEEP TRACK OF UPDATES FOR TIMELINE (passed to OrderTimeline component)




     const { orderId } = useParams(); //ORDER ID 
     const [balance, setBalance] = useState(0);

     const [statuses, setStatuses] = useState([]);  //list of statuses for an order (select-option)
     const [billingData, setBillingData] = useState([]);
     const [orderData, setOrderData] = useState({});   //doesnt include timeline 
     const [orders, setOrders] = useState({});

     const [selectedStatus, setSelectedStatus] = useState("");
     const [isStatusUpdated, setIsStatusUpdated] = useState(false);

     let [isDeleteOrderModalOpened, setIsDeleteOrderModalOpened] = useState(false);
     let [IsRequestMoreInformationModalOpened, setIsRequestMoreInformationModalOpened] = useState(false);




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

        async function fetchOrdersData(){
            try{
                const response = await fetch(`http://localhost:3000/orders`); //returns all statuses 
                const data = await response.json();
                //console.log(data);

                setOrders(data);
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
                console.log(orderData);   //{clientid, name, createdat, fname, lname, orderid, servicename, statusname}

                setOrderData(orderData);
                
            } catch(err){
                console.error('Error fetching order data:', err); 
            }
        }


        
        fetchStatusesData();
        fetchOrderData();
        fetchBillingData();
        fetchOrdersData();
    }, [orderId]) //ensures that the effect is re-run whenever orderId changes.


    //STATUS SELECT-OPTION -------------------------------------------------------
    useEffect(() => {
        if (orderData.statusname) {
          setSelectedStatus(orderData.statusname);
        }
      }, [orderData.statusname]);
    


      async function handleStatusChange(event){
            const newStatusName = event.target.value;
            setSelectedStatus(newStatusName);
            try {
                await fetch(`http://localhost:3000/order/${orderData.orderid}/status`, {  // Send updated status to backend API
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ status: newStatusName }),
                });

           
            } catch (error) {
                console.error('Error updating order status:', error);
            }

            setIsStatusUpdated(true);
      };

      useEffect(() => {
        if (isStatusUpdated) {
          const timeoutId = setTimeout(() => {
            setIsStatusUpdated(false); // Reset the state after 3 seconds
          }, 2500);
      
          // Cleanup function to clear the timeout when the component unmounts or when isStatusUpdated changes
          return () => clearTimeout(timeoutId);
        }
      }, [isStatusUpdated]);
    //STATUS SELECT-OPTION -------------------------------------------------------


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
            <div className='title-section'>
                <h4>Dashboard / Order Details</h4>
                <Button  variant="outline-danger" size="sm" onClick={()=>{setIsDeleteOrderModalOpened(true)}}>Delete Order</Button>
            </div>
            

          
          
          
            <div className='order'>
                 {/* //BOXES (order details + billing): */}
                <div className="order-left-panel">
                        {/* BOX 1 */}

                        
                    
                        <div className='order-details box'>
                                <h5>{orderData.name && orderData.name}</h5>
                                <hr/>

                                <div className='order-information'>
                                       
                                            <div className='order-information-row'>
                                                <p className='title'>Order ID</p>
                                                <p>#{orderId}</p>
                                            </div>

                                            <div className='order-information-row'>
                                                <p className='title'>Client ID</p>
                                                <p>#{orderData ? orderData.clientid : ""}</p>
                                            </div>

                                            <div className='order-information-row'>
                                                <p className='title'>Client Name</p>
                                                <Link to={`/profile/client/${encodeURIComponent(orderData.clientid)}`} className="custom-link">{orderData ? orderData.fname + " "+orderData.lname : ""}</Link>
                                            </div>

                                            <div className='order-information-row'>
                                                <p className='title'>Service Type</p>
                                                <p>{orderData ? orderData.servicename : ""}</p>
                                            </div>

                                            <div className='order-information-row'>
                                                <p className='title'>Created At</p>
                                                <p>{orderData.createdat ? orderData.createdat.substring(0,10) : ""}</p>
                                            </div>

                                        



                                            <br></br>
                                            <p className='title'>Status</p>


                                            <div className='order-buttons'>
                                                {
                                                    statuses && (
                                                        <select name="selectedStatus" value={selectedStatus} onChange={handleStatusChange} className="order-details-status-option">
                                                            <option name="selectedStatusId" value={selectedStatus} >{selectedStatus}</option>
                                                            {
                                                                statuses.map((status)=>{
                                                                    if(status.name != selectedStatus)
                                                                    return <option key={status.statusid} name="selectedStatusId" value={status.name}>{status.name}</option>
                                                                })
                                                            }

                                                            
                                                        
                                                        </select>
                                                    )
                                                }
                                                
                                                {isStatusUpdated && 
                                                    <i style={{fontSize:"0.69rem", color:"grey"}}>Status was updated.</i>
                                                }

                                                <br></br>
                                                <Button  variant="dark" size="sm"  style={{padding:"10px", margin:"0"} } onClick={()=>{setIsRequestMoreInformationModalOpened(true)}}>Request More Information</Button>
                                            </div>                              

                                            {IsRequestMoreInformationModalOpened ? <RequestMoreInformationModal setIsRequestMoreInformationModalOpened={setIsRequestMoreInformationModalOpened} orderData={orderData} orders={orders}/> : null}
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
                                    <p className='title'>Invoice</p>
                                        {billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">#{row.invoiceid}</p>
                                                            
                                                        )
                                                })
                                            }

                                    </div>




                                    <div>
                                    <p className='title'>Due Date</p>
                                        { billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">{row.duedate.substring(0,10)}</p>
                                                            
                                                        )
                                                })
                                        }
                                    </div>


                                    <div>
                                    <p className='title'>Receipt</p>
                                        {billingData.map((row, index)=>{
                                                        return (
                                                            <p key={index} className="billing-tb-cell">{row.receiptid ? '#' : ' -'}{row.receiptid}</p>
                                                            
                                                        )
                                                })
                                        }
                                    </div>



                                    <div>
                                    <p className='title'>Amount</p>
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
                




{/* ============================================================================TIMELINE------------------------------------------------------------------------------------------ */}
                {/* //BOX 3: (timeline) */}
                <div className="order-timeline box">
                        {/* custom timeline component: */}
                        <OrderTimeline orderId={orderId} loggedInEmpId={loggedInEmpId}/>

                </div>

            </div>
           
        


        
            {isDeleteOrderModalOpened ? <DeleteOrderModal orderId={orderId} setIsDeleteOrderModalOpened={setIsDeleteOrderModalOpened}/> :null}
        </div>



      
    )
}




export default OrderDetails;