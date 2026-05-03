import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatbotProps {
  onClose?: () => void;
}

export function AIChatbot({ onClose }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm your Smart Service Manager AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickHelp = [
    { id: 1, text: "How do I request a service?", icon: "🛎" },
    { id: 2, text: "How to update inventory?", icon: "📦" },
    { id: 3, text: "How to manage employees?", icon: "👥" },
    { id: 4, text: "How to track restaurant orders?", icon: "🍽" },
    { id: 5, text: "What's the dashboard for?", icon: "📊" }
  ];

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('service') || msg.includes('request')) {
      return "🛎 **Requesting a Service:**\n\n1. Go to the Customer Screen\n2. Enter your request in the text field\n3. Select the service type (Cleaning, Maintenance, Delivery, Housekeeping)\n4. Click 'Submit Request'\n5. Track your request status in real-time!\n\nThe system will automatically assign an available employee to your request.";
    }

    if (msg.includes('inventory') || msg.includes('stock')) {
      return "📦 **Managing Inventory:**\n\n1. Go to Admin Dashboard\n2. Click the 'Inventory' tab\n3. View all items with stock levels\n4. **To update stock:** Click on any item card\n5. Use +/- buttons or type the quantity change\n6. Click 'Update Stock' to save\n\n⚠️ Low stock items are highlighted in orange!";
    }

    if (msg.includes('employee') || msg.includes('staff') || msg.includes('worker')) {
      return "👥 **Managing Employees:**\n\n1. Go to Admin Dashboard → Employees tab\n2. View all staff with their status (Available/Busy/Offline)\n3. **Toggle Status:** Click 'Toggle Status' on any employee card\n4. **View Details:** Click on an employee card for full profile\n5. Track performance metrics like tasks completed and ratings\n\nEmployees are auto-assigned to requests when available!";
    }

    if (msg.includes('restaurant') || msg.includes('food') || msg.includes('order')) {
      return "🍽 **Restaurant Management:**\n\n1. Go to Admin Dashboard → Restaurant tab\n2. **Active Orders:** View pending and preparing orders\n3. **Update Status:**\n   - Pending → Click 'Start Preparing'\n   - Preparing → Click 'Mark Ready'\n   - Ready → Click 'Mark Delivered'\n4. Track kitchen stats and prep times\n5. Urgent orders are marked with a red 'URGENT' tag";
    }

    if (msg.includes('dashboard') || msg.includes('admin')) {
      return "📊 **Admin Dashboard Features:**\n\n**4 Main Tabs:**\n1. **Dashboard** - Overview with stats, live requests, inventory alerts\n2. **Restaurant** - Kitchen & food order management\n3. **Inventory** - Stock tracking and updates\n4. **Employees** - Staff management and assignment\n\n**Stats Cards** show real-time metrics for quick monitoring!\n\n**Live Requests** displays all active service requests with assigned employees.";
    }

    if (msg.includes('timer') || msg.includes('time') || msg.includes('track')) {
      return "⏱ **Task Timers:**\n\nEvery employee task includes an automatic timer that tracks:\n- Time elapsed since task assignment\n- Estimated completion time\n- Actual completion time\n\nYou can view task timers in the Employee Dashboard and Admin Dashboard under active tasks!";
    }

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
      return "👋 Hello! I'm here to help you navigate the Smart Service Manager. Ask me anything about:\n\n• Requesting services\n• Managing inventory\n• Employee management\n• Restaurant orders\n• Dashboard features\n\nOr click a quick help button below!";
    }

    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! 😊 Feel free to ask if you need any more help with the Smart Service Manager!";
    }

    return "🤖 I'm here to help! You can ask me about:\n\n• **Requesting services** - How to submit and track requests\n• **Inventory management** - Updating and monitoring stock\n• **Employee management** - Assigning and tracking staff\n• **Restaurant orders** - Managing kitchen operations\n• **Dashboard features** - Understanding all the tools\n\nJust ask your question or click a quick help button!";
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI response delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(messageText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickHelp = (helpText: string) => {
    handleSendMessage(helpText);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center z-50 group"
          >
            <span className="text-3xl">🤖</span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
            >
              AI
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div>
                  <h3 className="text-white font-bold">AI Assistant</h3>
                  <p className="text-white/80 text-xs">Always here to help</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Help Buttons */}
            <div className="bg-[#0F172A] p-3 border-b border-gray-700">
              <p className="text-gray-400 text-xs mb-2">Quick Help:</p>
              <div className="flex gap-2 flex-wrap">
                {quickHelp.map((help) => (
                  <button
                    key={help.id}
                    onClick={() => handleQuickHelp(help.text)}
                    className="bg-[#1E293B] hover:bg-[#334155] text-gray-300 text-xs px-3 py-1.5 rounded-lg transition-colors border border-gray-700"
                  >
                    {help.icon} {help.text.split(' ').slice(0, 3).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white'
                        : 'bg-[#0F172A] text-gray-200 border border-gray-700'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-[#0F172A] border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-[#1E293B] text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-[#3B82F6] focus:outline-none text-sm transition-colors"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputText.trim()}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-5 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
