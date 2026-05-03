import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
  minThreshold: number;
  unit: string;
  icon: string;
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: 'Towels', category: 'Housekeeping', quantity: 5, minThreshold: 10, unit: 'pcs', icon: '🧻' },
    { id: 2, name: 'Soap', category: 'Housekeeping', quantity: 2, minThreshold: 8, unit: 'pcs', icon: '🧼' },
    { id: 3, name: 'Cleaning Kits', category: 'Housekeeping', quantity: 15, minThreshold: 5, unit: 'sets', icon: '🧴' },
    { id: 4, name: 'Bed Sheets', category: 'Housekeeping', quantity: 8, minThreshold: 12, unit: 'pcs', icon: '🛏' },
    { id: 5, name: 'Toiletries', category: 'Housekeeping', quantity: 3, minThreshold: 10, unit: 'sets', icon: '🧴' },
    { id: 6, name: 'Sanitizer', category: 'Cleaning', quantity: 20, minThreshold: 10, unit: 'bottles', icon: '🧪' },
    { id: 7, name: 'Vacuum Bags', category: 'Cleaning', quantity: 7, minThreshold: 5, unit: 'pcs', icon: '🛍' },
    { id: 8, name: 'Mops', category: 'Cleaning', quantity: 4, minThreshold: 3, unit: 'pcs', icon: '🧹' },
    { id: 9, name: 'Gloves', category: 'Safety', quantity: 25, minThreshold: 15, unit: 'pairs', icon: '🧤' },
    { id: 10, name: 'Masks', category: 'Safety', quantity: 50, minThreshold: 30, unit: 'pcs', icon: '😷' },
  ]);

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [updateQuantity, setUpdateQuantity] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(inventory.map(item => item.category)))];

  const handleUpdateInventory = () => {
    if (selectedItem) {
      setInventory(inventory.map(item =>
        item.id === selectedItem.id
          ? { ...item, quantity: item.quantity + updateQuantity }
          : item
      ));
      setSelectedItem(null);
      setUpdateQuantity(0);
    }
  };

  const filteredInventory = filterCategory === 'all'
    ? inventory
    : inventory.filter(item => item.category === filterCategory);

  const lowStockCount = inventory.filter(item => item.quantity < item.minThreshold).length;
  const totalItems = inventory.reduce((sum, item) => sum + item.quantity, 0);

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
              <p className="text-white/80 text-sm mb-1">Total Items</p>
              <p className="text-white text-3xl font-bold">{totalItems}</p>
            </div>
            <div className="text-4xl">📦</div>
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
              <p className="text-white/80 text-sm mb-1">Low Stock</p>
              <p className="text-white text-3xl font-bold">{lowStockCount}</p>
            </div>
            <div className="text-4xl">⚠️</div>
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
              <p className="text-white/80 text-sm mb-1">Categories</p>
              <p className="text-white text-3xl font-bold">{categories.length - 1}</p>
            </div>
            <div className="text-4xl">📋</div>
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
              <p className="text-white/80 text-sm mb-1">In Stock</p>
              <p className="text-white text-3xl font-bold">{inventory.filter(i => i.quantity >= i.minThreshold).length}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </motion.div>
      </div>

      {/* Filter */}
      <div className="bg-[#1E293B] rounded-xl shadow-lg p-4 mb-6 border border-gray-800">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-gray-400 font-semibold">Filter:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg'
                  : 'bg-[#0F172A] text-gray-400 hover:text-white'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInventory.map((item) => {
          const isLowStock = item.quantity < item.minThreshold;
          const stockPercentage = (item.quantity / item.minThreshold) * 100;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-[#1E293B] rounded-xl shadow-lg p-5 border-2 ${
                isLowStock ? 'border-[#F59E0B]' : 'border-gray-800'
              } hover:border-[#3B82F6] transition-all cursor-pointer`}
              onClick={() => {
                setSelectedItem(item);
                setUpdateQuantity(0);
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-white font-bold">{item.name}</h3>
                    <p className="text-gray-400 text-xs">{item.category}</p>
                  </div>
                </div>
                {isLowStock && (
                  <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-1 rounded text-xs font-bold">
                    LOW
                  </span>
                )}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Stock Level</span>
                  <span className={`font-bold ${isLowStock ? 'text-[#F59E0B]' : 'text-[#22C55E]'}`}>
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      isLowStock ? 'bg-[#F59E0B]' : 'bg-[#22C55E]'
                    }`}
                    style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-1">Min: {item.minThreshold} {item.unit}</p>
              </div>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                  setUpdateQuantity(0);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
              >
                Update Stock
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1E293B] rounded-2xl shadow-2xl border border-gray-800 p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{selectedItem.icon}</div>
                <h2 className="text-2xl font-bold text-white mb-1">{selectedItem.name}</h2>
                <p className="text-gray-400">Current: {selectedItem.quantity} {selectedItem.unit}</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">Add/Remove Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setUpdateQuantity(Math.max(updateQuantity - 1, -selectedItem.quantity))}
                    className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-lg font-bold text-xl transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={updateQuantity}
                    onChange={(e) => setUpdateQuantity(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-[#0F172A] text-white text-center text-2xl font-bold rounded-lg py-3 border border-gray-700 focus:border-[#3B82F6] focus:outline-none"
                  />
                  <button
                    onClick={() => setUpdateQuantity(updateQuantity + 1)}
                    className="bg-[#22C55E] hover:bg-[#16A34A] text-white w-12 h-12 rounded-lg font-bold text-xl transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[#0F172A] rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Current Stock:</span>
                  <span className="text-white font-bold">{selectedItem.quantity} {selectedItem.unit}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Change:</span>
                  <span className={`font-bold ${updateQuantity >= 0 ? 'text-[#22C55E]' : 'text-red-500'}`}>
                    {updateQuantity >= 0 ? '+' : ''}{updateQuantity} {selectedItem.unit}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold">New Stock:</span>
                    <span className="text-white text-xl font-bold">
                      {selectedItem.quantity + updateQuantity} {selectedItem.unit}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setSelectedItem(null)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleUpdateInventory}
                  disabled={updateQuantity === 0}
                  whileHover={{ scale: updateQuantity !== 0 ? 1.02 : 1 }}
                  whileTap={{ scale: updateQuantity !== 0 ? 0.98 : 1 }}
                  className="flex-1 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Update Stock
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
