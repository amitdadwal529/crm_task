import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import LineChart from '@components/ui/charts/LineChart';
import BarChart from '@components/ui/charts/BarChart';
import PieChart from '@components/ui/charts/PieChart';

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

const Dashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Monthly Sales</h2>
          <LineChart />
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Product Performance</h2>
          <BarChart />
        </div>

        <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
          <h2 className="text-lg font-semibold mb-2">User Traffic Source</h2>
          <div className="w-1/2 mx-auto">
            <PieChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
