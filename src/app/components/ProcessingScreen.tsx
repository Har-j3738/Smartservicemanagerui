import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import logoImg from "figma:asset/image-1.png";

interface ProcessingScreenProps {
  request: any;
}

export function ProcessingScreen({ request }: ProcessingScreenProps) {
  const [steps, setSteps] = useState([
    { text: 'Auto-assigning staff...', completed: false },
    { text: 'Checking availability...', completed: false },
    { text: 'Verifying inventory...', completed: false }
  ]);

  useEffect(() => {
    // Animate steps completion
    const timer1 = setTimeout(() => {
      setSteps(prev => prev.map((step, i) => i === 0 ? { ...step, completed: true } : step));
    }, 600);

    const timer2 = setTimeout(() => {
      setSteps(prev => prev.map((step, i) => i === 1 ? { ...step, completed: true } : step));
    }, 1200);

    const timer3 = setTimeout(() => {
      setSteps(prev => prev.map((step, i) => i === 2 ? { ...step, completed: true } : step));
    }, 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <img src={logoImg} alt="Smart Service Manager" className="h-12 mb-8" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#1E293B] rounded-2xl shadow-2xl p-8 border border-gray-800"
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <svg className="w-16 h-16 mx-auto" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M12 6v6l4 2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          🤖 Smart Service System
        </h2>
        <p className="text-gray-400 text-center mb-8">Processing your request...</p>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                step.completed
                  ? 'bg-[#22C55E]'
                  : 'bg-gray-700'
              }`}>
                {step.completed && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`${step.completed ? 'text-white' : 'text-gray-500'} transition-colors`}>
                {step.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <div className="text-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-[#3B82F6]"
          >
            Please wait...
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
