'use client'
import React, { useRef } from 'react'
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
}


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

  const clickTimeout = useRef<NodeJS.Timeout | null>(null)
  const clickCount = useRef<number>(0)

  const handleClick = (event: any, elements: any) => {
    const chart = elements[0].element.$context.chart
    if (chart.options.plugins.title.text !== "Median and Mean 'Median Bid' Price (across all sections) against Instructors") {
      return
      // as we only want double click functionality for the above title
    }
    clickCount.current += 1

    if (clickCount.current === 1) {
      clickTimeout.current = setTimeout(() => {
        clickCount.current = 0
      }, 300) // 300ms timeout for detecting double-click
    } else {
      if (clickTimeout.current) {
        clearTimeout(clickTimeout.current);
        clickCount.current = 0

        if (elements.length > 0) {
          const instructor_name = chart.data.labels[elements[0].index] as string;
          const link = "https://www.afterclass.io/professor/smu-" + instructor_name.split(" ").join("-").toLowerCase()
          window.open(link, '_blank') // will open link in a new tab
        }
      }
    }
  }

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },

    onClick: handleClick
  }

  return (
    <div className='flex flex-col'>
      <div className='sm:px-8'>
        <Bar data={chartData} options={options} width={width} height={height}/>
      </div>
    </div>
  );
}
