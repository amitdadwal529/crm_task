import React from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const dataLine = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [30, 45, 28, 80, 60],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.5)',
      fill: true,
    },
  ],
};

const dataBar = {
  labels: ['Product A', 'Product B', 'Product C'],
  datasets: [
    {
      label: 'Units Sold',
      data: [200, 150, 300],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
    },
  ],
};

const dataPie = {
  labels: ['Desktop', 'Mobile', 'Tablet'],
  datasets: [
    {
      label: 'Traffic Source',
      data: [50, 30, 20],
      backgroundColor: ['#6366f1', '#22c55e', '#f97316'],
    },
  ],
};

const Dashboard = () => {
  return (
    <>
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
            <Line data={dataLine} />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Product Performance</h2>
            <Bar data={dataBar} />
          </div>

          <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-2">User Traffic Source</h2>
            <div className="w-1/2 mx-auto">
              <Pie data={dataPie} />
            </div>
          </div>
        </div>
      
    </>
  )
}

export default Dashboard
