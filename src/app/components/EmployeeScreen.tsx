import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import logoImg from "figma:asset/image-1.png";

interface EmployeeScreenProps {
  request: any;
  onComplete: () => void;
}

export function EmployeeScreen({ request, onComplete }: EmployeeScreenProps) {
  const [taskStatus, setTaskStatus] = useState<'assigned' | 'in-progress' | 'completed'>('assigned');
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (taskStatus === 'in-progress' && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [taskStatus, startTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartTask = () => {
    setTaskStatus('in-progress');
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  const handleMarkDone = () => {
    setTaskStatus('completed');
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <img src={logoImg} alt="Smart Service Manager" className="h-12 mb-4" />
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Employee Panel</h1>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${taskStatus === 'assigned' ? 'bg-[#22C55E]' : 'bg-orange-500'}`} />
            <span className="text-gray-300 text-sm">
              {taskStatus === 'assigned' ? 'Free' : 'Busy'}
            </span>
          </div>
        </div>
        <p className="text-gray-400">Assigned to: John Doe</p>
      </div>

      {/* Task Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl p-6 border border-gray-800 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                📦 Task: {request?.type || 'Room Cleaning'}
              </h2>
              <p className="text-gray-400">Room {request?.room || '203'}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              taskStatus === 'assigned' ? 'bg-[#3B82F6]/20 text-[#3B82F6]' :
              taskStatus === 'in-progress' ? 'bg-orange-500/20 text-orange-500' :
              'bg-[#22C55E]/20 text-[#22C55E]'
            }`}>
              {taskStatus === 'assigned' ? 'Assigned' :
               taskStatus === 'in-progress' ? 'In Progress' :
               'Completed'}
            </div>
          </div>

          <div className="border-t border-gray-700 pt-4 mb-4">
            <p className="text-gray-300 mb-2">Request Details:</p>
            <p className="text-gray-400 text-sm">{request?.text || 'Room cleaning required'}</p>
          </div>

          {/* Task Timer */}
          {taskStatus === 'in-progress' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-500 rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Task Timer</p>
                  <p className="text-orange-500 font-bold">⏱ In Progress</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Elapsed Time</p>
                  <motion.p
                    key={elapsedTime}
                    initial={{ scale: 1.2, color: '#F59E0B' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-3xl font-bold text-white"
                  >
                    {formatTime(elapsedTime)}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}

          {taskStatus === 'completed' && elapsedTime > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-[#22C55E]/20 to-[#16A34A]/20 border-2 border-[#22C55E] rounded-lg p-4 mb-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">Task Completed</p>
                  <p className="text-[#22C55E] font-bold">✓ Finished</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-1">Total Time</p>
                  <p className="text-2xl font-bold text-[#22C55E]">
                    {formatTime(elapsedTime)}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Resources */}
          <div className="bg-[#0F172A] rounded-lg p-4 mb-6">
            <h3 className="text-white font-semibold mb-3">Resources Available</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">🧴 Cleaning Kit</span>
                <span className="text-[#22C55E] text-sm font-semibold">Available</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">🧻 Towels</span>
                <span className="text-gray-400 text-sm">17 in stock</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">🧼 Soap</span>
                <span className="text-gray-400 text-sm">12 in stock</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {taskStatus === 'assigned' && (
              <button
                onClick={handleStartTask}
                className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Task
              </button>
            )}
            {taskStatus === 'in-progress' && (
              <button
                onClick={handleMarkDone}
                className="flex-1 bg-gradient-to-r from-[#22C55E] to-[#16A34A] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Mark as Done
              </button>
            )}
            {taskStatus === 'completed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-1 bg-[#22C55E]/20 border-2 border-[#22C55E] text-[#22C55E] font-bold py-3 rounded-lg text-center"
              >
                ✓ Task Completed
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
