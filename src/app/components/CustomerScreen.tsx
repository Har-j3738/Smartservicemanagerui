import { useState } from 'react';
import { motion } from 'motion/react';
import logoImg from "figma:asset/image-1.png";

interface CustomerScreenProps {
  onSubmit: (request: any) => void;
}

export function CustomerScreen({ onSubmit }: CustomerScreenProps) {
  const [requestText, setRequestText] = useState('');
  const [serviceType, setServiceType] = useState('');

  const handleSubmit = () => {
    if (requestText && serviceType) {
      onSubmit({
        text: requestText,
        type: serviceType,
        room: '203',
        timestamp: new Date().toISOString()
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col items-center justify-center p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src={logoImg}
          alt="Smart Service Manager"
          className="w-64 mx-auto mb-4"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-400 text-sm"
        >
          Smart Service Manager
        </motion.p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Request Service</h2>

        {/* Request Input */}
        <div className="mb-6">
          <label className="block text-gray-300 text-sm mb-2">What do you need?</label>
          <input
            type="text"
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            placeholder="Room cleaning, food delivery..."
            className="w-full bg-[#0F172A] text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-[#3B82F6] focus:outline-none transition-colors"
          />
        </div>

        {/* Service Type Dropdown */}
        <div className="mb-8">
          <label className="block text-gray-300 text-sm mb-2">Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full bg-[#0F172A] text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-[#3B82F6] focus:outline-none transition-colors"
          >
            <option value="">Select Service Type</option>
            <option value="Cleaning">🧹 Cleaning</option>
            <option value="Maintenance">🔧 Maintenance</option>
            <option value="Delivery">🍽 Delivery</option>
            <option value="Housekeeping">🛏 Housekeeping</option>
          </select>
        </div>

        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!requestText || !serviceType}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Request
        </motion.button>
      </motion.div>

      {/* Bottom Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-4 text-gray-400 text-sm"
      >
        <span className="flex items-center gap-2">
          <span className="text-[#22C55E]">✔</span> Easy
        </span>
        <span className="text-gray-600">|</span>
        <span className="flex items-center gap-2">
          <span className="text-[#22C55E]">✔</span> Fast
        </span>
        <span className="text-gray-600">|</span>
        <span className="flex items-center gap-2">
          <span className="text-[#22C55E]">✔</span> AI Powered
        </span>
      </motion.div>
    </div>
  );
}
