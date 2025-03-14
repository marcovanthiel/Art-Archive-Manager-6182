import { useState } from 'react';
import { useLanguage } from '../../lib/i18n/LanguageContext';
import { db } from '../../lib/storage/IndexedDBService';

export default function LocationDialog({ onClose, onSave }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    type: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.add('locations', formData);
      onSave();
      onClose();
    } catch (error) {
      console.error('Error adding location:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{t('addNewLocation')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('locationName')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('locationAddress')}</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">{t('locationType')}</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              <option value="">{t('selectType')}</option>
              <option value="gallery">{t('gallery')}</option>
              <option value="storage">{t('storage')}</option>
              <option value="museum">{t('museum')}</option>
              <option value="private">{t('privateCollection')}</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}