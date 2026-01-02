
import React, { useState } from 'react';
import { generateStoryScript, generateVideoContent } from '../services/geminiService';
import { VideoType, AspectRatio } from '../types';

const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [type, setType] = useState<VideoType>(VideoType.STORY);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.PORTRAIT);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsLoading(true);
    setGeneratedVideo(null);
    try {
      setProgress('Crafting your story...');
      const scriptData = await generateStoryScript(prompt, type);
      
      setProgress('Generating cinematic visuals (this may take a minute)...');
      const videoUrl = await generateVideoContent(scriptData.script, aspectRatio === AspectRatio.PORTRAIT ? '9:16' : '16:9');
      
      setGeneratedVideo(videoUrl);
      setProgress('Generation complete!');
    } catch (error) {
      console.error(error);
      setProgress('Oops! Something went wrong. Check your API key or connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 px-6 max-w-5xl mx-auto mb-20">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">AI Text to Video Generator</h1>
        <p className="text-gray-400">Transform your ideas into high-quality visual content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-2xl">
            <label className="block text-sm font-semibold text-gray-400 mb-3">What's your video about?</label>
            <textarea
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              placeholder="Example: A futuristic city where cars fly through neon clouds, cinematic lighting, 4k..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              dir="auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl">
              <label className="block text-sm font-semibold text-gray-400 mb-3">Content Style</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white"
                value={type}
                onChange={(e) => setType(e.target.value as VideoType)}
              >
                <option value={VideoType.STORY}>Storytelling</option>
                <option value={VideoType.EDUCATIONAL}>Educational</option>
                <option value={VideoType.ADVERTISING}>Commercial / Ad</option>
                <option value={VideoType.MOTIVATIONAL}>Motivational</option>
                <option value={VideoType.HORROR}>Horror / Creepy</option>
              </select>
            </div>
            <div className="glass p-6 rounded-2xl">
              <label className="block text-sm font-semibold text-gray-400 mb-3">Aspect Ratio</label>
              <div className="flex gap-2">
                {[AspectRatio.PORTRAIT, AspectRatio.LANDSCAPE, AspectRatio.SQUARE].map(ratio => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold transition-all ${aspectRatio === ratio ? 'bg-purple-600 border-purple-500' : 'border-white/10 hover:bg-white/5'}`}
                  >
                    {ratio === AspectRatio.PORTRAIT ? '9:16 (Shorts)' : ratio === AspectRatio.LANDSCAPE ? '16:9 (YouTube)' : '1:1 (Post)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isLoading ? 'bg-gray-700 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 shadow-[0_0_20px_rgba(168,85,247,0.3)]'}`}
          >
            {isLoading ? 'Processing...' : 'Generate AI Video'}
          </button>
        </div>

        <div className="lg:col-span-1">
          <div className="glass rounded-2xl aspect-[9/16] relative overflow-hidden flex flex-col items-center justify-center p-8 text-center border-dashed border-2 border-white/10">
            {isLoading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-purple-400 font-bold">{progress}</p>
                <p className="text-gray-500 text-xs">This takes time as our AI renders 720p scenes for you.</p>
              </div>
            ) : generatedVideo ? (
              <video 
                src={generatedVideo} 
                className="absolute inset-0 w-full h-full object-cover" 
                controls 
                autoPlay 
              />
            ) : (
              <div className="text-gray-500">
                <div className="text-5xl mb-4">✨</div>
                <p className="font-semibold text-white mb-2">Ready to Create</p>
                <p className="text-sm">Your generated video will appear here.</p>
              </div>
            )}
            
            {generatedVideo && !isLoading && (
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                <a 
                  href={generatedVideo} 
                  download="vira-video.mp4" 
                  className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-bold text-center hover:bg-gray-200"
                >
                  Download
                </a>
                <button className="flex-1 bg-white/10 backdrop-blur-md py-2 rounded-lg text-sm font-bold border border-white/20">
                  Share
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
