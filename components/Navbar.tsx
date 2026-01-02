
import React from 'react';
import { AppPages } from '../types';

interface NavbarProps {
  activePage: AppPages;
  onPageChange: (page: AppPages) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onPageChange }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4 flex justify-between items-center">
      <div 
        className="text-2xl font-bold gradient-text cursor-pointer flex items-center gap-2"
        onClick={() => onPageChange(AppPages.HOME)}
      >
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white text-sm">V</div>
        ViraStream AI
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-semibold">
        {[
          { id: AppPages.TEXT_TO_VIDEO, label: 'Text to Video' },
          { id: AppPages.HORROR_SHORTS, label: 'Horror Automation' },
          { id: AppPages.WATERMARK_REMOVER, label: 'Watermark' },
          { id: AppPages.ENHANCE_QUALITY, label: 'Enhance' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`${activePage === item.id ? 'text-purple-400' : 'text-gray-400 hover:text-white'} transition-colors`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex gap-4 items-center">
        <button 
          onClick={() => onPageChange(AppPages.DASHBOARD)}
          className="text-sm text-gray-400 hover:text-white"
        >
          Dashboard
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105">
          Join Pro
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
