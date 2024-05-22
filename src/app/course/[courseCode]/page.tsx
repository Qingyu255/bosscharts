"use client"
import React, { useState, useEffect, useRef } from 'react'
import ErrorPopUp from '@/components/ErrorPopUp'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import adjustChartWidthHeight from '@/components/charts/chartUtils/adjustChartWidthHeight'
import VisualiseTrendAcrossSemesters from '@/components/interactiveCharts/VisualiseTrendAcrossSemesters'
import VisualiseTrendAcrossBiddingWindows from '@/components/interactiveCharts/VisualiseTrendAcrossBiddingWindows'
import VisualiseBidPriceForSpecificInstructorTermSection from '@/components/interactiveCharts/VisualiseBidPriceForSpecificInstructorTermSection'
import { Spinner } from '@nextui-org/react'

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

export default function Page({ params } : {params: {courseCode: string}}) {
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL
    const courseCode: string = params.courseCode.toUpperCase()
    const [courseName, setCourseName] = useState<string>("")
    const [chartDataOverview, setChartDataOverview] = useState<chartAttributes>()
    const [chartDataInstructorOverview, setChartDataInstructorOverview] = useState<chartAttributes>()
    const [error, setError] = useState<any>(null)
    const [chartWidthHeightArr, setChartWidthHeightArr] = useState<string[]>(["", ""])
    const [isSCISCourse, setIsSCISCourse] = useState<boolean>(false)

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
                // courseCode should be in upper case
                if (courseCode.slice(0, 2) == "IS" || courseCode.slice(0, 2) == "CS" || courseCode.slice(0, 6) == "COR-IS" ) {
                    // show button for scis students to navigate to official course description
                    setIsSCISCourse(true)
                }
            } catch (error: any) {
                setCourseName("Not Found")
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

    const navigateToISCourseDescriptionPage = (courseCode: string) => {
        window.open("https://smu.sg/cdd-" + courseCode.toUpperCase(), "_blank")
    }

    return (
        <>
            <div className='flex flex-col px-5 md:px-20 lg:px-32 xl:px-40 2xl:px-96'>
                <p className='px-4 md:px-8 py-3 md:py-8 text-lg sm:text-xl md:text-2xl font-bold'>COURSE CODE: {courseCode} ({courseName})</p>
                {error ? (
                    <ErrorPopUp error={error}></ErrorPopUp>
                ) 
                : (chartDataOverview && chartDataInstructorOverview ? (
                    <>
                        {isSCISCourse && (
                            <button onClick={() => navigateToISCourseDescriptionPage(courseCode)} className='flex justify-left mx-4 md:mx-8 p-1 px-1.5 border-2 w-fit rounded-xl hover:bg-gray-200 text-xs sm:text-sm'>
                                View Course Information
                            </button>
                        )}
                        <div className='flex flex-col gap-y-5'>
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
                                <p className='text-gray-500 text-xs sm:text-sm pt-3 sm:pt-5'>*Double click bar to see instructor's Afterclass reviews (if it exists)</p>
                            </div>
                            <div>
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

                                <VisualiseBidPriceForSpecificInstructorTermSection
                                    courseCode={courseCode} 
                                    width={chartWidthHeightArr[0]}  
                                    height={chartWidthHeightArr[1]}>
                                </VisualiseBidPriceForSpecificInstructorTermSection>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='flex justify-center items-center pb-8'>
                        <Spinner />
                    </div>   
                ))}
            </div>
        </>
    )
}
