import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Reusable UI card component for metrics
import MetricCard from "@components/ui/dashboard/MetricCard";

// Chart data imported from utility file
import { rankingsData, newLostCustomerData, customerImpressionsData ,customerTrafficSourcesData} from "@utils/chartData";

// Register Chart.js components globally
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);



const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Metric Cards Section */}
        <MetricCard title="Total Sales" value="₹1,24,500" color="text-green-600" />
        <MetricCard title="Customer Feedback" value="4.3 / 5" color="text-yellow-500" />
        <MetricCard title="New Customers" value="320" color="text-blue-500" />
        <MetricCard title="Returning Customers" value="180" color="text-purple-500" />
     
            {/* Bar Chart: Sales Overview */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Sales Overview</h2>
          <Bar
            data={rankingsData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
            key={JSON.stringify(rankingsData)} // prevent canvas reuse error
          />
        </div>

            {/* Pie Chart: Customer Traffic Sources */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2 md:col-span-1">
          <h2 className="font-semibold mb-2">Traffic Sources</h2>
          <Pie
            data={customerTrafficSourcesData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
            key={JSON.stringify(customerTrafficSourcesData)} // prevent canvas reuse error
          />
        </div>

            {/* Bar Chart: New vs Lost Customers */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">New/Lost Customer</h2>
          <Bar
            data={newLostCustomerData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
            key={JSON.stringify(newLostCustomerData)} // prevent canvas reuse error
          />
        </div>

               {/* Line Chart: Customer Impressions Trend */}       
        <div className="bg-white p-4 rounded-xl shadow col-span-2">
          <h2 className="font-semibold mb-2">Customer Impressions</h2>
          <Line
            data={customerImpressionsData}
            options={{
              responsive: true,
              plugins: { legend: { position: "bottom" } },
            }}
            key={JSON.stringify(customerImpressionsData)} // prevent canvas reuse error
          />
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
