import React, {useState} from 'react'; 
import {House, CloudSun, TriangleAlert} from 'lucide-react'; 
import './NavBar.css'; 

export const NavBar = ({changePage, setSearchedCity}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // stop form from reloading the page
    if (searchInput.trim()) {
      setSearchedCity(searchInput.trim()); // send city to App state
      changePage('weather'); // go to Weather page
    }
  };
 
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