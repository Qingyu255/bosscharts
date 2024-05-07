"use client"
import React, { useState, useEffect } from 'react'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import DropDown from '@/components/DropDown'

// const dummyData = {
//     title: "Loading",
//     x_axis_label: "Bidding Window",
//     y_axis_label: "Bid Price",
//     x_axis_values: ["Loading"], // Array of labels
//     datasets: [
//       {
//         data: [0], // Array of data values
//         backgroundColor: "rgba(75, 192, 192, 0.6)", // Background color for the bars
//         borderColor: "rgba(75, 192, 192, 1)", // Border color for the bars
//         borderWidth: 2, // Border width for the bars
//       }
//     ]
// }

export default function page({ params } : {params: {courseCode: string}}) {
    const courseCode = params.courseCode
    const [chartDataOverview, setChartDataOverview] = useState<any>(null)
    const [chartDataInstructorOverview, setChartDataInstructorOverview] = useState<any>(null)
    const [error, setError] = useState<string>("")

    const [courseInstructorsArr, setCourseInstructorsArr] = useState<string[]>()
    const [courseInstructorSelected, setCourseInstructorSelected] = useState<string[]>()

    function handleInstructorSelect(instructorSelected: string) {

    }

    useEffect(() => {
        const fetchCourseMinMaxMeanMedianMedianData = async () => {
            try {
                // try to fetch from api end point for the Course Min Max Mean Median Median Data
                const response = await fetch(`http://127.0.0.1:8000/coursedata/overview/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}\nCourse not Found`)
                }
                const chartDataOverview = await response.json()
                setChartDataOverview(chartDataOverview)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        const fetch_all_instructor_median_median_bid_by_course_code = async () => {
            try {
                // try to fetch from api end point for the Course Min Max Mean Median Median Data
                const response = await fetch(`http://127.0.0.1:8000/coursedata/overview/instructor_median_bid_chart/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}\nCourse not Found`)
                }
                const chartDataInstructorOverview = await response.json()
                setChartDataInstructorOverview(chartDataInstructorOverview)
            } catch (error: any) {
                setError(error.message)
                console.error(error)
            }
        }


        fetchCourseMinMaxMeanMedianMedianData()
        fetch_all_instructor_median_median_bid_by_course_code()
    }, [courseCode]);

    useEffect(() => {
        const fetch_instructors_who_teach_course_code = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/instructordata/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                }
                const jsonObj = await response.json()
                const courseInstructorsArr = jsonObj.data
                setCourseInstructorsArr(courseInstructorsArr)
            } catch (error: any) {
                setError(error.message)
                console.error(error)
            }
        }
        fetch_instructors_who_teach_course_code()
    }, [])

    return (
        <div className='flex flex-col min-h-screen'>
            <p className='p-8 text-2xl font-bold'>Course Code: {params.courseCode}</p>
            {error ? (
                <div className="flex items-center p-4 m-4 text-sm rounded-xl text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Error: </span>{error}
                    </div>
                </div>
            ) 
            : (
                <div className='flex flex-col gap-y-5'>
                    <div className='flex justify-center'>
                        <BarChart chartData={chartDataOverview} />
                    </div>
                    <div className='flex justify-center'>
                        <BarChart chartData={chartDataInstructorOverview} />
                    </div>
                    <div className='flex justify-center'>
                        <LineChart chartData={chartDataInstructorOverview} />
                    </div>
                    <div className='flex justify-left m-20 items-center'>
                        <DropDown 
                            category='Instructor'
                            onSelect={handleInstructorSelect}
                            options={courseInstructorsArr}
                        >
                        </DropDown>
                    </div>
                    
                </div>

            )}
            
            
        </div>
    )
}
