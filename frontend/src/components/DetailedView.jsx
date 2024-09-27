import { useLocation } from 'react-router-dom';

const DetailedView = () => {
  const location = useLocation();
  const { clickedData } = location.state || {}; // Get data passed via state

  if (!clickedData) {
    return <p>No data available.</p>;
  }

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Risk Details</h2>
      <p><strong>Category:</strong> {clickedData.category}</p>
      <p><strong>Score:</strong> {clickedData.score}</p>
      <p><strong>Risk Level:</strong> {clickedData.riskLevel}</p>
      {/* You can add more detailed information here */}
    </div>
  );
};

export default DetailedView;
