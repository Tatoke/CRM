import React, { useState, useRef, useEffect } from 'react';
import './Services.css';
import ServiceImage from '../../components/ServiceImage/ServiceImage.jsx';
import ConfirmationDialog from '../../components/ConfirmationDialog/ConfirmationDialog.jsx'; 
import AddServiceDialog from '../../components/AddServiceDialog/AddServiceDialog.jsx';
import Button from 'react-bootstrap/Button';


const Service = ({ title, description, imgSrc, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const textareaRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const handleSave = () => {
    onEdit(editedDescription);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription(description);
  };

  const handleDelete = () => {
    setShowMenu(false);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(title);
    setShowConfirmation(false);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest('.service-box')) {
        setShowMenu(false);
        setIsEditing(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [showMenu, editedDescription]);

  return (
    <div className="service-box">
      <h4 className="service-title">{title}</h4>
      <div className="service-content">
        {isEditing ? (
          <div>
            <textarea
              ref={textareaRef}
              value={editedDescription}
              onChange={(e) => {
                setEditedDescription(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              style={{ minHeight: '200px', minWidth: '250px' }}
            />
            <div className="edit-buttons">
              <Button variant="dark" onClick={handleSave}>
                Save
              </Button>
              <Button variant="dark" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p>{editedDescription}</p>
            <ServiceImage imgSrc={imgSrc} alt={`${title} Image`} />
          </>
        )}
      </div>
      {showMenu && !isEditing && (
        <div className="menu">
          <Button variant="dark" onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="dark" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
      {showConfirmation && (
        <ConfirmationDialog
          message={`Delete "${title}" service?`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      <div className="dots" onClick={toggleMenu}>
        ...
      </div>
    </div>
  );
};

const Services = () => {
  const [services, setServices] = useState([
    { title: 'Web Development', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec fringilla metus. In hac habitasse platea dictumst. Sed at facilisis nulla. Nullam id consectetur ex. Sed hendrerit dapibus lacus, ac hendrerit dui ultrices non. Cras efficitur est a risus suscipit, eu laoreet libero auctor.' },
    { title: 'Digital Marketing', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec fringilla metus. In hac habitasse platea dictumst. Sed at facilisis nulla. Nullam id consectetur ex. Sed hendrerit dapibus lacus, ac hendrerit dui ultrices non. Cras efficitur est a risus suscipit, eu laoreet libero auctor.' },
    { title: 'Another Service', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec fringilla metus. In hac habitasse platea dictumst. Sed at facilisis nulla. Nullam id consectetur ex. Sed hendrerit dapibus lacus, ac hendrerit dui ultrices non. Cras efficitur est a risus suscipit, eu laoreet libero auctor.' },
    // Add more services here
  ]);
  const handleAddService = (newService) => {
    // Ensure the new service has a title
    if (!newService.title.trim()) {
      // Handle case where title is empty
      alert('Service title cannot be empty!');
      return;
    }
  
    // Create a new service object with title, description, and image
    const serviceToAdd = {
      title: newService.title,
      description: newService.description,
      imgSrc: newService.imgSrc ? URL.createObjectURL(newService.imgSrc) : null,
    };
  
    setServices((prevServices) => [...prevServices, serviceToAdd]);
  };
  

  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleEditService = (title, editedDescription) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.title === title ? { ...service, description: editedDescription } : service
      )
    );
  };

  const handleDeleteService = (title) => {
    setServices((prevServices) => {
      const updatedServices = prevServices.filter((service) => service.title !== title);
      return updatedServices;
    });
  };
  
  
    return (
    <div className="service-page">
      <h4 className="page-title">Services</h4>
      <section className="services-box">
        {services.map((service, index) => (
          <div key={index}>
            <Service
              title={service.title}
              description={service.description}
              onEdit={(editedDescription) =>
                handleEditService(service.title, editedDescription)
              }
              onDelete={() => handleDeleteService(service.title)}
            />
            {index < services.length - 1 && <hr className="service-divider" />}
          </div>
        ))}
      </section>
      <Button variant="dark" className="add-service" onClick={() => setShowAddDialog(true)}>
        Add Service
      </Button>

      {showAddDialog && (
        <AddServiceDialog
          onClose={() => setShowAddDialog(false)}
          onAddService={handleAddService}
        />
      )}
    </div>
  );
};

export default Services;