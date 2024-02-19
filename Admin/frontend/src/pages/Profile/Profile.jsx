import React, { useState } from "react";
import "./Profile.css";
import { RxAvatar } from "react-icons/rx";
import { PiNotePencilBold } from "react-icons/pi";
import Button from "react-bootstrap/Button";
import { useParams } from 'react-router-dom'; 
import { useEffect } from "react";



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
        rows={10}
        cols={241}
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

  //INGA'S NOTE FOR JUSTIN:--------------------------
  const { userId } = useParams(); //userType can be either a 'client' or 'employee'. According to this info -> extract data from specified table according to the userId
  //use useEffect() React hook in this component to make a request to backend.
  //will have to use if-else to parse appropriate endpoint (either one to parse client table or to parse employee table)
  //use conditional rendering: if user if Employee => dont show company and list of orders.
  //-------------------------------------------------
  useEffect(()=>{
    async function fetchProfileData(){
      try {
        const response = await fetch(`http://localhost:3000/employees/${userId}`);
        const data = await response.json();
        console.log(data)
        setPersonalInfo({
          ...personalInfo,
          fullName: data[0].fname + " " + (data[0].mname ? " " + data[0].mname : "") + " " + data[0].lname, // Update fullName with the fetched data
          primaryemail: data[0].email,
          primarycellphone: data[0].phone,
          city: data[0].city,
          region: data[0].province
        });

        setCompanyInfo
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

  const deleteModal = () => {
    // Displaying a simple alert message
    alert("Modal will open to delete a client.");
  };

  const passwordModal = () => {
    // Displaying a simple alert message
    alert("Modal will open to change password.");
  };

  return (
  <>
 

    <div className="container">
      <div className="profile">
      <h5>Profile</h5>
        <div className="profile-info-header">
            <div className="profile-info-header-container">
              <div className="profile-picture">
                <RxAvatar />
              </div>
              <div className="profile-info-header-content">
                <h6>{personalInfo.fullName}</h6>
                <h6>{personalInfo.primaryemail}</h6>
              </div>
            </div>
            <Button className="deletebutton" onClick={deleteModal} variant="dark" size="sm">
            <h7>Delete Client</h7>
            </Button>
        </div>
      </div>

      <div className="profile-info-content">
        <div className="profile-info-content-field">
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

        <div className="editbutton">
          <PiNotePencilBold onClick={toggleEditablePersonal} />
        </div>
      </div>
      

      <h5>Company</h5>
      <div className="profile-info-content2">
        <div className="profile-info-content-1">
          <div className="profile-info-content-field">
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

          <div className="editbutton">
            <PiNotePencilBold onClick={toggleEditableCompany} />
          </div>
        </div>
        <ProfileTextArea
                label="Company Description"
                value={companyInfo.companydescription}
                onChange={(e) => handleCompanyInputChange(e, "companydescription")}
                editable={editableCompany}
            />
      </div>

      <h5>Security</h5>
      <div className="profile-info-content3">
        <div className="security-info">
          <h6>Password</h6>
          <h7>Last changed 2 days ago</h7>
        </div>
        <Button className="passwordbutton" onClick={passwordModal} variant="outline-dark" size="sm">
            <h7>Change Password</h7>
        </Button>
      </div>
    </div>
  </>
  );
}

export default Profile;
