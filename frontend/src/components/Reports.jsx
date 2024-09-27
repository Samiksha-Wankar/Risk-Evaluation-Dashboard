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
      <button onClick={generateReport} className="bg-green-500 text-white px-4 py-2 rounded">Generate Report</button>
      {report && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">{report}</pre>
      )}
    </div>
  );
};

export default Reports;
