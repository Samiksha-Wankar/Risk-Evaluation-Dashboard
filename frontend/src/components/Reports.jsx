import { useState } from 'react';

const Reports = ({ data }) => {
  const [report, setReport] = useState(null);

  const generateReport = () => {
    // Generating simple textual report
    const reportDetails = data.map(item => `Category: ${item.category}, Score: ${item.score}, Risk Level: ${item.riskLevel}`).join('\n');
    setReport(reportDetails);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <button 
        onClick={generateReport} 
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Generate Report
      </button>
      {report && (
        <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-inner">
          <h3 className="font-bold text-lg mb-2">Generated Report:</h3>
          <pre className="whitespace-pre-wrap text-sm text-gray-700">{report}</pre>
        </div>
      )}
    </div>
  );
};

export default Reports;
