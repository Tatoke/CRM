import React, { useState } from 'react';
import './AddServiceDialog.css';
import ServiceImage from '../ServiceImage/ServiceImage.jsx';

const AddServiceDialog = ({ onClose, onAddService }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); 

  const handleAddService = () => {
    // Validate that the title is not empty
    if (!title.trim()) {
      alert('Service title cannot be empty!');
      return;
    }
  
    // Pass the new service to the callback
    onAddService({ title, description, imgSrc: image });
  
    // Close the dialog
    onClose();
  };
  

  return (
    <div className="add-service-dialog">
      <h2>Add a New Service</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <label>Image:</label>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      {image && <ServiceImage imgSrc={URL.createObjectURL(image)} alt="Selected Image" />}
      <button onClick={handleAddService}>Add Service</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddServiceDialog;
