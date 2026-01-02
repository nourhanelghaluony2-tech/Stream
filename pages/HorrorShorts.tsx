
import React, { useState } from 'react';
import { generateStoryScript, generateVideoContent } from '../services/geminiService';

const HorrorShorts: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [scareLevel, setScareLevel] = useState<'mild' | 'intense' | 'extreme'>('intense');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const startAutomation = async () => {
    if (!topic) return;
    setIsLoading(true);
    setVideoUrl(null);
    try {
      setStatus('Summoning a dark narrative...');
      const prompt = `Write a terrifying, viral horror short story about: ${topic}. Scare level: ${scareLevel}. Focus on suspense and a shock ending.`;
      const scriptData = await generateStoryScript(prompt, 'horror');
      
      setStatus('Generating eerie visuals & dark atmosphere...');
      const generated = await generateVideoContent(scriptData.script, '9:16');
      
      setVideoUrl(generated);
      setStatus('Horror masterpiece ready.');
    } catch (e) {
      setStatus('Darkness failed to manifest. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
          <span className="text-red-500">🧟</span> Viral Horror Automation
        </h1>
        <p className="text-gray-400">Zero-effort viral content for TikTok and YouTube Shorts.</p>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 mb-10">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-red-400 mb-2 uppercase tracking-widest">Story Concept</label>
            <input 
              type="text" 
              className="w-full bg-black/40 border border-red-500/30 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="e.g. A haunted mirror, mysterious footprints in the snow..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['mild', 'intense', 'extreme'] as const).map(level => (
              <button
                key={level}
                onClick={() => setScareLevel(level)}
                className={`py-3 rounded-xl border font-bold capitalize transition-all ${scareLevel === level ? 'bg-red-600 border-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'border-red-900/30 hover:bg-red-500/10'}`}
              >
                {level} Level
              </button>
            ))}
          </div>

          <button
            onClick={startAutomation}
            disabled={isLoading || !topic}
            className={`w-full py-5 rounded-xl text-xl font-black transition-all ${isLoading ? 'bg-gray-800 cursor-not-allowed' : 'bg-red-700 hover:bg-red-800 animate-pulse'}`}
          >
            {isLoading ? 'Creating Darkness...' : 'Generate Viral Horror Short'}
          </button>
        </div>
      </div>

      {isLoading || videoUrl ? (
        <div className="max-w-[400px] mx-auto mb-20">
          <div className="glass rounded-3xl aspect-[9/16] relative overflow-hidden flex flex-col items-center justify-center p-8 text-center ring-1 ring-red-500/20">
            {isLoading ? (
              <div className="space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-2 border-red-500 rounded-full animate-ping absolute inset-0 opacity-20"></div>
                  <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-red-400 font-bold text-lg animate-pulse">{status}</p>
              </div>
            ) : videoUrl && (
              <video src={videoUrl} className="absolute inset-0 w-full h-full object-cover" controls autoPlay />
            )}
          </div>
          {videoUrl && !isLoading && (
            <div className="mt-4 flex gap-3">
              <button className="flex-1 bg-red-600 py-3 rounded-xl font-bold hover:bg-red-700">Download HD</button>
              <button className="flex-1 glass py-3 rounded-xl font-bold">Copy Captions</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default HorrorShorts;
