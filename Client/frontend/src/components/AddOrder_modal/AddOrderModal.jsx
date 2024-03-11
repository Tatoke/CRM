
import React, { useState, useEffect } from 'react';
import './AddOrderModal.css';



import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";




function AddOrderModal({closeModal}){
    const [services, setServices] = useState([]); //list of services for select-option input field
    const [milestoneNumber, setMilestoneNumber] = useState(1);
    const [formData, setFormData] = useState({   //will set by default status "in progress" in backend for each new order
        orderName:'',
        clientId:'',
        milestones:[''],
        serviceType:''
    })

    


    //for service select-option:
    useEffect(()=>{
        async function fetchServicesData(){
            try{
                const response = await fetch(`http://localhost:3000/services`); //returns all statuses 
                const data = await response.json();
                //console.log(data);

                setServices(data);
            } catch(err){
                console.error('Error fetching services:', err); 
            }
        }

        fetchServicesData();
    }, [])






    function handleChange(e){
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        //console.log(formData);
    }


    //process form data - add enw order to db:
    async function handleSubmit(e){
        e.preventDefault();
        try{
            // Construct the request body with the form data
            // const requestBody = {
            //     clientId: formData.clientId,
            //     milestones: formData.milestones,
            //     // Add more fields to the request body as needed
            // };
  
        // Send a POST request to your backend API endpoint
            fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to add order');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Order added successfully:', data); // success response from the backend
                    setFormData({orderName:'',clientId:'',milestones:[],serviceType:''});
                })
                .catch((error) => {
                    console.error('Error adding order:', error);
                });
            }
            catch(err){
                console.error('Error fetching data:', err);
            }

        //console.log(formData);
    }



    //RENDERING MILESTONES FOR INPUTS:--------------------------------
    const addMilestoneField = () => {
        setFormData({
          ...formData,
          milestones: [...formData.milestones, ''], // Add an additional empty string for the next milestone
        });
      };

    const handleMilestoneChange = (index, value) => {
        const newMilestones = [...formData.milestones];
        newMilestones[index] = value;
        setFormData({...formData,milestones: newMilestones,});
        //console.log(formData);
    };

    const renderMilestoneFields = () => {
        return formData.milestones.map((milestone, index) => (
          
          <div key={index} style={{margin:"0.5rem"}}>
            <label htmlFor={milestone} style={{marginRight:"1rem"}}>Milestone {index+1} </label>
            <input type="text" value={milestone} onChange={(e) => handleMilestoneChange(index, e.target.value)} className='milestoneInputField' required />
          </div>

        ));
      };
      //----------------------------------------------------------------




    return(
        <div>
            <form onSubmit={handleSubmit} className='universal-modal'>
            
                {/* CLOSE BUTTON */}
                <IoCloseOutline size="2em" onClick={()=>closeModal()}  className='close-btn'/>
                <h5 className='center-element' style={{marginBottom: '2.5em'}}>Order Information</h5>




                <div className='section'>
                    <div className='subsection'>    
                        <label htmlFor='orderName' required>Order Name</label>
                        <input id='orderName' name='orderName' type='text' placeholder='Order Name' value={formData.orderName} onChange={handleChange} required></input>

                    </div>
                    


                    <div className='subsection'>   
                        <label htmlFor='clientId'>Client ID</label>
                        <input id='clientId' name='clientId' type='text' placeholder='1111' value={formData.clientId} onChange={handleChange} required></input>
                    </div>


                    <div className='subsection'>   
                        <label htmlFor='serviceType'>Service Type</label>
                        {/* SELECT-OPTION FOR SERVICE TYPES: */}
                        <select value={formData.serviceType} onChange={handleChange} name='serviceType' id='serviceType' style={{width: "213.44px", marginRight: "17px"}} required>
                            <option value="" disabled hidden>Service Type</option>
                            {
                                services.map((service, index)=>{
                                    return  <option key={index} value={service.serviceid}>{service.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>




                {/* MILESTONES INPUT: */}
                <div className='milestone-section'>
                    <div className='milestone-title'>
                        <h6>Milestones</h6>
                        <Button  variant="outline-primary" size="sm" onClick={addMilestoneField}> Add Milestone </Button>
                    </div>
            
                    <div>
                     {renderMilestoneFields()}
                    </div>


                </div>



                
                







                {/* ADD BUTTON */}
                <div className='center-element'>
                    <Button type='submit'  variant="dark" size="sm">Create Order</Button>
                </div>

            </form>
            {/* Semi-transparent overlay  */}
        <div className="overlay"></div>
        </div>
    )


    
}



export default AddOrderModal;