import React, { useState, useEffect } from 'react';
import './AddClientModal.css';

import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";

//MODAL


function AddClientModal({closeModal}){  //true
    let [companies, setCompanies] = useState([]);
    let [formData, setFormData] = useState({
        fName:'',
        mName:'',
        lName:'',
        company:'',
        phone:'',
        email:'',
        city:'',
        province:'',
        note:''
    });
   



    // FETCHING ALL COMPANIES FROM BACKEND (for select-option):
    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch(`http://localhost:3000/companies`); //returns all the columns for all companies
                const data = await response.json();
                console.log(data);

                //const companyNames = data.map((company)=> company.name);
                setCompanies(data);
            } catch(err){
                console.error('Error fetching companies:', err); 
            }
        }

        fetchData();
    }, [])




    //WHEN ADD BUTTON PUSHED: add client to db (make post request to db)
    async function handleSubmit(e){
        e.preventDefault();

        //post request to backend to add new client:
        try {
            const response = await fetch('http://localhost:3000/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // convert to json; formData is an object with client information that is sent to backend
            });
        
            if (!response.ok) {
              throw new Error('Failed to add client');
            }
        
            // Handle successful response, e.g., show a success message
            console.log('Client added successfully');
        } catch (err) {
            console.error('Error adding client:', err.message);
        }

        
        //epty input fields at the end
        setFormData({ fName:'',mName:'',lName:'',company:'',phone:'',email:'', city:'', province:'', note:''})
    }


    function handleChange(e){
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        //console.log(formData);
    }
   





 return(
    <div>
        
       <form onSubmit={handleSubmit} className='add-client-modal'>
            {/* CLOSE BUTTON */}
            <IoCloseOutline size="2em" onClick={()=>closeModal()}  className='close-btn'/>
            <h5 className='center-element' style={{marginBottom: '2.5em'}}>Client Information</h5>



            <div className='section'>
                <div className='subsection'>    
                    <label htmlFor='fName' required>First Name</label>
                    <input id='fName' name='fName' type='text' placeholder='First Name' value={formData.fName} onChange={handleChange} ></input>

                </div>
                

                <div className='subsection'>   
                    <label htmlFor='mName'>Middle Name</label>
                    <input id='mName' name='mName' type='text' placeholder='Middle Name' value={formData.mName} onChange={handleChange} ></input>
                </div>

                <div className='subsection'>   
                    <label htmlFor='lName'>Last Name</label>
                    <input id='lName' name='lName' type='text' placeholder='Last Name' required value={formData.lName} onChange={handleChange} ></input>
                </div>
            </div>



            {/* PHONE AND EMAIL */}
            <div className='section'>
                <div className='subsection'>    
                    <label htmlFor='phone'>Phone</label>
                    <input id='phone' name='phone' type='text' pattern="[0-9\-]{12}" placeholder='111-111-1111' required value={formData.phone} onChange={handleChange} ></input>

                </div>
                

                <div className='subsection'>   
                    <label htmlFor='email'>Email</label>
                    <input id='email'name='email' type='email' placeholder='example@gmail.com' required value={formData.email} onChange={handleChange} ></input>
                </div>
            </div>





            {/* ADDRESS */}
            <div className='section'>
                <div className='subsection'>    
                    <label htmlFor='city'>City</label>
                    <input id='city' name='city' type='text' placeholder='City' required value={formData.city} onChange={handleChange} ></input>

                </div>
                

                <div className='subsection'>   
                    <label htmlFor='province'>Province</label>
                    <input id='province'name='province' type='text' placeholder='Province' required value={formData.province} onChange={handleChange} ></input>
                </div>
            </div>


            {/* COMPANY */}
            <div className='subsection'>
                <label htmlFor='company'>Company</label>

                <select id="company" name="company"  required value={formData.company} onChange={handleChange} >
                    <option value="" disabled hidden>Select a company...</option>
                    
                    {/* rendering companies array */}
                    {/* !!!passing companyid as a value!!! */}
                    {
                        companies.map((company, index)=>{
                            return <option value={company.companyid} key={index}>{company.name}</option>
                        })
                    }

                </select>
            </div>




            <div className='subsection'>   
                    <label htmlFor='note'>Note</label>
                    <textarea id='note' name='note' type='text' rows='3' placeholder='Note' value={formData.note} onChange={handleChange} ></textarea>
            </div>





            {/* ADD BUTTON */}
            <div className='center-element'>
                <Button type='submit'  variant="dark" size="sm">Add</Button>
            </div>
            
        </form>



        {/* Semi-transparent overlay  */}
        <div className="overlay"></div>
    </div>




    )
}



export default AddClientModal;