import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiMapPin2Line } from 'react-icons/ri';

export default function LocationForm() {
  const [locationType, setLocationType] = useState('');

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="mt-1 flex">
            <input
              type="text"
              className="flex-1 rounded-l-md border border-gray-300 px-3 py-2"
              placeholder="Enter address"
            />
            <button
              type="button"
              className="px-4 py-2 bg-secondary text-white rounded-r-md hover:bg-secondary-dark"
            >
              <RiMapPin2Line className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Map Preview */}
        <div className="col-span-2 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Map Preview</span>
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Location Type</label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Select Type</option>
            <option value="gallery">Gallery</option>
            <option value="storage">Storage</option>
            <option value="museum">Museum</option>
            <option value="private">Private Collection</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Save Location
        </button>
      </div>
    </form>
  );
}