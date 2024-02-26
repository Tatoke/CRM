import React, { useState } from "react";
import "./Profile.css";
import { RxAvatar } from "react-icons/rx";
import { PiNotePencilBold } from "react-icons/pi";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom'; 
import { useEffect } from "react";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteProfileModal from '../../components/DeleteProfile_modal/DeleteProfileModal.jsx';


const ProfileField = ({ label, value, onChange, editable }) => (
  <div className="field">
    <h6>{label}</h6>
    {editable ? ( <input onChange={ onChange } value={ value } /> ) : ( <span>{ value }</span> )}
  </div>
);

const ProfileTextArea = ({ label, value, onChange, editable }) => (
  <div className="field">
    <h6>{label}</h6>
    {editable ? (
      <textarea
        onChange={onChange}
        value={value}
        style={{ width: "87vw", maxHeight: "4.5rem", resize: "none", overflow: "hidden" }}
        rows={Math.max(value.split('\n').length, 1)} // Adjust height based on content
      ></textarea>
    ) : (
      <span>{value}</span>
    )}
  </div>
);


function Profile(props) {

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    primaryemail: "",
    primarycellphone: "",
    city: "",
    region: ""
  });

  const [companyInfo, setCompanyInfo] = useState({
    companyname: "",
    companyemail: "",
    companycellphone: "",
    companylocation: "",
    websiteurl: "",
    companydescription: ""
  });

  let [isDeleteProfileModalOpened, setIsDeleteProfileModalOpened] = useState(false);

  const [responseData, setResponseData] = React.useState(null); //data that is returned back from database
  //INGA'S NOTE FOR JUSTIN:--------------------------
  const { userType, userId } = useParams(); //userType can be either a 'client' or 'employee'. According to this info -> extract data from specified table according to the userId
  //use useEffect() React hook in this component to make a request to backend.
  //will have to use if-else to parse appropriate endpoint (either one to parse client table or to parse employee table)
  //use conditional rendering: if user if Employee => dont show company and list of orders.
  //-------------------------------------------------
  useEffect(()=>{
    async function fetchProfileData(){
      try {
        const response = await fetch(`http://localhost:3000/${userType}/${userId}`);
        const data = await response.json();
        if (userType === "employees") {
          setPersonalInfo({
            ...personalInfo,
            fullName: data[0].fname + " " + (data[0].mname ? " " + data[0].mname : "") + " " + data[0].lname, // Update fullName with the fetched data
            primaryemail: data[0].email,
            primarycellphone: data[0].phone,
            city: data[0].city,
            region: data[0].province
          });
        } else {
          setPersonalInfo({
            ...personalInfo,
            fullName: data.fname + " " + (data.mname ? " " + data.mname : "") + " " + data.lname, // Update fullName with the fetched data
            primaryemail: data.email,
            primarycellphone: data.phone,
            city: data.city,
            region: data.province
          });
          const response = await fetch(`http://localhost:3000/${userType}/${userId}`);
        }
      } catch (err){
        console.error(`Error fetching statuses:`, err)
      }
    }
    fetchProfileData();
  }, [userId])



  const [editablePersonal, setEditablePersonal] = useState(false);

  const toggleEditablePersonal = () => {
    setEditablePersonal(!editablePersonal);
  };

  const handlePersonalInputChange = (event, field) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: event.target.value
    });
  };

  const [editableCompany, setEditableCompany] = useState(false);

  const toggleEditableCompany = () => {
    setEditableCompany(!editableCompany);
  };

  const handleCompanyInputChange = (event, field) => {
    setCompanyInfo({
      ...companyInfo,
      [field]: event.target.value
    });
  };

  return (
  <>
 

    <div className="container">
      <div className="profile">
      { userType === "clients" ? (
        <h4>Client / Profile Details</h4>
      ) : (
        <h4>Employee / Profile Details</h4>
      )}
        <div className="profile-info-header">
            <div className="profile-info-header-container">
              <div className="profile-picture">
                <RxAvatar />
              </div>
              <div className="profile-info-header-content">
                <h5>{personalInfo.fullName}</h5>
                <h5>{personalInfo.primaryemail}</h5>
              </div>
            </div>
            <Button className="deletebutton" onClick={()=>{setIsDeleteProfileModalOpened(true)}} variant="outline-dark" size="sm">
            <h6>Delete Client</h6>
            </Button>
            {isDeleteProfileModalOpened ? <DeleteProfileModal userType={userType} userId={userId} setIsDeleteProfileModalOpened={setIsDeleteProfileModalOpened}/> :null}
        </div>
      </div>

      <div className="profile-info-content">
        <div className="profile-info-content-field">
          <div className="profile-info-content-field-row">
            <ProfileField
              label="Full Name"
              value={personalInfo.fullName}
              onChange={(e) => handlePersonalInputChange(e, "fullName")}
              editable={editablePersonal}
            />
            <ProfileField
              label="Primary Email"
              value={personalInfo.primaryemail}
              onChange={(e) => handlePersonalInputChange(e, "primaryemail")}
              editable={editablePersonal}
            />
            <ProfileField
              label="Primary Cellphone"
              value={personalInfo.primarycellphone}
              onChange={(e) => handlePersonalInputChange(e, "primarycellphone")}
              editable={editablePersonal}
            />
          </div>
          <div className="profile-info-content-field-row">
            <ProfileField
              label="City"
              value={personalInfo.city}
              onChange={(e) => handlePersonalInputChange(e, "city")}
              editable={editablePersonal}
            />
            <ProfileField
              label="Region"
              value={personalInfo.region}
              onChange={(e) => handlePersonalInputChange(e, "region")}
              editable={editablePersonal}
            />
          </div>
        </div>

        <div className="editbutton">
          <PiNotePencilBold onClick={toggleEditablePersonal} />
        </div>
      </div>
      
      { userType === "clients" ? (
        <div>
          <h4>Company</h4>
          <div className="company-info-content">
            <div className="profile-info-content-1">
              <div className="profile-info-content-field">
                <div className="profile-info-content-field-row">
                  <ProfileField
                      label="Company Name"
                      value={companyInfo.companyname}
                      onChange={(e) => handleCompanyInputChange(e, "companyname")}
                      editable={editableCompany}
                  />
                  <ProfileField
                      label="Company Email"
                      value={companyInfo.companyemail}
                      onChange={(e) => handleCompanyInputChange(e, "companyemail")}
                      editable={editableCompany}
                  />
                  <ProfileField
                      label="Company Cellphone"
                      value={companyInfo.companycellphone}
                      onChange={(e) => handleCompanyInputChange(e, "companycellphone")}
                      editable={editableCompany}
                  />
                </div>
                <div className="profile-info-content-field-row">
                <ProfileField
                    label="Company Location"
                    value={companyInfo.companylocation}
                    onChange={(e) => handleCompanyInputChange(e, "companylocation")}
                    editable={editableCompany}
                />
                <ProfileField
                    label="Website URL"
                    value={companyInfo.websiteurl}
                    onChange={(e) => handleCompanyInputChange(e, "websiteurl")}
                    editable={editableCompany}
                />
                </div>
              </div>
    
              <div className="editbutton">
                <PiNotePencilBold onClick={toggleEditableCompany} />
              </div>
            </div>
            <div className="company-info-content-field-row">
              <ProfileTextArea
                      label="Company Description"
                      value={companyInfo.companydescription}
                      onChange={(e) => handleCompanyInputChange(e, "companydescription")}
                      editable={editableCompany}
                  />
            </div>
          </div>

          <h4>Order Details</h4>
          <TableContainer component={Paper} className='clients-table'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table"> 
                    <TableHead>
                        <TableRow>
                            <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Order ID</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Service Type</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Status</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Updates</TableCell>
                        </TableRow>
                    </TableHead>


                 { responseData &&
                    <TableBody>
                        {responseData.map((row, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row"  className="link-cell">{row.fname + " "+ row.lname}</TableCell>
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
      ) : null}
    
      <h4>Security</h4>
      <div className="security-info-content">
        <div className="security-info-content-text">
          <h6>Password</h6>
          <h6>Last changed 2 days ago</h6>
        </div>
        <Button className="passwordbutton" onClick={console.log("Hello")} variant="dark" size="sm">
            <h6>Change Password</h6>
        </Button>
      </div>
    </div>
  </>
  );
}

export default Profile;
