import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Employee {
  id: number;
  name: string;
  role: string;
  status: 'free' | 'busy' | 'offline';
  currentTask?: string;
  tasksCompleted: number;
  rating: number;
  avatar: string;
}

export function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'John Doe', role: 'Housekeeping', status: 'busy', currentTask: 'Room 203 Cleaning', tasksCompleted: 47, rating: 4.8, avatar: '👨' },
    { id: 2, name: 'Sarah Smith', role: 'Room Service', status: 'busy', currentTask: 'Room 105 Delivery', tasksCompleted: 52, rating: 4.9, avatar: '👩' },
    { id: 3, name: 'Mike Johnson', role: 'Maintenance', status: 'free', tasksCompleted: 38, rating: 4.7, avatar: '👨‍🔧' },
    { id: 4, name: 'Emily Davis', role: 'Housekeeping', status: 'free', tasksCompleted: 44, rating: 4.6, avatar: '👩‍💼' },
    { id: 5, name: 'David Wilson', role: 'Room Service', status: 'offline', tasksCompleted: 31, rating: 4.5, avatar: '👨‍🍳' },
    { id: 6, name: 'Lisa Anderson', role: 'Housekeeping', status: 'busy', currentTask: 'Room 412 Cleaning', tasksCompleted: 49, rating: 4.9, avatar: '👩' },
    { id: 7, name: 'Robert Brown', role: 'Maintenance', status: 'free', tasksCompleted: 35, rating: 4.4, avatar: '👨‍🔧' },
    { id: 8, name: 'Jennifer Taylor', role: 'Concierge', status: 'busy', currentTask: 'Front Desk', tasksCompleted: 67, rating: 5.0, avatar: '👩‍💼' },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const toggleEmployeeStatus = (employeeId: number) => {
    setEmployees(employees.map(emp =>
      emp.id === employeeId
        ? {
            ...emp,
            status: emp.status === 'free' ? 'busy' : emp.status === 'busy' ? 'offline' : 'free',
            currentTask: emp.status === 'free' ? 'Assigned Task' : undefined
          }
        : emp
    ));
  };

  const filteredEmployees = filterStatus === 'all'
    ? employees
    : employees.filter(emp => emp.status === filterStatus);

  const stats = {
    total: employees.length,
    free: employees.filter(e => e.status === 'free').length,
    busy: employees.filter(e => e.status === 'busy').length,
    offline: employees.filter(e => e.status === 'offline').length,
  };

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'free': return 'bg-[#22C55E]';
      case 'busy': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Employee['status']) => {
    switch (status) {
      case 'free': return 'Available';
      case 'busy': return 'Busy';
      case 'offline': return 'Offline';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Total Staff</p>
              <p className="text-white text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Available</p>
              <p className="text-white text-3xl font-bold">{stats.free}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">On Duty</p>
              <p className="text-white text-3xl font-bold">{stats.busy}</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Offline</p>
              <p className="text-white text-3xl font-bold">{stats.offline}</p>
            </div>
            <div className="text-4xl">💤</div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="bg-[#1E293B] rounded-xl shadow-lg p-4 mb-6 border border-gray-800">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-gray-400 font-semibold">Filter:</span>
          {['all', 'free', 'busy', 'offline'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((employee) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#1E293B] rounded-xl shadow-lg p-5 border border-gray-800 hover:border-[#3B82F6] transition-all cursor-pointer"
            onClick={() => setSelectedEmployee(employee)}
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="text-5xl">{employee.avatar}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-white font-bold">{employee.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(employee.status)}`} />
                </div>
                <p className="text-gray-400 text-sm mb-1">{employee.role}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  employee.status === 'free' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                  employee.status === 'busy' ? 'bg-orange-500/20 text-orange-500' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {getStatusText(employee.status)}
                </span>
              </div>
            </div>

            {employee.currentTask && (
              <div className="bg-[#0F172A] rounded-lg p-3 mb-3">
                <p className="text-gray-400 text-xs mb-1">Current Task:</p>
                <p className="text-white text-sm font-semibold">{employee.currentTask}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-[#0F172A] rounded-lg p-2 text-center">
                <p className="text-gray-400 text-xs">Tasks Done</p>
                <p className="text-white font-bold">{employee.tasksCompleted}</p>
              </div>
              <div className="bg-[#0F172A] rounded-lg p-2 text-center">
                <p className="text-gray-400 text-xs">Rating</p>
                <p className="text-[#F59E0B] font-bold">★ {employee.rating}</p>
              </div>
            </div>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleEmployeeStatus(employee.id);
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
            >
              Toggle Status
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Employee Detail Modal */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-8xl mb-3">{selectedEmployee.avatar}</div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedEmployee.name}</h2>
                <p className="text-gray-400">{selectedEmployee.role}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedEmployee.status)}`} />
                  <span className="text-white font-semibold">{getStatusText(selectedEmployee.status)}</span>
                </div>
              </div>

              <div className="bg-[#0F172A] rounded-lg p-4 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tasks Completed:</span>
                  <span className="text-white font-bold">{selectedEmployee.tasksCompleted}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Rating:</span>
                  <span className="text-[#F59E0B] font-bold">★ {selectedEmployee.rating} / 5.0</span>
                </div>
                {selectedEmployee.currentTask && (
                  <div className="border-t border-gray-700 pt-3">
                    <span className="text-gray-400 text-sm">Current Task:</span>
                    <p className="text-white font-semibold mt-1">{selectedEmployee.currentTask}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setSelectedEmployee(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Close
                </motion.button>
                <motion.button
                  onClick={() => {
                    toggleEmployeeStatus(selectedEmployee.id);
                    setSelectedEmployee(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Toggle Status
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
