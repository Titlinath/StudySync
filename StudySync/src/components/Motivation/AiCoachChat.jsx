import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Heart, User, Sparkles, Loader } from 'lucide-react';

export default function AiCoachChat({ onClose, userName }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hey ${userName}! 💜 I'm your personal motivation coach. I'm here to support you, not judge you.\n\nFeeling stuck? Overwhelmed? Or just need a little push? I'm all ears. What's on your mind today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateCoachResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Feeling lazy
    if (query.includes('lazy') || query.includes('don\'t want to') || query.includes('can\'t start')) {
      return "I hear you. Starting is the hardest part. Here's what we'll do:\n\n**Micro-Win Strategy:**\n• Set a timer for just 5 minutes\n• Open your notes or book\n• Read ONE paragraph\n\nThat's it. No pressure to continue. But I bet once you start, momentum will carry you forward. The hardest step is always the first one.\n\nReady to try? 💪";
    }

    // Feeling overwhelmed
    if (query.includes('overwhelm') || query.includes('too much') || query.includes('stress')) {
      return "Take a breath. You're not alone in feeling this way. 🌸\n\n**Let's break it down:**\n1. Write down everything that's overwhelming you\n2. Pick ONE thing - just one\n3. Give it 15 focused minutes\n\nRemember: You don't have to do everything today. You just need to do something. Progress > Perfection.\n\nWhich task feels most urgent to you?";
    }

    // Lost motivation
    if (query.includes('motivation') || query.includes('purpose') || query.includes('why')) {
      return `${userName}, let me remind you of something powerful:\n\nYou started this journey for a reason. Maybe it's:\n• Building a better future\n• Making your family proud\n• Proving something to yourself\n• Creating opportunities\n\n**Your "why" is your fuel.**\n\nTake 2 minutes right now:\n• Close your eyes\n• Remember why you started\n• Feel that energy\n\nThen open your notes and do just 10 minutes. That's all I ask. 🔥`;
    }

    // Feeling behind
    if (query.includes('behind') || query.includes('late') || query.includes('should have')) {
      return "Stop right there. ✋\n\nYou're not behind. You're exactly where you need to be to grow. Compare yourself to who you were yesterday, not to others.\n\n**Truth bomb:**\n• Everyone's journey is different\n• Your pace is YOUR pace\n• Consistency beats speed\n\nToday, you're one step closer than yesterday. And tomorrow, you'll be one step closer than today. Keep moving forward. 🌟";
    }

    // Need study tips
    if (query.includes('study') || query.includes('learn') || query.includes('remember')) {
      return "Let's optimize your study game! 🎯\n\n**Power Techniques:**\n• **Pomodoro**: 25 min focus + 5 min break\n• **Active Recall**: Test yourself, don't just re-read\n• **Feynman**: Explain concepts in simple words\n• **Spaced Repetition**: Review at intervals\n\n**Your Peak Hours:**\nYou study best during 3-5 PM. Use this time for your hardest subjects.\n\nWant me to create a custom study plan for you?";
    }

    // Default supportive response
    return `I'm here for you, ${userName}. 💙\n\nYou know what? The fact that you're here, talking to me, shows you care. That's already a win.\n\n**Here's what I suggest:**\n• Start with the easiest task on your list\n• Do it for just 10 minutes\n• Celebrate the small win\n• Build momentum from there\n\nRemember: You don't need motivation to start. You need to start to get motivation.\n\nWhat's one small thing you can do right now?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateCoachResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickPrompts = [
    "I feel lazy to study today",
    "I'm feeling overwhelmed",
    "I lost my motivation",
    "Give me study tips"
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden border-2 border-gray-200 dark:border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Heart size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">Your AI Coach</h3>
              <p className="text-xs text-white/80">Here to support you, always 💜</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-pink-50/30 via-purple-50/30 to-blue-50/30 dark:from-transparent dark:via-transparent dark:to-transparent">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot'
                    ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.type === 'bot' ? (
                    <Heart size={20} className="text-white" />
                  ) : (
                    <User size={20} className="text-white" />
                  )}
                </div>

                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`inline-block max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'bot'
                      ? 'bg-white dark:bg-white/10 text-gray-800 dark:text-gray-100 shadow-md'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed font-medium">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-60 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Heart size={20} className="text-white" />
              </div>
              <div className="bg-white dark:bg-white/10 rounded-2xl p-4 flex items-center gap-2 shadow-md">
                <Loader size={16} className="text-gray-600 dark:text-gray-400 animate-spin" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Coach is thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-2 border-t border-gray-200 dark:border-white/10 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Try asking:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(prompt)}
                  className="px-3 py-1.5 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-lg transition-colors border border-purple-200 dark:border-purple-500/30"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#1e1b4b]">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Share what's on your mind..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}