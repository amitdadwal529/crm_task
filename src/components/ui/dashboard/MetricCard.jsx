const MetricCard = ({ title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow">
      {/* Card Title */}
      <h2 className="font-semibold mb-2">{title}</h2>
      
      {/* Metric Value with dynamic color styling */}
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
  
  export default MetricCard;
  