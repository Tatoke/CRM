import {React, useEffect, useState} from 'react';
//import {Timeline, TimelineConnector,TimelineContent,TimelineDot,TimelineItem,TimelineOppositeContent,TimelineSeparator,} from "@mui/lab";
import { Typography } from "@mui/material";
import { FcIdea } from "react-icons/fc";
import TimelineCard from './TimelineCard'
import './OrderTimeline.css'
import Button from 'react-bootstrap/Button';

import { MDBContainer, MDBIcon } from "mdb-react-ui-kit";

//WHAT NEED FOR TIMELINE: list of all milestones for an order (select option)
//UPDATE + EMPLOYEE 


//orderId passed from OrderDetails page
function OrderTimeline({orderId, loggedInEmpId}){   
    let [isLoading, setIsLoading] = useState(true);


    let [timelineData, setTimelineData] = useState([]);
    let [optionSelected, setOptionSelected] = useState();   //track what option was selected in a form (to add an update or a milestone)
    let [milestones, setMilestones] = useState([]); //milestones for this particular order
    let [milestoneToAddToTimeline, setMilestoneToAddToTimeline] = useState();   //is a milestone id
    let [updateToAddToTimeline,setUpdateToAddToTimeline] = useState({
        title:'',
        description:'',
    });





    //0. Fetch all mielestones AND updates when page opens:
    useEffect(()=>{   //fetch updates for that orderId right in the beginning
        fetchTimelineData(); 
    }, [])


    function fetchTimelineData(){
        fetch(`http://localhost:3000/updates?orderId=${orderId}`)

        .then(response => {
            if (!response.ok) {
              throw new Error('Failed to fetch milestones');
            }
            return response.json(); // This returns a promise that resolves to the JSON data in the response body
          })

        .then((timelineData) =>{ //data will be a JavaScript
            setTimelineData(timelineData);
            setIsLoading(false);
            //console.log("Timeline data: " + timelineData);
           
        })

        .catch(error => console.error('Error fetching updates:', error));
    }

 



    //1. fetch all milestones for an order id (for select-option):
    async function fetchMilestones() {
        fetch(`http://localhost:3000/orders/${orderId}/milestones`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch milestones');
          }

          return response.json();
        })
        .then((milestones) => {
            setMilestones(milestones);
            //console.log('All milestones:', milestones);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
  

    useEffect(()=>{
          fetchMilestones();
          fetchTimelineData();
    }, [orderId]);


   


  



   
   



    //2. WHEN 'ADD' BUTTON CLICKED: Adding a milestone/update selected to timeline (need to make it active in db table)
    const [message, setMessage] = useState("");

    function handleClick(){  //one function for handling adding of milestone or adding of an update

        if (optionSelected == 'Milestone') {
            // Make the milestone active in the database = set activesince column 
            console.log('Milestone to add to timeline (frontend)' + milestoneToAddToTimeline);

            fetch(`http://localhost:3000/milestones/${milestoneToAddToTimeline}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ milestoneToMakeActive: milestoneToAddToTimeline }),
            })
            
             .then(() => {
                // Fetch the updated milestones after 
                fetchMilestones();
                fetchTimelineData();

              })
              .catch(error => {
                console.error('Error updating milestone status:', error);
                setMessage("Failed to add milestone to timeline.");
                    setTimeout(() => {
                    setMessage("");
                }, 2000);
              });



              setMessage("Milestone was added to timeline.");
                    setTimeout(() => {
                    setMessage("");
              }, 2000);
          } 
          
          
          
          


          else {
                // Add the update to the timeline
                fetch('http://localhost:3000/updates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ updateToAddToTimeline, loggedInEmpId, orderId}),
                })
                .then(() => {
                    // Reset the update fields
                    fetchTimelineData();
                })
                .catch(error => {
                    console.error('Error adding an update to timeline:', error);
                    setMessage("Failed to add update to timeline.");
                        setTimeout(() => {
                        setMessage("");
                    }, 2000);
                });



                setUpdateToAddToTimeline({ title: '', description: '' });

                setMessage("Update was added to timeline.");
                    setTimeout(() => {
                    setMessage("");
                }, 2000);
            }
    }











    useEffect(() => {
        if (timelineData.length === 0) {
          setOptionSelected('Milestone');
        }
    }, [timelineData]);








    return (
        <>
            <h5>Timeline</h5>
            <hr />

            {/* 1 PART: timeline */}
            {
                isLoading ? <p className="loading"  style={{marginTop:"5rem"}}></p> :
                (
                    timelineData.length!=0 ? (
                        <MDBContainer className=" scrollbar scrollbar-primary" style={{width:"110%", margin:"2.5rem", maxHeight: "600px"}}>
                            <ul className="timeline-with-icons">
                                {
                                    
                                    timelineData.map((updateData, index) =>{
                                        return <TimelineCard key={index} {...updateData}/>
                                    })
                                }
                            </ul>
                        </MDBContainer>

                    ) : null
                )
            }
                

{/* ============================================================================================== */}
            {/* 2 PART: update FORM */}
            <form className="order-update-form">
                {isLoading ? null :(
                    timelineData.length==0 ? (
                    <div style={{display:"flex", alignItems:"center", margin: "0 0 2rem 0"}}><FcIdea size={25}/><h6> &nbsp;&nbsp;Add your first milestone to the timeline to start logging updates.</h6></div> 
                    
                    

                    ) : null

                )}



                <div className="form-top">
                    <div>   
                        <label htmlFor="selectedOption" style={{fontWeight:"500"}}>Add: </label>

                            <select id="selectedOption" name="selectedOption" onChange={(e)=>setOptionSelected(e.target.value)} value={optionSelected}>
                                {timelineData.length!=0 ?(
                                     <>
                                        <option  value="Update">Update</option>
                                        <option  value="Milestone">Milestone</option>
                                    </>
                                )   : (
                                    <option  value="Milestone">Milestone</option>
                                )}

                               
                            </select>

                    </div>

                </div>

                

                <div  className="form-bottom">

                    {
                        optionSelected == 'Update' && timelineData.length!=0 ? (
                            <>
                                <input placeholder='Add Title...' onChange={(e)=>setUpdateToAddToTimeline({...updateToAddToTimeline, title: e.target.value })} value={updateToAddToTimeline.title}></input>
                                <textarea placeholder='Add details about a new update...' rows="5" onChange={(e)=>setUpdateToAddToTimeline({...updateToAddToTimeline, description: e.target.value })} value={updateToAddToTimeline.description}></textarea>
                            </>
                        
                        ) : (
                                //IF SELECTED OPTION IS: MILESTONE:
                                
                                <div style={{display: "flex", alignItems:"center"}}>
                                    
                                    <select name="milestoneSelected" onClick={(e)=>setMilestoneToAddToTimeline( e.target.value)} >
                                        {/* <option  value="" disabled >Select a milestone...</option> */}

                                        {
                                            milestones.map((milestone, index)=>{
                                                return <option  key={index} value={milestone.milestoneid}>{milestone.name}</option>
                                            })
                                        }
                                        
                                       
                                    </select>
                                </div>

                        )

                       
                    }
                    
                    <i>{message}</i>
                    <Button  variant="dark" size="sm" onClick={handleClick}>Add</Button>

                    
                </div>
            </form>




        </>
    )
}




export default  OrderTimeline;