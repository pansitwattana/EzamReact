import React from 'react'
import { HorizontalBar } from 'react-chartjs-2'

export default ({ labels, data, detail }) => {
  const chartData = {
    labels,
    datasets: [{
      label: detail,
      data: data,
      backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ]
    }]
  }

  return (
    <HorizontalBar
      data={chartData}
      legend={{
        display: false,
      }}
      options={{
        responsive: true,
        scales: {
            yAxes: [{
                borderWidth: 40,
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }}
    />
  )
}
