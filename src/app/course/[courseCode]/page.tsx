"use client"
import React, { useState, useEffect, useRef } from 'react'
import ErrorPopUp from '@/components/ErrorPopUp'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import adjustChartWidthHeight from '@/components/charts/chartUtils/adjustChartWidthHeight'
import VisualiseTrendAcrossSemesters from '@/components/interactiveCharts/VisualiseTrendAcrossSemesters'
import VisualiseTrendAcrossBiddingWindows from '@/components/interactiveCharts/VisualiseTrendAcrossBiddingWindows'
type Dataset = {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
}
  
interface ChartData {
    responsive: boolean;
    labels: string[];
    datasets: Dataset[];
}
type chartAttributes = {
    type?: string
    title: string
    chartData: ChartData
    width: string
    height: string
  }

export default function page({ params } : {params: {courseCode: string}}) {
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL
    const courseCode: string = params.courseCode.toUpperCase()
    const [courseName, setCourseName] = useState<string>("")
    const [chartDataOverview, setChartDataOverview] = useState<chartAttributes>()
    const [chartDataInstructorOverview, setChartDataInstructorOverview] = useState<chartAttributes>()
    const [error, setError] = useState<any>(null)
    const [chartWidthHeightArr, setChartWidthHeightArr] = useState<string[]>(["", ""])

    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const response = await fetch(`${apiURL}/coursename/${courseCode}`)
                if (!response.ok) {
                    const errorResponse = await response.json()
                    throw new Error(`${response.status}: ${errorResponse.detail}`) 
                }
                const courseName = await response.json()
                setCourseName(courseName)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        const fetchCourseMinMaxMeanMedianMedianData = async () => {
            try {
                // try to fetch from api end point for the Course Min Max Mean Median Median Data
                const response = await fetch(`${apiURL}/coursedata/overview/${courseCode}`)
                if (!response.ok) {
                    const errorResponse = await response.json()
                    throw new Error(`${response.status}: ${errorResponse.detail}`)                }
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
                    const errorResponse = await response.json()
                    throw new Error(`${response.status}: ${errorResponse.detail}`)
                }
                const chartDataInstructorOverview = await response.json()
                setChartDataInstructorOverview(chartDataInstructorOverview)
            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        fetchCourseName()
        fetchCourseMinMaxMeanMedianMedianData()
        fetch_all_instructor_median_median_bid_by_course_code()
    }, [courseCode]);

    useEffect(() => {
        const handleResize = () => {
            // Use ref to get the latest chart data
            const updatedWidthHeightArr: string[] = adjustChartWidthHeight()
            setChartWidthHeightArr(updatedWidthHeightArr) 
        }
        // Mount resize event listener
        window.addEventListener('resize', handleResize)
        // call handle resize immediately on page load
        handleResize()
        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div className='flex flex-col px-2 md:px-10 lg:px-20 xl:px-32 2xl:px-20'>
            <p className='px-4 md:px-8 py-3 md:py-8 text-lg sm:text-xl md:text-2xl font-bold'>COURSE CODE: {courseCode} ({courseName})</p>
            {error ? (
                <ErrorPopUp error={error}></ErrorPopUp>
            ) 
            : (chartDataOverview && chartDataInstructorOverview &&(
                <div className='flex flex-col gap-y-5'>
                    <div className='2xl:flex 2xl:flex-row 2xl:justify-center 2xl:items-center'>
                        <BarChart 
                            title={chartDataOverview.title} 
                            chartData={chartDataOverview.chartData} 
                            width={chartWidthHeightArr[0]} 
                            height={chartWidthHeightArr[1]}
                            key={`${chartWidthHeightArr[0]}-${chartWidthHeightArr[1]}-1`} // We are forcing a re-render whenever the width and height change since we need to display the updated canvas image
                            // Note: When the key changes, React will unmount the current component instance and mount a new one, effectively forcing a re-render
                        />
                        <div className=' flex flex-col'>
                            <BarChart
                                title={chartDataInstructorOverview.title} 
                                chartData={chartDataInstructorOverview.chartData} 
                                width={chartWidthHeightArr[0]} 
                                height={chartWidthHeightArr[1]}
                                key={`${chartWidthHeightArr[0]}-${chartWidthHeightArr[1]}-2`} // to force re-render
                            />
                            <p className='text-gray-500 text-xs sm:text-sm pt-3 sm:pt-5'>*Double click bar to see instructor's Afterclass review page(if it exists)</p>
                        </div>
                    </div>
                    <div className='2xl:px-40'>
                        <VisualiseTrendAcrossSemesters 
                            courseCode={courseCode} 
                            width={chartWidthHeightArr[0]}  
                            height={chartWidthHeightArr[1]}>
                        </VisualiseTrendAcrossSemesters>

                        <VisualiseTrendAcrossBiddingWindows
                            courseCode={courseCode} 
                            width={chartWidthHeightArr[0]}  
                            height={chartWidthHeightArr[1]}>
                        </VisualiseTrendAcrossBiddingWindows>
                    </div>
                </div> 
            ))}
        </div>
    )
}
