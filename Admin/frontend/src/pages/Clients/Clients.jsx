import React from 'react';
import AddClientModal from '../../components/AddClient_modal/AddClient'

import Button from 'react-bootstrap/Button';

//imports for table:
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './Clients.css'




function Clients(props){
    
    const [clientId, setClientId] = React.useState('');
    const [clientFirstName, setClientFirstName] = React.useState('');
    const [clientLastName, setClientLastName] = React.useState('');
    const[showAddClientModal, setShowAddClientModal] = React.useState(false); //modal is not shown by default
    const [responseData, setResponseData] = React.useState(null); //data that is returned back from database



    function handleOpenAddClientModal(){
        setShowAddClientModal(true);  //open modal on 'Add Client' btn clicked
    }
    function handleCloseAddClientModal(){
        setShowAddClientModal(false);  //close modal  'Add Client' 
    }


    //when 'Search' button is pushed -> get form info -> make request to the database
    async function handleSubmit(e){
        e.preventDefault();

        //process form data:
        //console.log('submitted:', {clientId, clientFirstName, clientLastName});
        try{
            //const response = await fetch(`/clients/${clientId}`);
            const response = await fetch(`http://localhost:3000/client/?clientId=${clientId}&clientFirstName=${clientFirstName}&clientLastName=${clientLastName}`);
            const data = await response.json();
            
            console.log(data);
            setResponseData(data); 
        }
        catch(err){
            console.error('Error fetching data:', err);
        }
        
        //empty input fields:
        setClientId('');
        setClientFirstName('');
        setClientLastName('');
    }



 

    return(


        <div className="page-layout">
            <h4>Clients</h4>

            {/* 1. FORM */}
            <form onSubmit={handleSubmit}>

                <div className='left'>
                        <input type='text' name='clientId' id='clientId' value={clientId} onChange={(e)=>setClientId(e.target.value)} placeholder="Client ID"></input>
                        <input type='text' name='clientFirstName' id='clientFirstName' value={clientFirstName} onChange={(e)=>setClientFirstName(e.target.value)} placeholder="First Name"></input>
                        <input type='text'  name='clientLastName' id='clientLastName' value={clientLastName} onChange={(e)=>setClientLastName(e.target.value)} placeholder="Last Name"></input>
                    
                    <Button type='submit' variant="dark" size="sm" >Search</Button>
                </div>


                <div className='right'>
                    {/* 'Add Client' buttons opens a modal */}
                    <Button onClick={handleOpenAddClientModal} variant="outline-dark" size="sm">Add Client</Button>
                </div>

                {/* MODAL: shows conditionally */}
                {showAddClientModal && <AddClientModal />} 
            </form>





            {/* 2. DISPLAYING CLIENTS - TABLE */}
            <TableContainer component={Paper} className='clients-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Client ID</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Email</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Phone</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>City</TableCell>
                            <TableCell align="right" style={{fontWeight: 'bold'}}>Province</TableCell>
                        </TableRow>
                    </TableHead>


                 { responseData &&
                    <TableBody>
                        {responseData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{row.fname + " "+ row.lname}</TableCell>
                                <TableCell align="right">{row.clientid}</TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.city}</TableCell>
                                <TableCell align="right">{row.province}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                 }

                </Table>
            </TableContainer>

        </div>
    )
}




export default Clients;