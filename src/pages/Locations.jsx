import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiFilterLine, RiSearchLine } from 'react-icons/ri';
import LocationCard from '../components/locations/LocationCard';
import LocationForm from '../components/locations/LocationForm';

export default function Locations() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Placeholder data
  const locations = [
    {
      id: 1,
      name: 'Modern Art Gallery',
      type: 'Gallery',
      address: '123 Art Street, New York',
      artworkCount: 45
    },
    {
      id: 2,
      name: 'Secure Storage Facility',
      type: 'Storage',
      address: '456 Safe Avenue, London',
      artworkCount: 120
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {showForm ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add New Location</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <LocationForm />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center"
            >
              <RiAddLine className="mr-2" />
              Add New Location
            </button>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
              <RiFilterLine className="mr-2" />
              Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}