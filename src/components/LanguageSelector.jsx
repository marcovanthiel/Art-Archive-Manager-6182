import { motion } from 'framer-motion';
import { RiGlobalLine } from 'react-icons/ri';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative"
    >
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="appearance-none bg-transparent border border-gray-200 rounded-lg px-4 py-2 pr-8 hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </select>
      <RiGlobalLine className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </motion.div>
  );
}