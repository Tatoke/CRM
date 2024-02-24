import React from 'react';
import Button from 'react-bootstrap/Button';
import './DeleteTransactionModal.css';

function DeleteTransactionModal({ show, onDelete, closeModal }) {
  const handleDelete = async () => {
    // Perform delete operation
    await onDelete();
    closeModal();
  };

  return (
    <>
      {show && (
        <div>
          <form className="universal-modal delete-transaction-modal">
            <h6>Are you sure you want to delete this transaction?</h6>

            <div className="delete-transaction-buttons">
              <Button
                variant="outline-danger"
                size="sm"
                className="delete-transaction-button"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <Button
                variant="outline-dark"
                size="sm"
                className="delete-transaction-button"
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

export default DeleteTransactionModal;
