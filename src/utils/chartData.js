// Data for charts
export const rankingsData = {
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
  
  export  const newLostCustomerData= {
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
  
  export  const customerImpressionsData = {
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
  
  export  const customerTrafficSourcesData = {
    labels: ["Organic", "Referral", "Direct", "Social"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ["#34d399", "#60a5fa", "#facc15", "#f87171"],
        borderWidth: 1,
      },
    ],
  };