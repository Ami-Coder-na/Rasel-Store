import React, { useState, useRef } from 'react';
import { Box, Layers, MousePointer2, Smartphone } from 'lucide-react';

interface Product3DViewerProps {
  image: string;
}

// NOTE: In a full production app, this would use @react-three/fiber
// For this demo, we simulate a 3D effect using CSS transforms and interaction layers
export const Product3DViewer: React.FC<Product3DViewerProps> = ({ image }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    
    setRotation(prev => ({
      x: Math.max(-20, Math.min(20, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-b from-gray-900 to-black rounded-3xl overflow-hidden border border-white/10 group cursor-grab active:cursor-grabbing"
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUp}
         onMouseLeave={handleMouseUp}
    >
      {/* 3D Grid Floor */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%), linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(60deg) translateY(100px)'
        }}
      />

      {/* Floating Product "Hologram" */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <div className="relative w-64 h-80 shadow-2xl">
          {/* Main Image */}
          <img 
            src={image} 
            alt="3D View" 
            className="w-full h-full object-cover rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.4)] ring-1 ring-white/20 select-none pointer-events-none" 
          />
          {/* Tech Overlays */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-70"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 opacity-70"></div>
          
          {/* Depth Layers Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 mix-blend-overlay rounded-xl pointer-events-none"></div>
        </div>
      </div>

      {/* Controls UI */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all tooltip" title="View Layers">
          <Layers className="w-5 h-5" />
        </button>
        <button className="p-3 bg-cyan-600/80 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-all shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center gap-2 px-6">
          <Smartphone className="w-5 h-5" />
          <span className="font-bold text-sm">AR View</span>
        </button>
        <button className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all" title="Reset">
          <Box className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute top-6 right-6 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/10 flex items-center gap-2">
        <MousePointer2 className="w-3 h-3 text-cyan-400 animate-pulse" />
        <span className="text-xs text-gray-300 font-mono">DRAG TO ROTATE</span>
      </div>
    </div>
  );
};
