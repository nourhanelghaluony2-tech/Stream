
import React from 'react';
import { AppPages } from '../types';

interface HomePageProps {
  onPageChange: (page: AppPages) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 blur-[120px] rounded-full -z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full -z-10"></div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 max-w-4xl leading-tight">
          Turn Any Text into <span className="gradient-text">Viral Videos</span> Instantly
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl">
          Automate your content creation with AI. From cinematic horror shorts to high-quality ads, 
          we handle everything from script to export.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => onPageChange(AppPages.TEXT_TO_VIDEO)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            Start Generating Free
          </button>
          <button className="glass hover:bg-white/5 px-8 py-4 rounded-xl text-lg font-bold transition-all">
            Watch Demo
          </button>
        </div>

        <div className="mt-20 flex gap-8 items-center text-gray-500 text-sm">
          <span>Supported Languages: English, Arabic, Spanish +20 more</span>
          <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
          <span>4K Resolution Export</span>
          <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
          <span>Viral Social Templates</span>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful AI Tools for Creators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            title="Text to Video"
            description="Input a prompt and get a fully edited video with AI narration and stock footage."
            icon="🎬"
            onClick={() => onPageChange(AppPages.TEXT_TO_VIDEO)}
          />
          <FeatureCard 
            title="Horror Automation"
            description="Create spine-chilling viral horror shorts with dark themes and jumpscares."
            icon="🧟"
            highlight
            onClick={() => onPageChange(AppPages.HORROR_SHORTS)}
          />
          <FeatureCard 
            title="Watermark Remover"
            description="Clean your media from distracting watermarks with pixel-perfect AI healing."
            icon="🧼"
            onClick={() => onPageChange(AppPages.WATERMARK_REMOVER)}
          />
          <FeatureCard 
            title="4K Enhancement"
            description="Upscale low-res videos to 4K. Remove noise and fix colors automatically."
            icon="🚀"
            onClick={() => onPageChange(AppPages.ENHANCE_QUALITY)}
          />
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white/5 border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Step number="1" title="Write Your Idea" description="Type a simple prompt or full story in Arabic or English." />
            <Step number="2" title="Select Style" description="Choose from cinematic, horror, educational or advertising styles." />
            <Step number="3" title="AI Magic" description="Our AI generates scenes, images, voiceover, and subs in seconds." />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string; description: string; icon: string; onClick: () => void; highlight?: boolean }> = ({ title, description, icon, onClick, highlight }) => (
  <div 
    onClick={onClick}
    className={`p-8 rounded-2xl glass hover:border-purple-500/50 transition-all cursor-pointer group relative ${highlight ? 'border-purple-500/30 ring-1 ring-purple-500/20' : ''}`}
  >
    {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">Most Popular</div>}
    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const Step: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-full flex items-center justify-center text-xl font-bold mb-6">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

export default HomePage;
