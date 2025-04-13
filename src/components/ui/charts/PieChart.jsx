import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'Traffic Source',
        data: [50, 30, 20],
        backgroundColor: ['#6366f1', '#22c55e', '#f97316'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
