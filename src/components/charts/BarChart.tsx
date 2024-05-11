'use client'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  BarController,
  BarElement,
  Title,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Title,
  Legend
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
  title: string
  chartData: ChartData
  width: string
  height: string
}

export default function BarChart({ title, chartData, width, height }: chartAttributes) {
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
    },
    maintainAspectRatio: false
  }

  return (
    <div className='flex flex-col'>
      <div className='sm:px-8'>
        <Bar data={chartData} options={options} width={width} height={height}/>
      </div>
    </div>
  );
}
