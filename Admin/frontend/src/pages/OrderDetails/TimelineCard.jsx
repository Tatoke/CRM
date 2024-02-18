import {React} from 'react';
//import {TimelineConnector,TimelineContent,TimelineDot,TimelineItem,TimelineOppositeContent,TimelineSeparator,} from "@mui/lab";
import { Typography } from "@mui/material";

import { CiCircleCheck } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";


//if MILESTONE ->  {activesince, details:null, empid:null, fname:null, lname: null, id, name, type, ordermilestonenumber}
//if UPDATE -> {activesince, name, details, empid, fname, lname, type, ordermilestonenumber: null }
//type can be "update" OR "milestone"

//Milestones have only name, no details
//{activesince.substring(0,10)  + " at " + activesince.substring(11,16)}        

function TimelineCard ({id, type, name, details, empid, fname, lname, activesince , ordermilestonenumber}){  
    
  //console.log(name);



    return (
      <li className="timeline-item">
          <span className="timeline-icon">  <FaCheck size={20}/>  </span>
          
          
          
          <h6 style={type === "Milestone" ? { color: "#651fff" } : {}}>{name}</h6>
          <p className="text-muted mb-2 fw-bold">{ type=="Update" ? `by ${fname} ${lname} #${empid}` : "Milestone was started" }</p>
          <p className="text-muted"> {details}</p>


          <i className="update-date text-muted">{activesince.substring(0,10)  + " at " + activesince.substring(11,16)} </i>



          {type =="Update" ? <span className="label ">{type}  #{id}</span> : <span className="label" style={{backgroundColor:"#651fff"}}>{type}</span>}
          
      </li>
      

      
      )
  };






  export default TimelineCard;