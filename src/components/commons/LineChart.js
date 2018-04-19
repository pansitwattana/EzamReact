import React from 'react'
import { Line } from 'react-chartjs-2'

export default ({ labels, data, detail }) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: detail,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data
      }
    ]
  }

  return (
    <Line
      data={chartData}
      legend={{
        display: false,
        // labels: {
        //     fontColor: 'rgb(255, 99, 132)',
        //     fontSize: 12,
        //     boxWidth: 15,
        //     fillStyle: 'rgb(0, 0, 0)',
        // },
        // position: 'right',
        // usePointStyle: true
      }}
      options={{
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 12
            }
          }],
          yAxes: [{
            gridLines: {
              display: true
            },
            ticks: {
              stepSize: 1
            }
          }]
        },
      }}
    />
  )
}
