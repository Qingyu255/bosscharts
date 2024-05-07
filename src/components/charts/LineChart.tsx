"use client"
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js"
import { Line }  from 'react-chartjs-2'

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
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

export default function LineChart({ chartData }: chartProps) {
  if (!chartData) {
    // return if chartData is null. For example when course code not found
    return null
  }

  const upperCaseLabels = chartData.x_axis_values.map((label) => label.toUpperCase())
  const options = {
      scales: {
        x: {
          // type: 'category', // Use 'category' scale for x-axis
          labels: upperCaseLabels,
          title: {
            display: true,
            text: chartData.x_axis_label,
            font: {
              size: 15,
              // style: "italic",
              family: "Arial",
            },
          },
        },
        y: {
          // beginAtZero: true,
          // min: 10,
          title: {
            display: true,
            text: chartData.y_axis_label,
            font: {
              size: 15,
              // style: "italic",
              family: "Arial",
            },
          },
        },
      },
    }
    return (
      <div className='flex flex-col'>
        <h1 className='flex justify-center underline font-semibold'>{chartData.title}</h1>
        <div style={{
                width: "810px",
                height: "400px",
                // cursor: "pointer",
              }}
          >
            <Line data={chartData} options={options}/>
          </div>
      </div>
        
  )
}
