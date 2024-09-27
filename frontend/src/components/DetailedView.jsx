import { useLocation, useNavigate } from 'react-router-dom';

const DetailedView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clickedData } = location.state || {}; // Get data passed via state

  if (!clickedData) {
    return <p>No data available.</p>;
  }

  const handleGoBack = () => {
    navigate('/'); 
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Risk Details</h2>
      <p><strong>Category:</strong> {clickedData.category}</p>
      <p><strong>Score:</strong> {clickedData.score}</p>
      <p><strong>Risk Level:</strong> {clickedData.riskLevel}</p>
      
      {/* Button to navigate back to the landing page */}
      <button 
        onClick={handleGoBack} 
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Go Back to Dashboard
      </button>
    </div>
  );
};

export default DetailedView;
