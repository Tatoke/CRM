import React, { useState } from "react";
import "./Profile.css";
import { RxAvatar } from "react-icons/rx";
import { PiNotePencilBold } from "react-icons/pi";
import Button from "react-bootstrap/Button";

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

function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Swarowski",
    primaryemail: "Johnswarowski@gmail.com",
    primarycellphone: "",
    location: "",
    countryregion: ""
  });

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

  const [companyInfo, setCompanyInfo] = useState({
    companyname: "",
    companyemail: "",
    companycellphone: "",
    companylocation: "",
    websiteurl: "",
    companydescription: ""
  });

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

  const openModal = () => {
    // Displaying a simple alert message
    alert("Modal will open to add a client.");
  };

  return (
  <>
    <div className="container">
      <div className="profile">
      <h4>Profile</h4>
        <div className="profile-info-header">
            <div className="profile-picture">
              <RxAvatar />
            </div>
            <div className="profile-info-header-content">
              <h4>{personalInfo.fullName}</h4>
              <h5>{personalInfo.primaryemail}</h5>
            </div>
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
            label="Location"
            value={personalInfo.location}
            onChange={(e) => handlePersonalInputChange(e, "location")}
            editable={editablePersonal}
          />
          <ProfileField
            label="Country/Region"
            value={personalInfo.countryregion}
            onChange={(e) => handlePersonalInputChange(e, "countryregion")}
            editable={editablePersonal}
          />
        </div>

        <div className="editbutton">
          <PiNotePencilBold onClick={toggleEditablePersonal} />
        </div>
      </div>
      

      <h4>Company</h4>
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

      <h4>Security</h4>
      <div className="profile-info-content3">
        <div className="security-info">
          <h6>Password</h6>
          <p>Last changed 2 days ago</p>
        </div>
        <Button onClick={openModal} variant="outline-dark" size="sm">
            Change Password
        </Button>
      </div>
    </div>
  </>
  );
}

export default Profile;
