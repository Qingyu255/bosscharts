import React, { useState, useEffect, useRef } from 'react'
import LineChart from '@/components/charts/LineChart'
import DropDown from '@/components/DropDown'
import ErrorPopUp from "@/components/ErrorPopUp"

type Dataset = {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
};
  
type ChartData = {
    responsive: boolean;
    labels: string[];
    datasets: Dataset[];
};

type chartAttributes = {
    width: string
    height: string
    title: string
    chartData: ChartData
  }

export default function VisualiseTrendAcrossSemesters({courseCode, width, height} : {courseCode: string, width: string, height: string}) {
    
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL
    const initComponentsMounted = useRef(false)

    const [error, setError] = useState<any>(null)

    const [courseInstructorsDropdownArr, setCourseInstructorsDropdownArr] = useState<string[]>()
    const [courseInstructorSelected, setCourseInstructorSelected] = useState<string>("")

    const [biddingWindowDropdownArr, setBiddingWindowDropdownArr] = useState<string[]>([])
    const [isBiddingWindowDropdownVisible, setIsBiddingWindowDropdownVisible] = useState<boolean>(false)
    const [selectedBiddingWindow, setSelectedBiddingWindow] = useState<string>("")

    const [hideDetailedCharts, setHideDetailedCharts] = useState<boolean>(false)

    // Manage state for filter by specified bidding window: to plot bid price against all regular terms for specified window
    const [chartDataInstructorsBiddingWindow, setChartDataInstructorsBiddingWindow] = useState<chartAttributes>()

    const fetchAvailableBiddingWindowsOfInstructorWhoTeachCourse = async (courseCode: string, instructorName: string) => {
        try {
            const response = await fetch(`${apiURL}/instructordata/bidding_windows_available/${courseCode}/${instructorName}`)
            const jsonPayload = await response.json()
            const biddingWindowDropdownOptions = jsonPayload.data
            setBiddingWindowDropdownArr(biddingWindowDropdownOptions || [])
        } catch (error: any) {
            // setError(error)
            // console.error(error)
            setBiddingWindowDropdownArr(["No historic bidding windows"])
        }
    }

    const handleInstructorSelect = (instructorSelected: string) => {
        setCourseInstructorSelected(instructorSelected)
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
        // Fetch dropdown options array for select instructor on page refresh
        const fetch_instructors_who_teach_course_code = async () => {
            try {
                const response = await fetch(`${apiURL}/instructordata/instructor/${courseCode}`)
                // if (!response.ok) {
                //     throw new Error(`${response.status}`)
                // }
                const jsonPayload = await response.json()
                setCourseInstructorsDropdownArr(jsonPayload.data)

            } catch (error: any) {
                setError(error)
                console.error(error)
            }
        }
        fetch_instructors_who_teach_course_code()
    }, [])
    
    useEffect(() => {
        // scroll behaviour: will not scroll on first page load
        if (initComponentsMounted.current) {
            window.scrollTo({
            top: document.body.scrollHeight - 20,
            behavior: 'smooth'
            })
        } else {
            initComponentsMounted.current = true
        }
    }, [chartDataInstructorsBiddingWindow])

    return (
        <>
            <h1 className='text-xl md:text-2xl font-extrabold'>Bid Price Trend Across Semesters</h1>
            {error ? (
                <ErrorPopUp error={error}></ErrorPopUp>
            ) 
            : (
                <div className='flex flex-col gap-y-5 pb-5'>
                    <div className='flex flex-row justify-leftitems-center gap-x-5'>
                        <DropDown 
                            category='Instructor'
                            onSelect={handleInstructorSelect}
                            options={courseInstructorsDropdownArr}
                        >
                        </DropDown>
                    
                    {(isBiddingWindowDropdownVisible && biddingWindowDropdownArr.length > 0) && (
                        <DropDown 
                            category='Bidding Window'
                            onSelect={handleBiddingWindowSelect}
                            options={biddingWindowDropdownArr}
                        >
                        </DropDown>
                    )}
                    </div>
                    {(!hideDetailedCharts && selectedBiddingWindow && chartDataInstructorsBiddingWindow) && (
                        <div className='px-5 sm:px-8'>
                            <LineChart 
                                title={chartDataInstructorsBiddingWindow.title}
                                chartData={chartDataInstructorsBiddingWindow.chartData} 
                                width={width}
                                height={height}
                                key={`${width}-${height}`} // We are forcing a re-render whenever the width and height change since we need to display the updated canvas image
                                // Note: When the key changes, React will unmount the current component instance and mount a new one, effectively forcing a re-render
                            />
                        </div>
                        
                    )}
                </div>
            )}
        </>
    )
}


