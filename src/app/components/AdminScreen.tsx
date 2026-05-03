import { useState } from 'react';
import { motion } from 'motion/react';
import logoImg from "figma:asset/image-1.png";
import { RestaurantStatus } from './RestaurantStatus';
import { InventoryManagement } from './InventoryManagement';
import { EmployeeManagement } from './EmployeeManagement';

interface AdminScreenProps {
  onBackToCustomer: () => void;
}

export function AdminScreen({ onBackToCustomer }: AdminScreenProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'restaurant' | 'inventory' | 'employees'>('dashboard');
  const stats = [
    { label: 'Total Requests', value: '55', color: 'from-[#3B82F6] to-[#2563EB]', icon: '📊' },
    { label: 'Pending Tasks', value: '46', color: 'from-[#F59E0B] to-[#D97706]', icon: '⏳' },
    { label: 'Completed Tasks', value: '9', color: 'from-[#22C55E] to-[#16A34A]', icon: '✅' },
    { label: 'Free Employees', value: '2', color: 'from-[#8B5CF6] to-[#7C3AED]', icon: '👥' }
  ];

  const liveRequests = [
    { id: 1, type: 'Cleaning', room: '203', employee: 'John Doe', status: 'completed', time: '8:45' },
    { id: 2, type: 'Delivery', room: '105', employee: 'Sarah Smith', status: 'in-progress', time: '3:12' },
    { id: 3, type: 'Maintenance', room: '307', employee: 'Mike Johnson', status: 'assigned', time: '0:45' },
    { id: 4, type: 'Housekeeping', room: '412', employee: 'Emily Davis', status: 'assigned', time: '0:23' },
    { id: 5, type: 'Cleaning', room: '201', employee: 'Unassigned', status: 'pending', time: '1:05' }
  ];

  const inventory = [
    { name: 'Towels', quantity: 5, low: true },
    { name: 'Soap', quantity: 2, low: true },
    { name: 'Cleaning Kits', quantity: 15, low: false },
    { name: 'Bed Sheets', quantity: 8, low: false },
    { name: 'Toiletries', quantity: 3, low: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#1E293B] p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div>
            <img src={logoImg} alt="Smart Service Manager" className="h-12 mb-2" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Real-time monitoring & control</p>
          </div>
          <button
            onClick={onBackToCustomer}
            className="bg-[#1E293B] border border-gray-700 text-white px-4 py-2 rounded-lg hover:bg-[#334155] transition-colors"
          >
            ← Back to Customer
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-[#1E293B] rounded-xl shadow-lg p-2 flex gap-2 border border-gray-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setActiveTab('restaurant')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'restaurant'
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            🍽 Restaurant
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'inventory'
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            📦 Inventory
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
              activeTab === 'employees'
                ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            👥 Employees
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'restaurant' && <RestaurantStatus />}
      {activeTab === 'inventory' && <InventoryManagement />}
      {activeTab === 'employees' && <EmployeeManagement />}

      {/* Dashboard View */}
      {activeTab === 'dashboard' && (
        <>
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-r ${stat.color} rounded-xl shadow-lg p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="text-4xl">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Requests */}
        <div className="lg:col-span-2">
          <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">📋 Live Requests</h2>
            <div className="space-y-3">
              {liveRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-[#0F172A] rounded-lg p-4 hover:bg-[#1a1f2e] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-white font-semibold">Room {request.room}</span>
                        <span className="text-gray-400 text-sm">•</span>
                        <span className="text-gray-300 text-sm">{request.type}</span>
                      </div>
                      <p className="text-gray-400 text-sm">Assigned: {request.employee}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      request.status === 'completed' ? 'bg-[#22C55E]/20 text-[#22C55E]' :
                      request.status === 'in-progress' ? 'bg-orange-500/20 text-orange-500' :
                      request.status === 'assigned' ? 'bg-[#3B82F6]/20 text-[#3B82F6]' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {request.status === 'completed' ? 'Completed' :
                       request.status === 'in-progress' ? 'In Progress' :
                       request.status === 'assigned' ? 'Assigned' :
                       'Pending'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">⏱</span>
                    <span className={`font-mono ${
                      request.status === 'completed' ? 'text-[#22C55E]' :
                      request.status === 'in-progress' ? 'text-orange-500' :
                      'text-gray-400'
                    }`}>
                      {request.time}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {request.status === 'completed' ? 'total time' :
                       request.status === 'in-progress' ? 'elapsed' :
                       'waiting'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-xl shadow-lg p-6"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h3 className="text-white font-bold mb-1">Inventory Low Alert</h3>
                <p className="text-white/90 text-sm">
                  Multiple items below threshold. Check inventory panel for details.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Inventory Panel */}
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">📦 Inventory</h2>
          <div className="space-y-3">
            {inventory.map((item, index) => (
              <div
                key={index}
                className={`bg-[#0F172A] rounded-lg p-4 ${
                  item.low ? 'border-2 border-[#F59E0B]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{item.name}</span>
                  {item.low && (
                    <span className="text-[#F59E0B] text-xs font-bold">⚠ LOW</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${
                        item.low ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                      }`}
                      style={{ width: `${Math.min((item.quantity / 20) * 100, 100)}%` }}
                    />
                  </div>
                  <span className={`text-sm font-semibold ${
                    item.low ? 'text-[#F59E0B]' : 'text-gray-300'
                  }`}>
                    {item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all">
            Update Stock
          </button>
        </div>
      </div>

      {/* Task Status Summary */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-4">✔ Task Status Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#22C55E] mb-1">9</div>
              <div className="text-gray-400 text-sm">Completed Today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-1">2</div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#3B82F6] mb-1">44</div>
              <div className="text-gray-400 text-sm">Pending</div>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
