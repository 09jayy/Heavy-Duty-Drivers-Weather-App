import React, {useState} from 'react'; 
import {House, CloudSun, TriangleAlert} from 'lucide-react'; 
import './NavBar.css'; 

export const NavBar = ({changePage}) => {
    return (
        <div className='navbar-container'>
            <button onClick={()=>changePage('home')}>
                <House/>
            </button>

            <button onClick={()=>changePage('weather')}>
                <CloudSun/>
            </button>

            <button onClick={()=>changePage('alerts')}>
                <TriangleAlert/>
            </button>
        </div>
    ); 
}