// MAIN DASHBOARD PAGE (home page)  

import { React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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

    const [statuses, setStatuses] = useState([]); //list of statuses for select-option input field
    const [services, setServices] = useState([]); //list of services for select-option input field


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



     // FETCHING ALL STATUSES FROM BACKEND (for select-option):
     useEffect(()=>{
        async function fetchStatusesData(){
            try{
                const response = await fetch(`http://localhost:3000/statuses`); //returns all statuses 
                const data = await response.json();
                //console.log(data);

                setStatuses(data);
                //console.log(data);
            } catch(err){
                console.error('Error fetching statuses:', err); 
            }
        }


        async function fetchServicesData(){
            try{
                const response = await fetch(`http://localhost:3000/services`); 
                const data = await response.json();
                //console.log(data);

                setServices(data);
            } catch(err){
                console.error('Error fetching services:', err); 
            }
        }

        

        fetchStatusesData();
        fetchServicesData();

    }, [])





    //when 'Search' button is pushed -> get form info -> make request to the database
    async function handleSubmit(e){
        e.preventDefault();

        //process form data:
        //console.log('submitted:', {orderId, orderName, clientName});
        try{
            const response = await fetch(`http://localhost:3000/order/?orderId=${formData.orderId}&orderName=${formData.orderName}&clientName=${formData.clientName}&serviceType=${formData.serviceType}&status=${formData.status}`);
            const data = await response.json();
            
            //console.log(data);
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



    //redirecting to OrderDetails page when any order name is clicked: (pass orderId too)
    const navigateTo = useNavigate();

    function handleOrderClick(orderId){
        console.log(orderId);
        //return window.location.href = `/orderDetails/${orderId}`;

        navigateTo(`/orderDetails/${orderId}`)
    }


    //=========================================================================================================================================================
    return(
        <div className="page-layout">
            <h4>Requested Services</h4>
            <Button type='submit' variant="dark" size="md" >+ Request a Service</Button>

            <form>
                
            </form>
        </div>
    )
}




export default Home;