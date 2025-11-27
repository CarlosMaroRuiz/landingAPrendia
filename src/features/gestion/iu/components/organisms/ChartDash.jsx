import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ChartDash = ({ municipalitiesData = [] }) => {
  // Map API data to chart format
  const labels = municipalitiesData.map(item => item.municipio);
  const values = municipalitiesData.map(item => item.totalRegistros);

  // Generate colors for each municipality
  const colors = [
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6',
    '#F59E0B',
    '#06B6D4',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6'
  ];

  const chartData = {
    labels: labels.length > 0 ? labels : ['Sin datos'],
    datasets: [
      {
        label: 'Registros por Municipio',
        data: values.length > 0 ? values : [0],
        backgroundColor: colors.slice(0, labels.length || 1),
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 60
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'x',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        borderColor: '#fff',
        borderWidth: 1,
        cornerRadius: 4
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 16,
        ticks: {
          stepSize: 4,
          font: { size: 12 },
          color: '#6B7280'
        },
        grid: {
          color: '#E5E7EB',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: { size: 12 },
          color: '#6B7280'
        },
        grid: {
          display: false,
          drawBorder: false
        }
      }
    }
  };

  return (
    <div className="flex justify-center w-full mt-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-gray-900">Datos de registros</h3>
          <select className="text-sm border border-gray-300 rounded px-3 py-2 text-gray-600 hover:border-gray-400">
            <option>Municipio</option>
          </select>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-h-96 md:max-h-[600px]">
            <Bar data={chartData} options={options} />
          </div>
        </div>

        {/* Legend */}
        {municipalitiesData.length > 0 && (
          <div className="flex flex-wrap gap-6 mt-6 justify-center">
            {municipalitiesData.map((item, index) => (
              <div key={item.municipio} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                ></div>
                <span className="text-sm text-gray-600">{item.municipio}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
