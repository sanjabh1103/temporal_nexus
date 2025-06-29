import React, { useRef, useEffect, useState } from 'react';
import { Brain, Layers, Zap, RotateCcw, Download, Share2, Users, Play, Pause } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  probability: number;
  outcome: string;
  color: string;
  size: number;
  opacity: number;
}

interface CollaborativeUser {
  id: string;
  name: string;
  color: string;
  cursor: { x: number; y: number };
  lastActive: number;
}

export const QuantumVisualization3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [collaborativeUsers, setCollaborativeUsers] = useState<CollaborativeUser[]>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeSpeed, setTimeSpeed] = useState(1);

  const outcomes = [
    { name: 'Career Success', probability: 0.85, color: '#0ea5e9' },
    { name: 'Financial Gain', probability: 0.72, color: '#d946ef' },
    { name: 'Life Satisfaction', probability: 0.91, color: '#22c55e' },
    { name: 'Work-Life Balance', probability: 0.68, color: '#f59e0b' },
    { name: 'Professional Growth', probability: 0.88, color: '#ef4444' },
    { name: 'Personal Fulfillment', probability: 0.76, color: '#8b5cf6' }
  ];

  useEffect(() => {
    // Initialize particles with enhanced properties
    const newParticles: Particle[] = [];
    outcomes.forEach((outcome, index) => {
      const particleCount = Math.floor(outcome.probability * 80);
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          x: (Math.random() - 0.5) * 300,
          y: (Math.random() - 0.5) * 300,
          z: (Math.random() - 0.5) * 300,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          vz: (Math.random() - 0.5) * 1.5,
          probability: outcome.probability,
          outcome: outcome.name,
          color: outcome.color,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    });
    setParticles(newParticles);

    // Simulate collaborative users
    const mockUsers: CollaborativeUser[] = [
      { id: 'user1', name: 'Alex Chen', color: '#0ea5e9', cursor: { x: 0, y: 0 }, lastActive: Date.now() },
      { id: 'user2', name: 'Sarah Kim', color: '#d946ef', cursor: { x: 0, y: 0 }, lastActive: Date.now() }
    ];
    setCollaborativeUsers(mockUsers);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / (2 * window.devicePixelRatio);
      const centerY = canvas.height / (2 * window.devicePixelRatio);

      // Update rotation
      if (isRotating && isPlaying) {
        setRotation(prev => ({
          x: prev.x + 0.01 * timeSpeed,
          y: prev.y + 0.005 * timeSpeed
        }));
      }

      // Update particles
      particles.forEach((particle, index) => {
        if (isPlaying) {
          // Update particle position
          particle.x += particle.vx * timeSpeed;
          particle.y += particle.vy * timeSpeed;
          particle.z += particle.vz * timeSpeed;

          // Boundary wrapping with quantum tunneling effect
          if (Math.abs(particle.x) > 150) {
            particle.vx *= -0.8;
            particle.x = Math.sign(particle.x) * 150;
          }
          if (Math.abs(particle.y) > 150) {
            particle.vy *= -0.8;
            particle.y = Math.sign(particle.y) * 150;
          }
          if (Math.abs(particle.z) > 150) {
            particle.vz *= -0.8;
            particle.z = Math.sign(particle.z) * 150;
          }

          // Quantum uncertainty effect
          particle.opacity = 0.3 + 0.7 * Math.sin(Date.now() * 0.001 + index * 0.1);
        }

        // 3D rotation
        const cosX = Math.cos(rotation.x);
        const sinX = Math.sin(rotation.x);
        const cosY = Math.cos(rotation.y);
        const sinY = Math.sin(rotation.y);

        // Rotate around X axis
        const y1 = particle.y * cosX - particle.z * sinX;
        const z1 = particle.y * sinX + particle.z * cosX;

        // Rotate around Y axis
        const x2 = particle.x * cosY + z1 * sinY;
        const z2 = -particle.x * sinY + z1 * cosY;

        // Project to 2D with enhanced perspective
        const perspective = 400;
        const scale = perspective / (perspective + z2);
        const x2d = centerX + x2 * scale;
        const y2d = centerY + y1 * scale;

        // Enhanced particle rendering
        const alpha = selectedOutcome ? 
          (particle.outcome === selectedOutcome ? particle.opacity : 0.1) : 
          particle.opacity * 0.8;

        ctx.save();
        ctx.globalAlpha = alpha;
        
        // Glow effect
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, particle.size * scale * 3);
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Quantum entanglement connections
        if (index % 15 === 0) {
          particles.slice(index + 1, index + 4).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const dz = particle.z - otherParticle.z;
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 80) {
              // Project other particle
              const oy1 = otherParticle.y * cosX - otherParticle.z * sinX;
              const oz1 = otherParticle.y * sinX + otherParticle.z * cosX;
              const ox2 = otherParticle.x * cosY + oz1 * sinY;
              const oz2 = -otherParticle.x * sinY + oz1 * cosY;
              const otherScale = perspective / (perspective + oz2);
              const ox2d = centerX + ox2 * otherScale;
              const oy2d = centerY + oy1 * otherScale;

              ctx.save();
              ctx.globalAlpha = (1 - distance / 80) * 0.2 * alpha;
              ctx.strokeStyle = particle.color;
              ctx.lineWidth = 1;
              ctx.setLineDash([2, 4]);
              ctx.beginPath();
              ctx.moveTo(x2d, y2d);
              ctx.lineTo(ox2d, oy2d);
              ctx.stroke();
              ctx.restore();
            }
          });
        }
      });

      // Draw collaborative cursors
      collaborativeUsers.forEach(user => {
        if (Date.now() - user.lastActive < 5000) {
          ctx.save();
          ctx.fillStyle = user.color;
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(user.cursor.x, user.cursor.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          // User name
          ctx.fillStyle = 'white';
          ctx.font = '12px Inter, sans-serif';
          ctx.fillText(user.name, user.cursor.x + 15, user.cursor.y - 10);
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Mouse tracking for collaborative cursors
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update random user cursor position
      if (collaborativeUsers.length > 0) {
        const randomUser = collaborativeUsers[Math.floor(Math.random() * collaborativeUsers.length)];
        randomUser.cursor = { x: x + Math.random() * 20 - 10, y: y + Math.random() * 20 - 10 };
        randomUser.lastActive = Date.now();
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particles, rotation, isRotating, selectedOutcome, isPlaying, timeSpeed, collaborativeUsers]);

  const exportVisualization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `quantum-probability-cloud-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const shareVisualization = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob && navigator.share) {
          const file = new File([blob], 'quantum-visualization.png', { type: 'image/png' });
          await navigator.share({
            title: 'Quantum Probability Cloud - TEMPORAL NEXUS',
            text: 'Check out my decision analysis visualization!',
            files: [file]
          });
        } else {
          // Fallback: copy to clipboard
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
      });
    } catch (error) {
      console.log('Error sharing:', error);
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Layers className="w-6 h-6 text-temporal-400" />
          <div>
            <h2 className="text-xl font-bold text-white">3D Quantum Probability Cloud</h2>
            <p className="text-sm text-gray-400">Real-time collaborative visualization</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying ? 'bg-temporal-500 text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-2 rounded-lg transition-colors ${
              isRotating ? 'bg-temporal-500 text-white' : 'bg-white/10 text-gray-400'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <select
            value={timeSpeed}
            onChange={(e) => setTimeSpeed(Number(e.target.value))}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
          <button
            onClick={exportVisualization}
            className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={shareVisualization}
            className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-64 sm:h-96 rounded-lg bg-black/20 cursor-crosshair"
        />
        
        {/* Outcome Legend */}
        <div className="absolute top-4 left-4 space-y-2 max-h-48 overflow-y-auto">
          {outcomes.map((outcome) => (
            <button
              key={outcome.name}
              onClick={() => setSelectedOutcome(
                selectedOutcome === outcome.name ? null : outcome.name
              )}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-all text-sm ${
                selectedOutcome === outcome.name
                  ? 'bg-white/20 text-white'
                  : 'bg-black/40 text-gray-300 hover:bg-white/10'
              }`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: outcome.color }}
              />
              <span className="hidden sm:inline">{outcome.name}</span>
              <span className="sm:hidden">{outcome.name.split(' ')[0]}</span>
              <span className="text-xs opacity-75">{Math.round(outcome.probability * 100)}%</span>
            </button>
          ))}
        </div>

        {/* Collaborative Users */}
        <div className="absolute top-4 right-4 space-y-2">
          <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-lg p-2">
            <Users className="w-4 h-4 text-collective-400" />
            <span className="text-sm text-white">{collaborativeUsers.length} online</span>
          </div>
          {collaborativeUsers.map(user => (
            <div
              key={user.id}
              className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-lg p-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: user.color }}
              />
              <span className="text-sm text-white hidden sm:inline">{user.name}</span>
              <span className="text-sm text-white sm:hidden">{user.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Quantum Metrics */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs text-gray-300 mb-2">Quantum Metrics</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-temporal-400" />
              <span className="text-xs text-white">Entanglement: Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-3 h-3 text-quantum-400" />
              <span className="text-xs text-white">Coherence: {Math.round(Math.random() * 30 + 70)}%</span>
            </div>
          </div>
        </div>

        {/* Time Controls */}
        <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-sm rounded-lg p-3">
          <div className="text-xs text-gray-300 mb-2">Temporal Controls</div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white">Speed: {timeSpeed}x</span>
            <span className="text-xs text-white">|</span>
            <span className="text-xs text-white">{isPlaying ? 'Playing' : 'Paused'}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Interactive 3D quantum probability visualization with real-time collaboration. 
        Use controls to manipulate time flow and share insights with your team.
      </div>
    </div>
  );
};