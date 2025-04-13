const MetricCard = ({ title, value, color }) => (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-semibold mb-2">{title}</h2>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
  
  export default MetricCard;
  