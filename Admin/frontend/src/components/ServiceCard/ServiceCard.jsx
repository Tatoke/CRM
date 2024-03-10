import './ServiceCard.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import DeleteServiceModal from "../DeleteService_modal/DeleteServiceModal";






function ServiceCard({serviceid, name, image, description, createdat, index}){
    const [deleteModalIsOpened, setDeleteModalIsOpened] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedServiceData, setEditedServiceData] = useState({
        image: image,
        name: name,
        description: description
    });




    //SAVE NEW INFO ABOUT THE SERVICE:
    function handleSaveClick(e){
        //e.preventDefault();
        //console.log(editedServiceData);

        // Logic to save edited service (e.g., send data to backend)
        fetch(`http://localhost:3000/services/${serviceid}`, {
            method: 'PATCH', //partial update
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedServiceData),
        })
        .then(response => {
            if (!response.ok) {
            throw new Error('Failed to edit service');
            }
            console.log('Service edited successfully');
            
        })
        .catch(error => {
            console.error('Error editing service:', error);
        });


        window.location.reload();
        
    }







    return (
        <div className="box service-card">  
        {
            editMode ? (
                <>
                     <span className='service-card-id'>#{index+1}</span>
                        
                        <img src={image}></img>

                        <div>
                            <label htmlFor="serviceName" className="service-edit-label">Service Name</label>
                            <input type="text" id="serviceName" name="name" style={{ width:"100%"}} value={editedServiceData.name}  onChange={(e)=> setEditedServiceData({...editedServiceData, name: e.target.value})} required/>
                            <br></br>
                            <br></br>
                            <br></br>

                            <label htmlFor="serviceDescription" className="service-edit-label">Service Description</label>
                            <textarea id="serviceDescription" name="description" style={{height:"10rem", width:"100%"}} value={editedServiceData.description}  onChange={(e)=> setEditedServiceData({...editedServiceData, description: e.target.value})} required/>
                        </div>



                        <div style={{marginTop:"1.5rem", textAlign:"center"}}>
                            <Button variant="outline-dark" size="sm" onClick={handleSaveClick}>Save</Button>
                            <Button variant="outline-dark" size="sm" onClick={()=>setEditMode(false)}>Cancel</Button>
                        </div>
                </>

            ) : (
                    <>
                        <span className='service-card-id'>#{index+1}</span>
                        
                        <img src={image}></img>

                        <div>
                            <h6 style={{textAlign:"center"}}>{name}</h6>
                            <br></br>
                            <p>{description}</p>
                        </div>
                    

                        <div style={{marginTop:"1.5rem", textAlign:"center"}}>
                            <Button variant="outline-dark" size="sm" onClick={()=>setEditMode(true)}>Edit</Button>
                            <Button variant="outline-dark" size="sm" onClick={()=>setDeleteModalIsOpened(true)}>Delete</Button>
                        </div>
                    </>
            )
        }
            



        {deleteModalIsOpened ? <DeleteServiceModal serviceid={serviceid} setDeleteModalIsOpened={setDeleteModalIsOpened} name={name}/> :null}
        </div>
    )
}




export default ServiceCard;




