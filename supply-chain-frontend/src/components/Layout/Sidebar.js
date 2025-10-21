import React from 'react';
import { 
  Plus, 
  Truck, 
  RefreshCw, 
  Store, 
  Search,
  Package
} from 'lucide-react';

const menuItems = [
  { id: 'create', label: 'Create Batch', icon: Plus, color: 'text-green-600' },
  { id: 'logistics', label: 'Logistics', icon: Truck, color: 'text-blue-600' },
  { id: 'status', label: 'Update Status', icon: RefreshCw, color: 'text-orange-600' },
  { id: 'retail', label: 'Retail Info', icon: Store, color: 'text-purple-600' },
  { id: 'search', label: 'Search Batch', icon: Search, color: 'text-indigo-600' },
];

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
            <Package className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-green-600' : item.color}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;