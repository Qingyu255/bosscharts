import React from 'react'
import LineChart from '@/components/charts/LineChart'

const dummyData = {
    title: "This is a dummy chart",
    labels: ["window 1", "window 2", "window 2", "window 4", "window 5", "window 6", "window 7", "window 8"], // Array of labels
    datasets: [
      {
        data: [10, 25, 20, 38, 44, 50, 52, 53, 56], // Array of data values
        label: "Bid Price", // Label for the dataset
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Background color for the bars
        borderColor: "rgba(75, 192, 192, 1)", // Border color for the bars
        borderWidth: 2, // Border width for the bars
      }
    ]
}

export default function page({ params } : {params: {courseCode: string}}) {
    return (
        <div className='flex flex-col min-h-screen'>
            <p className='p-3'>Course Code: {params.courseCode}</p>
            <div className='flex justify-center'>
                <LineChart chartData={dummyData} />
            </div>
            
        </div>
    )
}
