'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarController,
  BarElement,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  Tooltip, 
  BarController,
  BarElement
  )

type chartProps = {
  chartData: {
    title: string,
    labels: string[],
    datasets: {
      data: number[],
      label: string,
      backgroundColor: string,
      borderColor: string,
      borderWidth: number,
    }[]
  }
}

export default function BarChart({ chartData }: chartProps) {
  // display course codes uppercase
  const upperCaseLabels = chartData.labels.map((label) => label.toUpperCase())
  const options = {
    scales: {
      x: {
        // type: 'category',
        labels: upperCaseLabels,
        title: {
          display: true,
          text: 'Bidding Window',
          font: {
            size: 15,
            family: 'Arial',
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Median Bid Price',
          font: {
            size: 15,
            family: 'Arial',
          },
        },
      },
    },
  };

  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center underline font-semibold'>{chartData.title}</h1>
      <div
        style={{
          width: '810px',
          height: '400px',
        }}
      >
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
