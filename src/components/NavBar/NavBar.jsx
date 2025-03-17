import React, {useState} from 'react'; 
import {House, CloudSun, TriangleAlert} from 'lucide-react'; 
import './NavBar.css'; 

export const NavBar = ({changePage}) => {
    return (
        <div className='navbar-container'>
            <button className='navbar-btn' onClick={()=>changePage('home')}>
                <House className='navbar-icon'/>
            </button>

            <button className='navbar-btn' onClick={()=>changePage('weather')}>
                <CloudSun className='navbar-icon'/>
            </button>

            <button className='navbar-btn' onClick={()=>changePage('alerts')}>
                <TriangleAlert className='navbar-icon'/>
            </button>
        </div>
    ); 
}