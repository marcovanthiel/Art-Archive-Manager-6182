import { motion } from 'framer-motion';
import { RiMapPin2Line, RiEditLine, RiDeleteBin6Line, RiGalleryLine } from 'react-icons/ri';

export default function LocationCard({ location }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{location?.name}</h3>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <RiMapPin2Line className="w-4 h-4 mr-1" />
              {location?.address}
            </p>
          </div>
          <span className="px-2 py-1 text-xs font-medium bg-secondary/10 text-secondary rounded-full">
            {location?.type}
          </span>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center text-primary">
            <RiGalleryLine className="w-5 h-5 mr-1" />
            {location?.artworkCount || 0} Artworks
          </button>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <RiEditLine className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
              <RiDeleteBin6Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}