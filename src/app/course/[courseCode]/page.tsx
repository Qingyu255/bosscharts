"use client"
import React, { useState, useEffect } from 'react'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import DropDown from '@/components/DropDown'
import VisualiseTrendAcrossSemesters from '@/components/interactiveCharts/VisualiseTrendAcrossSemesters'

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

    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL

    const courseCode: string = params.courseCode.toUpperCase()
    // const [courseCode, setCourseCode] = useState<string>(params.courseCode)
    const [chartDataOverview, setChartDataOverview] = useState<any>(null)
    const [chartDataInstructorOverview, setChartDataInstructorOverview] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    
    const [courseInstructorsDropdownArr, setCourseInstructorsDropdownArr] = useState<string[]>()
    const [courseInstructorSelected, setCourseInstructorSelected] = useState<string>("")

    const [biddingWindowDropdownArr, setBiddingWindowDropdownArr] = useState<string[]>([])
    const [isBiddingWindowDropdownVisible, setIsBiddingWindowDropdownVisible] = useState<boolean>(false)
    const [selectedBiddingWindow, setSelectedBiddingWindow] = useState<string>("")

    const [hideDetailedCharts, setHideDetailedCharts] = useState<boolean>(false)

    // Manage state for filter by specified bidding window: to plot bid price against all regular terms for specified window
    const [chartDataInstructorsBiddingWindow, setChartDataInstructorsBiddingWindow] = useState<any>(null)

    const fetchAvailableBiddingWindowsOfInstructorWhoTeachCourse = async (courseCode: string, instructorName: string) => {
        try {
            const response = await fetch(`${apiURL}/instructordata/bidding_windows_available/${courseCode}/${instructorName}`)
            const jsonPayload = await response.json()
            const biddingWindowDropdownOptions = jsonPayload.data
            setBiddingWindowDropdownArr(biddingWindowDropdownOptions)
        } catch (error: any) {
            // setError(error)
            // console.error(error)
            setBiddingWindowDropdownArr(["No historic bidding windows"])
        }
    }

    const handleInstructorSelect = (instructorSelected: string) => {
        setCourseInstructorSelected(instructorSelected)
        console.log("Instructor Selected: " + instructorSelected)
        
        // reset dropdown options
        setSelectedBiddingWindow("")
        setBiddingWindowDropdownArr([])

        // hide charts until bidding window selected
        setHideDetailedCharts(true)

        // Now we fetch the windows in which this course has been bid for in the past
        fetchAvailableBiddingWindowsOfInstructorWhoTeachCourse(courseCode, instructorSelected)
        // Make bidding window dropdown visible
        setIsBiddingWindowDropdownVisible(true)
    }

    // Note that we can only handle winding window after courseInstructorSelected is set
    const handleBiddingWindowSelect = async (biddingWindow: string) => {
        console.log("Bidding Window Selected: " + biddingWindow)
        setSelectedBiddingWindow(biddingWindow)
        try {
            const response = await fetch(`${apiURL}/coursedata/bidpriceacrossterms/${courseCode}/${biddingWindow}/${courseInstructorSelected}`)
            const chartData = await response.json()
            setChartDataInstructorsBiddingWindow(chartData)

            // show charts again
            setHideDetailedCharts(false)

        } catch (error: any) {
            setError(error)
            console.error(error)
        }
        
    }

    useEffect(() => {
        const fetchCourseMinMaxMeanMedianMedianData = async () => {
            try {
                // try to fetch from api end point for the Course Min Max Mean Median Median Data
                const response = await fetch(`${apiURL}/coursedata/overview/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}\nCourse not Found`)
                }
                const chartData = await response.json()
                setChartDataOverview(chartData)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        const fetch_all_instructor_median_median_bid_by_course_code = async () => {
            try {
                // try to fetch from api end point for the Course Min Max Mean Median Median Data
                const response = await fetch(`${apiURL}/coursedata/overview/instructor_median_bid_chart/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}\nCourse not Found`)
                }
                const chartDataInstructorOverview = await response.json()
                setChartDataInstructorOverview(chartDataInstructorOverview)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }

        fetchCourseMinMaxMeanMedianMedianData()
        fetch_all_instructor_median_median_bid_by_course_code()

    }, [courseCode]);

    useEffect(() => {
        // Fetch dropdown options array for select instructor on page refresh
        const fetch_instructors_who_teach_course_code = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/instructordata/instructor/${courseCode}`)
                if (!response.ok) {
                    throw new Error(`${response.status}`)
                }
                const jsonPayload = await response.json()
                const courseInstructorsArr = jsonPayload.data
                setCourseInstructorsDropdownArr(courseInstructorsArr)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        fetch_instructors_who_teach_course_code()
    }, [])

    return (
        <div className='flex flex-col min-h-screen'>
            <p className='p-8 text-2xl font-bold'>Course Code: {courseCode}</p>
            {error ? (
                <div className="flex items-center p-4 m-4 text-sm rounded-xl text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Error: </span>{error.message}
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
                    <h1 className='text-3xl font-extrabold mx-20'>Visualise Trends Across Semesters</h1>
                    <VisualiseTrendAcrossSemesters courseCode={courseCode}></VisualiseTrendAcrossSemesters>
                </div>
                
            )}
            
            
            
        </div>
    )
}
