import { RiNotification3Line, RiUserLine } from 'react-icons/ri';
import { useLanguage } from '../lib/i18n/LanguageContext';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex-1">
        <input
          type="search"
          placeholder={t('search')}
          className="w-96 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex items-center space-x-4">
        <LanguageSelector />
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <RiNotification3Line className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <RiUserLine className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}