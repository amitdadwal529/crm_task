import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const rankingsData = {
  labels: ["Oct 18", "Oct 26", "Nov 4", "Nov 8", "Nov 16"],
  datasets: [
    {
      label: "1-3",
      data: [4, 6, 7, 5, 6],
      backgroundColor: "#4ade80",
    },
    {
      label: "4-10",
      data: [5, 4, 3, 6, 5],
      backgroundColor: "#facc15",
    },
    {
      label: "11-20",
      data: [6, 5, 4, 4, 3],
      backgroundColor: "#f87171",
    },
  ],
};

const newLostLinksData = {
  labels: ["Apr 5", "Apr 12", "Apr 19", "Apr 26"],
  datasets: [
    {
      label: "New",
      data: [1500, 1800, 2000, 1700],
      backgroundColor: "#34d399",
    },
    {
      label: "Lost",
      data: [800, 1000, 1200, 950],
      backgroundColor: "#f87171",
    },
  ],
};

const impressionsData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  datasets: [
    {
      label: "Impressions",
      data: [200000, 210000, 250000, 262000],
      borderColor: "#3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <select className="border p-2 rounded-md">
            <option>Last 30 days</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Edit Dashboard</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Google Rankings</h2>
          <div className="text-lg">10</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Google Change</h2>
          <div className="text-green-500 text-lg">+4</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Sessions</h2>
          <div className="text-2xl font-bold">2,787</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Performance Score</h2>
          <div className="text-yellow-500 text-3xl">70</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">SEO Score</h2>
          <div className="text-red-500 text-3xl">40</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Accessibility</h2>
          <div className="text-yellow-400 text-3xl">80</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Best Practices</h2>
          <div className="text-green-500 text-3xl">90</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-2">Goal Completions</h2>
          <div className="text-2xl font-bold">3,306</div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Google Rankings Overview</h2>
          <Bar data={rankingsData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }}}} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">New/Lost Links</h2>
          <Bar data={newLostLinksData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }}}} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Impressions</h2>
          <Line data={impressionsData} options={{ responsive: true, plugins: { legend: { position: 'bottom' }}}} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
