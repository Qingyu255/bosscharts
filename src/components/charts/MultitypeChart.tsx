"use client"
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  LineController,
  BarController,
  ChartOptions
} from "chart.js"
import { Chart, ChartProps }  from 'react-chartjs-2'

// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Title,
  Legend,
  LineController,
  BarController
)

type MultitypeChartDataset = {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
  yAxisID: string
}


type ChartData = {
  responsive: boolean
  labels: string[]
  datasets: MultitypeChartDataset[]
};

type chartAttributes = {
  type: string
  title: string
  chartData: ChartData
  width: string
  height: string
}

export default function MultitypeChart( {type, title, chartData, width, height} : chartAttributes ) {
  if (!chartData) {
    // return if chartData is null. For example when course code not found
    return null
  }

  const options = {
    tooltips: {
      enabled: true,
      mode: 'label',
    },
    plugins: {
      legend: {
        mode: 'index' as const,
        intersect: false,
      },
      stacked: false,
      title: {
        display: true,
        text: title,
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: "rgba(53, 162, 235, 0.5)"
          }
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            display: false
          }
        },
      },
    }
  }

  return (
    <div className='flex flex-col justify-center items-center max-h-[750px]'>
      <Chart type={type} data={chartData} options={options} width={width} height={height}/>
    </div>
  )
}
