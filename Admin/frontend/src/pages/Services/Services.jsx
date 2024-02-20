import './Services.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';

import ServiceCard from "../../components/ServiceCard/ServiceCard";
import AddNewServiceModal from './AddNewServiceModal';






function Services(){
    let [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [isNewServiceModalOpened, setIsNewServiceModalOpened] = useState(false);



    useEffect(()=>{
        async function fetchServicesData(){
            try{
                const response = await fetch(`http://localhost:3000/services`); 
                const data = await response.json();
                console.log(data);

                setServices(data);
            } catch(err){
                console.error('Error fetching services:', err); 
            }

            setIsLoading(false);
        }

        fetchServicesData();
    }, [])









    return (
        <div className="page-layout">
              <div className='title-section'>
                <h4>Services</h4>
                <Button  variant="dark" size="sm" onClick={()=>{setIsNewServiceModalOpened(true)}}>New Service</Button>
            </div>




            <div className='service-list'>
                {isLoading ? <div className="loading" style={{marginTop:"5rem"}}></div> : (
                    services.map((service, index)=>{
                        return <ServiceCard key={service.serviceid} {...service} index={index}/>
                    })

                )}
                
                   
                

            </div>



            {isNewServiceModalOpened ? <AddNewServiceModal setIsNewServiceModalOpened={setIsNewServiceModalOpened}/> : null}
        </div>

    )
       
}




export default Services;


