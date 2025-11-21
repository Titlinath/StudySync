import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, Music, Cloud, Moon, Coffee, Headphones } from 'lucide-react';

export default function CalmCorner({ onClose }) {
  const [selectedSound, setSelectedSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundscapes = [
    {
      id: 'lofi',
      name: 'Lo-fi Beats',
      icon: Music,
      description: 'Chill study vibes',
      color: 'from-purple-400 to-pink-500',
      url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1'
    },
    {
      id: 'rain',
      name: 'Rain Sounds',
      icon: Cloud,
      description: 'Peaceful rainfall',
      color: 'from-blue-400 to-cyan-500',
      url: 'https://www.youtube.com/embed/q76bMs-NwRk?autoplay=1'
    },
    {
      id: 'night',
      name: 'Night Ambience',
      icon: Moon,
      description: 'Calm night sounds',
      color: 'from-indigo-400 to-purple-500',
      url: 'https://www.youtube.com/embed/EeOD_9wih5k?autoplay=1'
    },
    {
      id: 'cafe',
      name: 'Coffee Shop',
      icon: Coffee,
      description: 'Cozy cafe atmosphere',
      color: 'from-orange-400 to-red-500',
      url: 'https://www.youtube.com/embed/gaGltzEquWw?autoplay=1'
    }
  ];

  const focusModes = [
    { name: 'Deep Focus', duration: '2 hours', color: 'from-blue-500 to-purple-500' },
    { name: 'Quick Study', duration: '25 minutes', color: 'from-green-500 to-emerald-500' },
    { name: 'Night Owl', duration: '3 hours', color: 'from-indigo-500 to-purple-500' },
    { name: 'Power Hour', duration: '1 hour', color: 'from-orange-500 to-red-500' }
  ];

  const handleSoundSelect = (sound) => {
    setSelectedSound(sound);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && !selectedSound) {
      setSelectedSound(soundscapes[0]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-gray-200 dark:border-white/10"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Headphones size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Calm Corner</h2>
              <p className="text-sm text-white/80">Find your focus with ambient sounds</p>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Soundscape Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Music size={20} className="text-blue-500" />
              Choose Your Soundscape
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {soundscapes.map((sound, idx) => {
                const Icon = sound.icon;
                const isSelected = selectedSound?.id === sound.id;
                
                return (
                  <motion.button
                    key={sound.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSoundSelect(sound)}
                    className={`relative p-6 rounded-xl transition-all ${
                      isSelected
                        ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 shadow-2xl'
                        : 'shadow-lg hover:shadow-xl'
                    }`}
                    style={{
                      background: `linear-gradient(to bottom right, ${sound.color.split(' ')[0].replace('from-', '#')}, ${sound.color.split(' ')[2].replace('to-', '#')})`
                    }}
                  >
                    <div className="text-center">
                      <div className="inline-flex p-3 bg-white/20 backdrop-blur rounded-lg mb-3">
                        <Icon size={28} className="text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-1">{sound.name}</h4>
                      <p className="text-xs text-white/80">{sound.description}</p>
                    </div>

                    {isSelected && isPlaying && (
                      <div className="absolute top-2 right-2">
                        <div className="flex gap-1">
                          {[1, 2, 3].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scaleY: [0.5, 1, 0.5] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                              }}
                              className="w-1 h-4 bg-white rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Focus Mode Presets */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Focus Mode Presets
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {focusModes.map((mode, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 bg-gradient-to-br ${mode.color} rounded-xl shadow-md hover:shadow-lg transition-all text-center`}
                >
                  <p className="font-bold text-white mb-1">{mode.name}</p>
                  <p className="text-xs text-white/80">{mode.duration}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Now Playing */}
          {selectedSound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/5 dark:to-white/10 rounded-xl p-6 border-2 border-gray-200 dark:border-white/10"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Now Playing
              </h3>
              
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                {isPlaying ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={selectedSound.url}
                    title={selectedSound.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Music size={48} className="text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Press play to start</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white">{selectedSound.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedSound.description}</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className={`p-4 bg-gradient-to-br ${selectedSound.color} text-white rounded-full shadow-lg hover:shadow-xl transition-all`}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 bg-blue-50 dark:bg-blue-500/10 rounded-xl border border-blue-200 dark:border-blue-500/30"
          >
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Pro tip:</strong> Combine ambient sounds with 25-minute Pomodoro sessions for maximum focus. Your brain will thank you!
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}