import { React, useState, useEffect} from 'react';
//import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './Finances.css';
import AddTransactionDialog from '../../components/AddTransactionDialog/AddTransaction.jsx'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function Finances(props) {
    const[showAddTransactionDialog, setShowAddTransactionDialog] = useState(false); //modal is not shown by default

    const [type, setType] = useState([]); //list of statuses for select-option input field

    const [responseData, setResponseData] = useState(null); //data that is returned back from database
    const [formData, setFormData] = useState({
        fromDate:'',
        toDate:'',
        transactionId:'',
        clientId:'',
        orderId:'',
        type:''
    })

    function openModal(){
        setShowAddTransactionDialog(true);  
    }
    function closeModal(){
        setShowAddTransactionDialog(false);  
    }


        //when 'Search' button is pushed -> get form info -> make request to the database
        async function handleSubmit(e){
            e.preventDefault();
    
            //process form data:
            //console.log('submitted:', {orderId, orderName, clientName});
            try{             
                const response = await fetch(`http://localhost:3000/transactions/?fromDate=${formData.fromDate}&toDate=${formData.toDate}&transactionId=${formData.transactionId}&clientId=${formData.clientId}&orderId=${formData.orderId}&type=${formData.type}`);

                const data = await response.json();
                
                //console.log(data);
                setResponseData(data);  //{fname, lname, orderid, ordername, servicename, statusname }
            }
            catch(err){
                console.error('Error fetching data:', err);
            }
            
            //empty input fields:
            setFormData({ fromDate:'',
            toDate:'',
            transactionId:'',
            clientId:'',
            orderId:'',
            type:''})
        }
    
        function handleChange(e){
            const {name, value} = e.target;
            setFormData({...formData, [name]: value});
            //console.log(formData);
        }

    return (
        <div className="page-layout">
            <h4>Finances</h4>

            {/* 'Add Transaction' button in the top right corner */}
            <Button onClick={openModal} variant="dark" size="sm" style={{ position: 'absolute', top: '115px', right: '70px' }}>Add Transaction</Button>

            {/* 1. FORM */}
            <form onSubmit={handleSubmit}>
                <div className='left'>
                    <input type='date' name='fromDate' id='fromDate' value={formData.fromDate} onChange={handleChange} ></input>
                    <input type='date' name='toDate' id='toDate' value={formData.toDate} onChange={handleChange} ></input>
                    <input type='text' name='transactionId' id='transactionId' value={formData.transactionId} onChange={handleChange} placeholder="Transaction ID" style={{ width: '170px' }}></input>
                    <input type='text' name='clientId' id='clientId' value={formData.clientId} onChange={handleChange} placeholder="Client ID" style={{ width: '170px' }}></input>
                    <input type='text' name='orderId' id='orderId' value={formData.orderId} onChange={handleChange} placeholder="Order ID"  style={{ width: '170px' }}></input>

                    <select name='transactionType' id='transactionType' value={formData.type} onChange={handleChange}   style={{ marginRight: '50px', height: '30px'}} >
                        <option value='' disabled hidden>Type</option>
                        <option value='All'>All</option>
                        <option value='Receipt'>Receipt</option>
                        <option value='Invoice'>Invoice</option>
                    </select>

                    <Button type='submit' variant="dark" size="sm"  style={{  width: '90px' }}>Search</Button>
                </div>
            </form>

            {/* 2. MODAL: shows conditionally */}
            {showAddTransactionDialog && <AddTransactionDialog closeModal={closeModal}/>}
            

            <TableContainer component={Paper} className='finances-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Payment Date</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Transaction ID</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Client</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Order ID</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Type</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Amount (CAD)</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Attachments</TableCell>
                        </TableRow>
                    </TableHead>


                 { responseData &&
                    <TableBody>
                        {responseData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {/* on the page order name is clickable. onClick redirects to Order Details page about this order: (pass id to get details on order Details page) */}
                                <TableCell component="th" scope="row" className="link-cell" onClick={() => handleOrderClick(row.clientid)}>{row.clientname}</TableCell> 

                                <TableCell align="right">{row.paymentdate}</TableCell>
                                <TableCell align="right">{row.invoiceid}</TableCell> 
                                <TableCell align="right">{row.fname + " " + row.lname}</TableCell>
                                <TableCell align="right">{row.orderid}</TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.attachments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 }

                </Table>
            </TableContainer>


        </div>
    );
}

export default Finances;
