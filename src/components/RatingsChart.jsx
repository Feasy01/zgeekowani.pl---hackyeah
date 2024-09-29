import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const RatingsChart = ({ goodRatings, badRatings }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const data = {
      labels: ['Good Ratings', 'Bad Ratings'],
      datasets: [{
        label: 'Ratings',
        data: [goodRatings, badRatings], 
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)', 
          'rgba(255, 99, 132, 0.2)'  
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    if (chartRef.current) {
        chartRef.current.destroy();
      }

    new Chart(ctx, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [goodRatings, badRatings]); // Re-render chart when data changes

  return <canvas ref={chartRef} />;
};

export default RatingsChart;