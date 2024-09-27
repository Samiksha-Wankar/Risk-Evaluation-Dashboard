import { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

const ChartComponent = ({ data }) => {
  const chartRef = useRef(); // Create a ref for the chart
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleClick = (event) => {
    const activePoints = chartRef.current.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
    if (activePoints.length > 0) {
      const { index } = activePoints[0];
      const clickedData = data[index];
      console.log('Clicked data:', clickedData);
      // Navigate to the detailed view, passing clicked data in the state
      navigate('/details', { state: { clickedData } });
    }
  };

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      label: 'Risk Score',
      data: data.map(item => item.score),
      backgroundColor: data.map(item =>
        item.riskLevel === 'Low' ? 'rgba(75, 192, 192, 0.8)' :
        item.riskLevel === 'Medium' ? 'rgba(255, 206, 86, 0.8)' :
        'rgba(255, 99, 132, 0.8)'
      ),
      borderColor: '#fff',
      borderWidth: 2,
      hoverBackgroundColor: 'rgba(0, 0, 0, 0.7)',
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: '#333',
        titleFont: { size: 16 },
        bodyFont: { size: 14, weight: 'bold' },
        padding: 10,
        callbacks: {
          label: function (tooltipItem) {
            return `Risk Level: ${tooltipItem.raw}`;
          }
        },
      },
    },
    animation: {
      duration: 500,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div className="relative w-full h-full bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105 duration-300">
      <Bar
        ref={chartRef}
        data={chartData}
        options={options}
        onClick={handleClick} // Attach click handler
      />
    </div>
  );
};

export default ChartComponent;
