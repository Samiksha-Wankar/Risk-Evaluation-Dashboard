const RiskLegend = () => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 bg-green-500 rounded-full"></div>
        <span className="ml-3 text-lg">Low Risk</span>
      </div>
      <div className="flex items-center mb-4">
        <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
        <span className="ml-3 text-lg">Medium Risk</span>
      </div>
      <div className="flex items-center">
        <div className="w-6 h-6 bg-red-500 rounded-full"></div>
        <span className="ml-3 text-lg">High Risk</span>
      </div>
    </div>
  );
};

export default RiskLegend;
