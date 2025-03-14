import { useState } from 'react';
import { motion } from 'framer-motion';
import { RiAddLine, RiFilterLine, RiSearchLine } from 'react-icons/ri';
import { useLanguage } from '../lib/i18n/LanguageContext';
import ArtworkCard from '../components/artworks/ArtworkCard';
import ArtworkForm from '../components/artworks/ArtworkForm';

export default function Artworks() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  // Placeholder data
  const artworks = [
    {
      id: 1,
      title: 'Abstract Composition',
      artist: 'Jane Doe',
      currentValue: 2500,
      mainPhoto: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&h=800'
    },
    {
      id: 2,
      title: 'Urban Landscape',
      artist: 'John Smith',
      currentValue: 3800,
      mainPhoto: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=1000&h=800'
    }
  ];

  const handleSubmit = async (data) => {
    console.log('Submitting artwork:', data);
    // Add your submission logic here
    setShowForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {showForm ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {selectedArtwork ? t('editArtwork') : t('addNewArtwork')}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedArtwork(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              {t('cancel')}
            </button>
          </div>
          <ArtworkForm onSubmit={handleSubmit} initialData={selectedArtwork} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{t('artworks')}</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark flex items-center"
            >
              <RiAddLine className="mr-2" />
              {t('addNewArtwork')}
            </button>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder={t('searchArtworks')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center">
              <RiFilterLine className="mr-2" />
              {t('filter')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                onClick={() => {
                  setSelectedArtwork(artwork);
                  setShowForm(true);
                }}
              />
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}