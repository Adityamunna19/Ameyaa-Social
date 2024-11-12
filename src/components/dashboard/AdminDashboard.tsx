import React, { useState } from 'react';
import { Download, Database } from 'lucide-react';
import { csvAuth } from '../../services/csvAuth';
import { DataView } from './DataView';

export function AdminDashboard() {
  const [showDataView, setShowDataView] = useState(true);

  const handleDownloadUsers = () => {
    csvAuth.downloadCsv();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-600">Manage users and view system data</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowDataView(!showDataView)}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Database className="h-5 w-5 mr-2" />
              {showDataView ? 'Hide Data' : 'View Data'}
            </button>
            <button
              onClick={handleDownloadUsers}
              className="flex items-center px-4 py-2 bg-[#B31B1B] text-white rounded-md hover:bg-[#B31B1B]/90 transition-colors"
            >
              <Download className="h-5 w-5 mr-2" />
              Download CSV
            </button>
          </div>
        </div>

        {showDataView && <DataView />}
      </div>
    </div>
  );
}