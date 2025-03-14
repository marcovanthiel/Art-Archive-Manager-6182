import { NavLink } from 'react-router-dom';
import { RiDashboardLine, RiGalleryLine, RiUserLine, RiMapPinLine, RiFileChartLine, RiSettings4Line } from 'react-icons/ri';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function Sidebar() {
  const { t } = useLanguage();

  const navigation = [
    { name: t('dashboard'), to: '/', icon: RiDashboardLine },
    { name: t('artworks'), to: '/artworks', icon: RiGalleryLine },
    { name: t('artists'), to: '/artists', icon: RiUserLine },
    { name: t('locations'), to: '/locations', icon: RiMapPinLine },
    { name: t('reports'), to: '/reports', icon: RiFileChartLine },
    { name: t('settings'), to: '/settings', icon: RiSettings4Line },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">{t('appTitle')}</h1>
      </div>
      <nav className="mt-6">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-primary/5 text-primary border-r-4 border-primary' : ''
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}