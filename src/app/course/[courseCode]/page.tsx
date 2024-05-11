"use client"
import React, { useState, useEffect, useRef } from 'react'
import ErrorPopUp from '@/components/ErrorPopUp'
import LineChart from '@/components/charts/LineChart'
import BarChart from '@/components/charts/BarChart'
import VisualiseTrendAcrossSemesters from '@/components/interactiveCharts/VisualiseTrendAcrossSemesters'
import adjustChartWidthHeight from '@/components/charts/chartUtils/adjustChartWidthHeight'
import MultitypeChart from '@/components/charts/MultitypeChart'

interface Dataset {
    label: string;
    data: number[];
    borderColor: string;
    borderWidth: number;
    backgroundColor: string;
}
interface ChartData {
    responsive: boolean;
    labels: string[];
    datasets: Dataset[];
}
interface ApiResponse {
    title: string;
    chartData: ChartData;
}

export default function page({ params } : {params: {courseCode: string}}) {

    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL

    const courseCode: string = params.courseCode.toUpperCase()
    const [courseName, setCourseName] = useState<string>("")
    const [chartDataOverview, setChartDataOverview] = useState<ApiResponse>()
    const [chartDataInstructorOverview, setChartDataInstructorOverview] = useState<ApiResponse>()
    const [error, setError] = useState<any>(null)
    
    const [chartWidthHeightArr, setChartWidthHeightArr] = useState<string[]>(["", ""])

    useEffect(() => {
        const fetchCourseName = async () => {
            try {
                const response = await fetch(`${apiURL}/coursename/${courseCode}`)
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
        <div className='flex flex-col md:px-10 lg:px-20 xl:px-30'>
            <p className='px-4 md:px-8 py-3 md:py-8 text-lg sm:text-xl md:text-2xl font-bold'>COURSE CODE: {courseCode} ({courseName})</p>
            {error ? (
                <ErrorPopUp error={error}></ErrorPopUp>
            ) 
            : (chartDataOverview && chartDataInstructorOverview &&(
                <div className='flex flex-col gap-y-5 px-5'>
                    <BarChart 
                        title={chartDataOverview.title} 
                        chartData={chartDataOverview.chartData} 
                        width={chartWidthHeightArr[0]} 
                        height={chartWidthHeightArr[1]}
                        key={`${chartWidthHeightArr[0]}-${chartWidthHeightArr[1]}-1`} // We are forcing a re-render whenever the width and height change since we need to display the updated canvas image
                        // Note: When the key changes, React will unmount the current component instance and mount a new one, effectively forcing a re-render
                    />
                    <BarChart
                        title={chartDataInstructorOverview.title} 
                        chartData={chartDataInstructorOverview.chartData} 
                        width={chartWidthHeightArr[0]} 
                        height={chartWidthHeightArr[1]}
                        key={`${chartWidthHeightArr[0]}-${chartWidthHeightArr[1]}-2`} // to force re-render
                    />
                    {/* <MultitypeChart
                        type="bar"
                        title={chartDataInstructorOverview.title} 
                        chartData={chartDataInstructorOverview.chartData} 
                        width={chartWidthHeightArr[0]} 
                        height={chartWidthHeightArr[1]}
                        key={`${chartWidthHeightArr[0]}-${chartWidthHeightArr[1]}-2`} // to force re-render
                    /> */}
                    
                    <VisualiseTrendAcrossSemesters 
                        courseCode={courseCode} 
                        width={chartWidthHeightArr[0]}  
                        height={chartWidthHeightArr[1]}>
                    </VisualiseTrendAcrossSemesters>
                </div>
                
            ))}
            
            
            
        </div>
    )
}
