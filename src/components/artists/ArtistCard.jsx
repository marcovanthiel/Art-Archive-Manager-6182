import { motion } from 'framer-motion';
import { RiEditLine, RiDeleteBin6Line, RiGalleryLine } from 'react-icons/ri';

export default function ArtistCard({ artist }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={artist?.portraitPhoto || 'https://via.placeholder.com/300x400'}
          alt={artist?.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{artist?.name}</h3>
        <p className="text-sm text-gray-500">{artist?.location}</p>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center text-primary">
            <RiGalleryLine className="w-5 h-5 mr-1" />
            {artist?.artworkCount || 0} Artworks
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