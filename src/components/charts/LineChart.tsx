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

export default function LineChart({ chartData }: chartProps) {
  const options = {
      scales: {
        x: {
          // type: 'category', // Use 'category' scale for x-axis
          // labels: chartData.labels,
          title: {
            display: true,
            text: "Bidding Window",
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
            text: "Median Bid Price",
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
