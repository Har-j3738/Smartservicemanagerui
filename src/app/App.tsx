import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomerScreen } from './components/CustomerScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { EmployeeScreen } from './components/EmployeeScreen';
import { AdminScreen } from './components/AdminScreen';
import { AIChatbot } from './components/AIChatbot';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'customer' | 'processing' | 'employee' | 'admin'>('customer');
  const [currentRequest, setCurrentRequest] = useState<any>(null);

  const handleSubmitRequest = (request: any) => {
    setCurrentRequest(request);
    setCurrentScreen('processing');

    // Simulate processing time
    setTimeout(() => {
      setCurrentScreen('employee');
    }, 2500);
  };

  const handleTaskComplete = () => {
    setCurrentScreen('admin');
  };

  const handleBackToCustomer = () => {
    setCurrentScreen('customer');
    setCurrentRequest(null);
  };

  return (
    <div className="size-full bg-[#0F172A] overflow-auto">
      <AnimatePresence mode="wait">
        {currentScreen === 'customer' && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <CustomerScreen onSubmit={handleSubmitRequest} />
          </motion.div>
        )}
        {currentScreen === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ProcessingScreen request={currentRequest} />
          </motion.div>
        )}
        {currentScreen === 'employee' && (
          <motion.div
            key="employee"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <EmployeeScreen request={currentRequest} onComplete={handleTaskComplete} />
          </motion.div>
        )}
        {currentScreen === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <AdminScreen onBackToCustomer={handleBackToCustomer} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Chatbot - Available on all screens */}
      <AIChatbot />
    </div>
  );
}