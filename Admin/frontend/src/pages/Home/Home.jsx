// MAIN DASHBOARD PAGE (home page)  

import { React, useState, useEffect} from 'react';
import './Home.css'
import AddOrderModal from '../../components/AddOrder_modal/AddOrderModal'

import Button from 'react-bootstrap/Button';

//imports for table:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';







function Home(props){
    const[showAddOrderModal, setShowAddOrderModal] = useState(false); //modal is not shown by default
    const [responseData, setResponseData] = useState(null); //data that is returned back from database
    const [formData, setFormData] = useState({
        orderId:'',
        orderName:'',
        clientName:'',
        serviceType:'',
        status:''
    })


    

    function openModal(){
        setShowAddOrderModal(true);  //open modal on 'Add Client' btn clicked
    }
    function closeModal(){
        setShowAddOrderModal(false);  //close modal  'Add Client' 
    }



    //when 'Search' button is pushed -> get form info -> make request to the database
    async function handleSubmit(e){
        e.preventDefault();

        //process form data:
        //console.log('submitted:', {orderId, orderName, clientName});
        try{
            const response = await fetch(`http://localhost:3000/order/?orderId=${formData.orderId}&orderName=${formData.orderName}&clientName=${formData.clientName}&serviceType=${formData.serviceType}&status=${formData.status}`);
            const data = await response.json();
            
            console.log(data);
            setResponseData(data);  //{fname, lname, orderid, ordername, servicename, statusname }
        }
        catch(err){
            console.error('Error fetching data:', err);
        }
        
        //empty input fields:
        setFormData({ orderId:'',orderName:'',clientName:'',serviceType:'',status:''})
    }







    function handleChange(e){
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        //console.log(formData);
    }

 

    return(


        <div className="page-layout">
            <h4>Dashboard</h4>

            {/* 1. FORM */}
            <div className='search-area'>

                <form onSubmit={handleSubmit} className='left'>
                        <input type='text' name='orderId' id='orderId' value={formData.orderId}  onChange={handleChange} placeholder="Order ID"></input>
                        <input type='text' name='orderName' id='orderName' value={formData.orderName} onChange={handleChange}  placeholder="Order Name"></input>
                        <input type='text'  name='clientName' id='clientName' value={formData.clientName} onChange={handleChange} placeholder="Client Name"></input>
                        <input type='text'  name='serviceType' id='serviceType' value={formData.serviceType} onChange={handleChange} placeholder="Service Type"></input>
                        <input type='text'  name='status' id='status' value={formData.status} onChange={handleChange} placeholder="Status"></input>

                    
                    <Button type='submit' variant="dark" size="sm" >Search</Button>
                </form>


                <div className='right'>
                    {/* 'Add Client' button opens a modal */}
                    <Button onClick={openModal} variant="outline-dark" size="sm">New Order</Button>
                </div>

            </div>




             {/* MODAL: shows conditionally */}
             {showAddOrderModal && <AddOrderModal closeModal={closeModal}/>} 








            {/* 2. DISPLAYING ORDERS- TABLE */}
            <TableContainer component={Paper} className='clients-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Order</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Order ID</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Client ID</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Service</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Status</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Balance (CAD)</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Order Date</TableCell>
                        </TableRow>
                    </TableHead>


                 { responseData &&
                    <TableBody>
                        {responseData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.ordername}</TableCell>
                                <TableCell align="right">{row.orderid}</TableCell>
                                <TableCell align="right">{row.fname + " " + row.lname}</TableCell>
                                <TableCell align="right">{row.servicename}</TableCell>
                                <TableCell align="right">{row.statusname}</TableCell>
                                <TableCell align="right">{row.balance}</TableCell>
                                <TableCell align="right">{row.createdat.substring(0, 10)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 }

                </Table>
            </TableContainer>

        </div>
    )
}




export default Home;