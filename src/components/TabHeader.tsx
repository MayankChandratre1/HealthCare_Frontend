import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const TabHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: 'Patients', path: '/patients', show: true },
    { label: 'Staff List', path: '/staff', show: user?.role === 'ADMIN' }
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 py-4" aria-label="Tabs">
          {tabs.filter(tab => tab.show).map(tab => (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`px-4 py-2 rounded-t-lg text-sm font-medium focus:outline-none transition-colors
                ${location.pathname === tab.path
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-blue-700 hover:bg-blue-50'
                }`}
              aria-current={location.pathname === tab.path ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabHeader;