import React, {useState} from 'react'; 
import {House, CloudSun, TriangleAlert} from 'lucide-react'; 

export const NavBar = () => {
    /** @type {'home' | 'weather' | 'alerts'} */
    const [curPage, setCurPage] = useState('home'); 

    return (
        <div className="py-8 bg-gradient-to-r from-[#1B263B] to-[#273B54] shadow-lg">
            <button onClick={()=>setCurPage('home')}>
                <House/>
            </button>

            <button onClick={()=>setCurPage('weather')}>
                <CloudSun/>
            </button>

            <button onClick={()=>setCurPage('alerts')}>
                <TriangleAlert/>
            </button>
        </div>
    ); 
}