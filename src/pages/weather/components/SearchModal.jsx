import React from 'react';
import { useState } from 'react';
import './SearchModal.css';

export const SearchModal = ({onClose, onSubmit}) => {

    const [userLocation, setUserLocation] = useState(''); 

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button onClick={onClose}>X</button>
                Search Modal
                <input value={userLocation} onChange={(e) => setUserLocation(e.target.value)} placeholder={'City...'}/>
                <button onClick={()=> {onClose(); onSubmit(userLocation); }}>Add</button>
            </div>
        </div>
    )
}