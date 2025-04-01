import React from 'react';
import {createPortal} from 'react-dom'; 
import { X } from 'lucide-react'; 

/**
 * 
 * @param {Object} props - component props
 * @param {string} message - messge to be contained within the error message 
 * @returns {React.JSX.element} 
 */
export const ErrorPopup = ({ message, handleClose }) => {
    return createPortal(
    <div
        style={{
            position: "fixed",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontWeight: "bold",
            zIndex: 9999,
        }}
    >
        {message}
        <X  onClick={handleClose} style={{ cursor: 'pointer' }}/>
    </div>,
    document.body
    );
};