import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Loader } from 'lucide-react';

export default function AIAssistantChat({ onClose, userData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI study assistant. I can help you with:\n\n• Explaining complex topics\n• Suggesting study resources\n• Analyzing your weak areas\n• Creating study plans\n\nWhat would you like to know?",
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

  const generateAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase();
    
    // Analyze weak areas
    if (query.includes('weak') || query.includes('struggling') || query.includes('difficult')) {
      const weakAreas = userData.weakAreas || [];
      if (weakAreas.length > 0) {
        return `Based on your analytics, here are your weak areas:\n\n${weakAreas.map((area, idx) => 
          `${idx + 1}. **${area.topic}** (${area.subject})\n   - Issue: ${area.reason}\n   - Suggestion: ${area.suggestion}`
        ).join('\n\n')}\n\nI recommend focusing on these topics in your next study session. Would you like me to create a study plan?`;
      }
      return "Great news! You don't have any identified weak areas right now. Keep up the excellent work! 🎉";
    }

    // Explain concepts
    if (query.includes('explain') || query.includes('what is')) {
      const topics = {
        'recursion': '**Recursion** is a programming technique where a function calls itself to solve a problem.\n\n**Key Concepts:**\n• Base case: Condition to stop recursion\n• Recursive case: Function calling itself\n• Stack memory usage\n\n**Example:** Factorial function\n```\nfactorial(5) = 5 × factorial(4)\nfactorial(4) = 4 × factorial(3)\n...\n```\n\n**Resources:**\n📺 Abdul Bari - Recursion Playlist\n📚 Practice on LeetCode: Tree problems',
        'normalization': '**Database Normalization** is organizing data to reduce redundancy.\n\n**Normal Forms:**\n• **1NF**: Atomic values, no repeating groups\n• **2NF**: No partial dependencies\n• **3NF**: No transitive dependencies\n• **BCNF**: Every determinant is a key\n\n**Example:**\nBad: Student(ID, Name, Course1, Course2)\nGood: Student(ID, Name), Enrollment(StudentID, CourseID)\n\n**Resources:**\n📺 GateSmashers - DBMS Normalization\n📚 Silberschatz Database Concepts',
        'binary tree': '**Binary Tree** is a tree data structure where each node has at most 2 children.\n\n**Types:**\n• Full Binary Tree: 0 or 2 children\n• Complete Binary Tree: All levels filled except last\n• Perfect Binary Tree: All levels completely filled\n\n**Traversals:**\n• Inorder (Left, Root, Right)\n• Preorder (Root, Left, Right)\n• Postorder (Left, Right, Root)\n\n**Resources:**\n📺 Striver - Tree Series\n💻 Practice: LeetCode Tree Section'
      };

      for (const [topic, explanation] of Object.entries(topics)) {
        if (query.includes(topic)) {
          return explanation;
        }
      }

      return "I'd be happy to explain! Could you please specify the topic you'd like me to explain? For example:\n• Recursion\n• Normalization\n• Binary Trees\n• Deadlocks\n• TCP/IP Protocol";
    }

    // Study plan suggestions
    if (query.includes('study plan') || query.includes('schedule')) {
      return "I'll create a personalized study plan for you! 📚\n\n**Today's Focus:**\n• 9:00 AM - 11:00 AM: Review weak areas (Recursion)\n• 2:00 PM - 4:00 PM: Practice problems (10 tree questions)\n• 7:00 PM - 8:00 PM: Quick revision\n\n**This Week:**\n• Mon-Wed: Data Structures deep dive\n• Thu-Fri: Operating Systems concepts\n• Sat: Practice & Mock tests\n• Sun: Review & light study\n\nWould you like me to add this to your Smart Study Planner?";
    }

    // Resource recommendations
    if (query.includes('youtube') || query.includes('video') || query.includes('channel')) {
      return "Here are my top YouTube recommendations:\n\n**Computer Science:**\n📺 Abdul Bari - Algorithms & Data Structures\n📺 GateSmashers - DBMS, OS, Networks\n📺 Neso Academy - Complete CS fundamentals\n\n**Programming:**\n📺 Striver (takeUforward) - DSA placement\n📺 CodeHelp by Babbar - Complete C++/DSA\n📺 Apna College - Full courses\n\n**Interview Prep:**\n📺 Gaurav Sen - System Design\n📺 Tech Dose - Problem solving\n\nWhich subject are you most interested in?";
    }

    // Default helpful response
    return `I understand you're asking about "${userQuery}". Here's what I can help with:\n\n1. **Concept Explanations**: Ask me to explain any CS topic\n2. **Study Resources**: Get YouTube channels, books, practice sites\n3. **Weak Area Analysis**: Review your performance data\n4. **Study Planning**: Create customized study schedules\n5. **Practice Problems**: Get problem recommendations\n\nTry asking: "Explain recursion" or "Show my weak areas" or "Suggest study plan"`;
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

    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickPrompts = [
    "Explain recursion",
    "Show my weak areas",
    "Suggest study plan",
    "Recommend YouTube channels"
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
        initial={{ scale: 0.9, opacity: 0, x: 100 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.9, opacity: 0, x: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#1e1b4b] rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden border-2 border-gray-200 dark:border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-gradient-to-r from-purple-500 to-pink-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white">AI Study Assistant</h3>
              <p className="text-xs text-white/80">Powered by StudySync Intelligence</p>
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot'
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                }`}>
                  {message.type === 'bot' ? (
                    <Bot size={16} className="text-white" />
                  ) : (
                    <User size={16} className="text-white" />
                  )}
                </div>

                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'bot'
                      ? 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-100'
                      : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                    <span className="text-xs opacity-60 mt-1 block">
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-white/10 rounded-2xl p-3 flex items-center gap-2">
                <Loader size={16} className="text-gray-600 dark:text-gray-400 animate-spin" />
                <span className="text-sm text-gray-600 dark:text-gray-400">AI is thinking...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="px-4 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-purple-500" />
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                Quick prompts:
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
        <div className="p-4 border-t border-gray-200 dark:border-white/10">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your studies..."
              className="flex-1 px-4 py-3 bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}