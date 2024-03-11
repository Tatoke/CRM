import './DeleteProfileModal.css'
import {React, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import { IoCloseOutline } from "react-icons/io5";

import { useNavigate } from 'react-router-dom'; //redirect to another page



function DeleteProfileModal({ show, onDelete, closeModal }){
        const handleDelete = async () => {
          // Perform delete operation
          await onDelete();
        };

        return (
          <>
            {show && (
              <div>
                <form className="universal-modal delete-order-modal">
                  <h6>Are you sure you want to delete this profile?</h6>
      
                  <div className="delete-order-buttons">
                            <Button  variant="outline-danger" size="sm" className="delete-order-button" type="submit" onClick={handleDelete}>Delete</Button>
                            <Button  variant="outline-dark" size="sm"  className="delete-order-button" onClick={closeModal}>Cancel</Button>
                  </div>
                </form>
              </div>
            )}
          </>
        );
      }

export default DeleteProfileModal;
