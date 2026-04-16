import React from "react";
import { BiTrash, BiX } from "react-icons/bi";
import { createPortal } from "react-dom";

const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion", 
  message = "Are you sure you want to delete this item? This action cannot be undone." 
}) => {
  if (!isOpen) return null;

  // Render to portal to avoid z-index or stacking context issues
  return createPortal(
    <div className="admin-confirm-overlay">
      <div className="admin-confirm-modal animate-fade-in">
        <div className="confirm-icon-box">
          <BiTrash size={24} />
        </div>
        
        <button className="confirm-close-btn" onClick={onClose}>
          <BiX size={24} />
        </button>

        <div className="confirm-content text-center">
          <h3>{title}</h3>
          <p>{message}</p>
        </div>

        <div className="confirm-actions d-flex gap-3 mt-4">
          <button className="btn btn-light flex-grow-1 rounded-pill" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-danger flex-grow-1 rounded-pill" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmationModal;
