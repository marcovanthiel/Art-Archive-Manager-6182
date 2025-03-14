import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiFileTextLine, RiDownload2Line } from 'react-icons/ri';
import ReportFilter from '../components/reports/ReportFilter';
import ValueReport from '../components/reports/ValueReport';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('artworks');

  const tabs = [
    { id: 'artworks', label: 'Artworks Report' },
    { id: 'values', label: 'Value Analysis' },
    { id: 'locations', label: 'Location Summary' },
    { id: 'artists', label: 'Artist Overview' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <div className="space-x-4">
          <button className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark flex items-center">
            <RiFileTextLine className="mr-2" />
            Export PDF
          </button>
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent-dark flex items-center">
            <RiDownload2Line className="mr-2" />
            Export DOCX
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <ReportFilter onApply={(fields) => console.log('Applied filters:', fields)} />
          
          {activeTab === 'values' && (
            <div className="mt-6">
              <ValueReport />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}