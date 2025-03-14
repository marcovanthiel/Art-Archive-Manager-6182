import ReactECharts from 'echarts-for-react';

export default function ValueReport({ data }) {
  const chartOptions = {
    title: {
      text: 'Value Distribution',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: ${c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Value Distribution',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 235000, name: 'Paintings' },
          { value: 95000, name: 'Sculptures' },
          { value: 45000, name: 'Photography' },
          { value: 35000, name: 'Digital Art' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <ReactECharts option={chartOptions} style={{ height: '400px' }} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Total Value</h4>
          <p className="text-2xl font-bold text-primary mt-1">$410,000</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Highest Value</h4>
          <p className="text-2xl font-bold text-secondary mt-1">$85,000</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-600">Average Value</h4>
          <p className="text-2xl font-bold text-accent mt-1">$12,500</p>
        </div>
      </div>
    </div>
  );
}