import { useState } from 'react';
import { motion } from 'motion/react';

interface Order {
  id: number;
  room: string;
  items: string[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  time: string;
  priority: 'normal' | 'high';
}

export function RestaurantStatus() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, room: '203', items: ['Club Sandwich', 'Fries', 'Coke'], status: 'preparing', time: '10 min', priority: 'high' },
    { id: 2, room: '105', items: ['Caesar Salad', 'Wine'], status: 'ready', time: '5 min', priority: 'normal' },
    { id: 3, room: '307', items: ['Pasta Alfredo', 'Garlic Bread'], status: 'pending', time: '15 min', priority: 'normal' },
    { id: 4, room: '412', items: ['Breakfast Combo', 'Orange Juice'], status: 'preparing', time: '8 min', priority: 'high' },
    { id: 5, room: '201', items: ['Pizza Margherita', 'Salad'], status: 'pending', time: '20 min', priority: 'normal' },
  ]);

  const [kitchenStats, setKitchenStats] = useState({
    chefs: 3,
    activeOrders: 5,
    avgPrepTime: '12 min',
    todayOrders: 47
  });

  const updateOrderStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-gray-500/20 text-gray-400 border-gray-500';
      case 'preparing': return 'bg-orange-500/20 text-orange-500 border-orange-500';
      case 'ready': return 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]';
      case 'delivered': return 'bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Kitchen Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Active Chefs</p>
              <p className="text-white text-3xl font-bold">{kitchenStats.chefs}</p>
            </div>
            <div className="text-4xl">👨‍🍳</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Active Orders</p>
              <p className="text-white text-3xl font-bold">{kitchenStats.activeOrders}</p>
            </div>
            <div className="text-4xl">🍽</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Avg Prep Time</p>
              <p className="text-white text-3xl font-bold">{kitchenStats.avgPrepTime}</p>
            </div>
            <div className="text-4xl">⏱</div>
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
              <p className="text-white/80 text-sm mb-1">Today's Orders</p>
              <p className="text-white text-3xl font-bold">{kitchenStats.todayOrders}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </motion.div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending & Preparing Orders */}
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">🔥 Active Orders</h2>
            <span className="bg-orange-500/20 text-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
              {orders.filter(o => o.status === 'pending' || o.status === 'preparing').length} orders
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {orders.filter(o => o.status === 'pending' || o.status === 'preparing').map((order) => (
              <div key={order.id} className="bg-[#0F172A] rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-bold">Room {order.room}</span>
                      {order.priority === 'high' && (
                        <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-xs font-bold">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">Est. {order.time}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-gray-300 text-sm mb-1">
                      • {item}
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  {order.status === 'pending' && (
                    <motion.button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Start Preparing
                    </motion.button>
                  )}
                  {order.status === 'preparing' && (
                    <motion.button
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-[#22C55E] hover:bg-[#16A34A] text-white py-2 rounded-lg text-sm font-semibold transition-all"
                    >
                      Mark Ready
                    </motion.button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ready & Delivered Orders */}
        <div className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">✅ Completed Orders</h2>
            <span className="bg-[#22C55E]/20 text-[#22C55E] px-3 py-1 rounded-full text-sm font-semibold">
              {orders.filter(o => o.status === 'ready' || o.status === 'delivered').length} orders
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {orders.filter(o => o.status === 'ready' || o.status === 'delivered').map((order) => (
              <div key={order.id} className="bg-[#0F172A] rounded-lg p-4 border border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-white font-bold">Room {order.room}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="mb-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-gray-300 text-sm mb-1">
                      • {item}
                    </div>
                  ))}
                </div>
                {order.status === 'ready' && (
                  <motion.button
                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white py-2 rounded-lg text-sm font-semibold transition-all"
                  >
                    Mark Delivered
                  </motion.button>
                )}
                {order.status === 'delivered' && (
                  <div className="text-center text-gray-400 text-sm py-2">
                    ✓ Delivered Successfully
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
