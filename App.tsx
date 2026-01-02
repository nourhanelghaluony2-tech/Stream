
import React, { useState } from 'react';
import { AppPages } from './types';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import VideoGenerator from './pages/VideoGenerator';
import HorrorShorts from './pages/HorrorShorts';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppPages>(AppPages.HOME);

  const renderPage = () => {
    switch (currentPage) {
      case AppPages.HOME:
        return <HomePage onPageChange={setCurrentPage} />;
      case AppPages.TEXT_TO_VIDEO:
        return <VideoGenerator />;
      case AppPages.HORROR_SHORTS:
        return <HorrorShorts />;
      case AppPages.WATERMARK_REMOVER:
        return <ToolPlaceholder title="Watermark Remover" icon="🧼" desc="Upload your video or image to remove watermarks automatically using AI healing tech." />;
      case AppPages.ENHANCE_QUALITY:
        return <ToolPlaceholder title="AI Quality Enhancer" icon="🚀" desc="Upscale your media up to 4K. Noise reduction and sharpening included." />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activePage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <footer className="border-t border-white/5 py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold gradient-text">ViraStream AI</div>
          <div className="text-gray-500 text-sm">© 2024 ViraStream. All rights reserved. Arabic & English Supported.</div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">API</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ToolPlaceholder: React.FC<{ title: string; icon: string; desc: string }> = ({ title, icon, desc }) => (
  <div className="pt-32 px-6 max-w-4xl mx-auto text-center h-[70vh] flex flex-col justify-center items-center">
    <div className="text-6xl mb-6">{icon}</div>
    <h1 className="text-4xl font-bold mb-4">{title}</h1>
    <p className="text-gray-400 mb-8 max-w-lg">{desc}</p>
    <div className="glass p-12 rounded-3xl border-dashed border-2 border-white/20 w-full max-w-2xl cursor-pointer hover:bg-white/5 transition-all">
      <div className="text-3xl mb-4">📤</div>
      <p className="font-bold">Drag and Drop File Here</p>
      <p className="text-sm text-gray-500 mt-2">Supports MP4, MOV, PNG, JPG (Max 500MB)</p>
      <input type="file" className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="mt-6 inline-block bg-purple-600 px-6 py-2 rounded-lg font-bold cursor-pointer">Select File</label>
    </div>
  </div>
);

export default App;
