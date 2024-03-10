import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";



function AddNewServiceModal({setIsNewServiceModalOpened}){
    let [formData, setFormData] = useState({
        name:"",
        description:"",
        image:null
    })



    async function handleSubmit(e){
        //e.preventDefault();
        //console.log(formData.image);
        // const formdata = new FormData();
        // formdata.append('name', formData.name); // Add other form data
        // formdata.append('description', formData.description); // Add other form data
        // formdata.append('image', formData.image); // Add file data



        try {
            const response = await fetch('http://localhost:3000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // convert to json; formData is an object with client information that is sent to backend
            });
        
            if (!response.ok) {
              throw new Error('Failed to add service');
            }
        
            // Handle successful response, e.g., show a success message
            console.log('Service added successfully');
        } catch (err) {
            console.error('Error adding service:', err.message);
        }


        setFormData({name:"",description:"",image:null});
    }


    function handleChange(e){
        const {name, value} = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
          }));
        //console.log(formData);
    }


    function handleFileChange(e){
        const file = e.target.files[0]; //File object
        //console.log(file);
        setFormData({ ...formData, image: file });
    }


    const myStyle={
        display:"flex",
        flexDirection:"column",
        marginBottom:"1rem",
        marginRight:"0px"
    }

    const uploadArea = {
        textAlign:"center",
        marginBottom:"1rem",
        marginRight:"0px",
        border:"2px dotted #7a7affd2",
        padding:"1rem",
        cursor:"pointer",
        color: "blue",
        marginTop:"0.5rem",
    }


    return (
        <>
            <form className="universal-modal new-service-modal" onSubmit={handleSubmit}>
                <IoCloseOutline className="close-btn" size="2em" onClick={()=>setIsNewServiceModalOpened(false)}/>

                
                <h5 style={{textAlign:"center", marginBottom: '2.5em'}}>New Service Information</h5>


                <label htmlFor='serviceName' name="name" style={myStyle} value={formData.name} onChange={handleChange}>
                    <span>Name</span>
                    <input id='serviceName' name="name" type='text' placeholder='Service Name'  required></input>
                </label>




                <label style={myStyle} htmlFor='description' name='serviceDescription' placeholder='Service Description' value={formData.description} onChange={handleChange} >
                    <span>Description</span>
                    <textarea  name="description" id="description" style={{height:"7rem"}} required></textarea>
                </label>




                <label style={myStyle}>
                    <span>Service Image</span>

                    <div style={uploadArea}>
                        <input type="file" onChange={handleFileChange} id="myFile" name="myFile" className="upload-input" style={{borderStyle:"none"}}></input>
                    </div>
                    
                </label>

             



                <div style={{display:"flex", justifyContent:"center"}}>
                <Button variant="dark" size="sm" style={{width:"8rem"}} type="submit">Add Service</Button>
                </div>
                
            </form> 


            <div className="overlay"></div>
        </>
        
    )
}





export default AddNewServiceModal;

