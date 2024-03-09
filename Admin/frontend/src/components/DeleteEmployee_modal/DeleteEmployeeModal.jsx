import React from 'react';
import Button from 'react-bootstrap/Button';
import './DeleteEmployeeModal.css';

function DeleteEmployeeModal({ show, onDelete, closeModal }) {
  const handleDelete = async () => {
    // Perform delete operation
    await onDelete();
    closeModal();
  };

  return (
    <>
      {show && (
        <div>
          <form className="universal-modal delete-employee-modal">
            <h6>Are you sure you want to delete this employee?</h6>

            <div className="delete-employee-buttons">
              <Button
                variant="outline-danger"
                size="sm"
                className="delete-employee-button"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="outline-dark"
                size="sm"
                className="delete-employee-button"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="overlay"></div>
        </div>
      )}
    </>
  );
}

export default DeleteEmployeeModal;
