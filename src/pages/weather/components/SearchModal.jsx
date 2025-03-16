import React from 'react';
import { useState } from 'react';
import './SearchModal.css';

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
                <button onClick={onClose}>X</button>
                Search Modal
                <input 
                    value={userLocation} 
                    onChange={(e) => setUserLocation(e.target.value)} 
                    placeholder={'City...'}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={()=> {onClose(); onSubmit(userLocation); }}>Add</button>
            </div>
        </div>
    )
}