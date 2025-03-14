import { motion } from 'framer-motion';
import { RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function ArtworkCard({ artwork }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/artworks/edit/${artwork.id}`, { state: { artwork } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
      onClick={handleEdit}
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={artwork?.mainPhoto || 'https://via.placeholder.com/400x300'}
          alt={artwork?.title}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{artwork?.title}</h3>
        <p className="text-sm text-gray-500">{artwork?.artist}</p>
        <div className="mt-2 flex justify-between items-center">
          <span className="text-primary font-medium">${artwork?.currentValue}</span>
          <div className="flex space-x-2">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <RiEditLine className="w-5 h-5 text-gray-600" />
            </button>
            <button 
              className="p-2 hover:bg-gray-100 rounded-full text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                // Add delete handler
              }}
            >
              <RiDeleteBin6Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}