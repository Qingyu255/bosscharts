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

type Dataset = {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
};


type ChartData = {
  responsive: boolean
  labels: string[]
  datasets: Dataset[]
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
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
      maintainAspectRatio: false
    }
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <Chart type={type} data={chartData} options={options} width={width} height={height}/>
    </div>
  )
}
