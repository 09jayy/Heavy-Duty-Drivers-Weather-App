import React from 'react'; 
import './SearchModal.css'

export const SearchModal = ({onClose}) => {
    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button onClick={onClose}>X</button>
                Search Modal
                <input/>
                <button onClick={onClose}>Add</button>
            </div>
        </div>
    )
}