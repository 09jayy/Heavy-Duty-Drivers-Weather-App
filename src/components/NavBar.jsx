import React, {useState} from 'react'; 
import {House, CloudSun, TriangleAlert} from 'lucide-react'; 

export const NavBar = () => {
    /** @type {'home' | 'weather' | 'alerts'} */
    const [curPage, setCurPage] = useState('home'); 

    return (
        <div>
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