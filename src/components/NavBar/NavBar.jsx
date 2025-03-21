import React, {useState} from 'react'; 
import {House, Cloud, TriangleAlert} from 'lucide-react'; 
import { Search, AlertTriangle, Grid } from 'lucide-react';

export const NavBar = ({changePage}) => {
    
 
    return (
        <div className="w-full bg-navy-blue border-b border-b-black">
        <div className="max-w-screen-2xl mx-auto flex items-center px-4 py-3">
          <div className="flex items-center">
            <button 
              className="cursor-pointer flex flex-col items-center justify-center gap-1 px-6 py-3 text-light-blue transition-colors duration-200 hover:text-white"
              onClick={() => changePage('home')}
            >
              <div className="text-2xl text-[#778DA9]"><Cloud size={24} /></div>
              <span className="text-sm font-light">Weather</span>
            </button>
            
            <button 
              className="cursor-pointer flex flex-col items-center justify-center gap-1 px-6 py-3 text-light-blue transition-colors duration-200 hover:text-white"
              onClick={() => changePage('weather')}
            >
              <div className="text-2xl text-[#778DA9]"><Grid size={24} /></div>
              <span className="text-sm font-light">Overview</span>
            </button>

            
            <button 
              className="cursor-pointer flex flex-col items-center justify-center gap-1 px-6 py-3 text-light-blue transition-colors duration-200 hover:text-white"
              onClick={() => changePage('alerts')}
            >
              <div className="text-2xl text-[#778DA9]"><AlertTriangle size={24} /></div>
              <span className="text-sm font-light">Alerts</span>
            </button>
            
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-light-blue/70" />
              </div>
              <input
                type="text"
                placeholder="Search location...."
                className="w-full bg-navy-blue/40 border border-light-blue/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-light-blue/70 focus:outline-none focus:ring-1 focus:ring-light-blue/30"
              />
            </div>
          </div>
          
          <div className="w-[180px]"></div>
        </div>
      </div>
    ); 
}