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
    x_axis_label: String,
    y_axis_label: String,
    x_axis_values: string[],
    datasets: {
      data: number[],
      backgroundColor: string,
      borderColor: string,
      borderWidth: number,
    }[]
  }
}

export default function BarChart({ chartData }: chartProps) {
  if (!chartData) {
    // return if chartData is null. For example when course code not found
    return null
  }
  // display course codes uppercase
  const upperCaseLabels = chartData.x_axis_values.map((label) => label.toUpperCase())
  const options = {
    scales: {
      x: {
        // type: 'category',
        labels: upperCaseLabels,
        title: {
          display: true,
          text: chartData.x_axis_label,
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
          text: chartData.y_axis_label,
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
