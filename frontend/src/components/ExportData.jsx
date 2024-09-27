import { CSVLink } from 'react-csv';

const ExportData = ({ data }) => {
  const csvData = data.map(item => ({
    Category: item.category,
    Score: item.score,
    RiskLevel: item.riskLevel,
  }));

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <CSVLink data={csvData} filename="risk-evaluation-report.csv" className="bg-blue-500 text-white px-4 py-2 rounded">
        Export Data
      </CSVLink>
    </div>
  );
};

export default ExportData;
