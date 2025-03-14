import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import { useLanguage } from '../lib/i18n/LanguageContext';

export default function Dashboard() {
  const { t } = useLanguage();

  const valueOptions = {
    title: {
      text: t('collectionValueOverview'),
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: function(params) {
        return params.map(param => {
          return `${param.seriesName}: €${param.value.toLocaleString()}`
        }).join('<br />');
      }
    },
    legend: {
      bottom: '0',
      data: [t('purchaseValue'), t('currentValue')]
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value) => `€${value.toLocaleString()}`
      }
    },
    series: [
      {
        name: t('purchaseValue'),
        type: 'line',
        data: [150000, 180000, 220000, 270000, 320000, 350000]
      },
      {
        name: t('currentValue'),
        type: 'line',
        data: [160000, 200000, 250000, 310000, 380000, 420000]
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">{t('totalArtworks')}</h3>
          <p className="text-3xl font-bold text-primary mt-2">156</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">{t('totalArtists')}</h3>
          <p className="text-3xl font-bold text-secondary mt-2">42</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700">{t('totalValue')}</h3>
          <p className="text-3xl font-bold text-accent mt-2">€420.000</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <ReactECharts option={valueOptions} style={{ height: '400px' }} />
      </div>
    </motion.div>
  );
}