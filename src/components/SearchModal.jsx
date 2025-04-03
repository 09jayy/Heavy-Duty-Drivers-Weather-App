import React from 'react';
import { useState } from 'react';
import { X } from 'lucide-react';
import './SearchModal.css';

/**
 * search modal to be opened, to be overlayed on top of document body to be infocus
 */
export const SearchModal = ({onClose, onSubmit}) => {
    const [userLocation, setUserLocation] = useState(''); 

    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            event.preventDefault(); 
            onSubmit(userLocation); 
            onClose(); 
        }
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h3>Add Location</h3>
                    <button 
                        onClick={onClose}
                        className='close-button'
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className='modal-body'>
                    <input 
                        value={userLocation} 
                        onChange={(e) => setUserLocation(e.target.value)} 
                        placeholder='Enter city name...'
                        onKeyDown={handleKeyDown}
                        className='location-input'
                        autoFocus
                    />
                </div>
                <div className='modal-footer'>
                    <button 
                        onClick={()=> {onClose()}}
                        className='cancel-button'
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={()=> {onSubmit(userLocation); onClose();}}
                        className='add-button'
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}
