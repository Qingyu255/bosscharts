'use client'
import React, { useEffect, useState } from "react"
import CourseCodeCard from "@/components/cards/CourseCodeCard"
import LineChart from "@/components/charts/LineChart"
import BarChart from "@/components/charts/BarChart"
import DropDown from "@/components/DropDown"

// Fetch relevant bid data from api here
const dummyData = {
    title: "This is a dummy chart",
    labels: ["fa101", "da102", "acc111", "fa112", "fa113", "ma114"], // Array of labels
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
// RMB THAT WE CAN ONLY MAP ARRAYS
const dummyCourseCodeArray = [
    { faculty: 'law', courses: ["law101", "law102", "law111", "law112", "law113", "law114"] },
    { faculty: 'scis', courses: ["is101", "is102", "is111", "is112", "is113", "is114"] },
    { faculty: "soss", courses: ["pysch101", "pysch102", "pysch111", "pysch112", "pysch113", "pysch114"]},
    { faculty: "business", courses: ["fa101", "da102", "acc111", "fa112", "fa113", "ma114"]},
    { faculty: "economics", courses: ["econ101", "econ102", "econ111", "econ112", "econ113", "econ114"]},
    { faculty: "accountancy", courses: ["act101", "law102", "law111", "law112", "law113", "law114"]},
    { faculty: "cis", courses: ["cis101", "is102", "is111", "is112", "is113", "is114"]}
    // ... Define similar objects for other faculties
]
const professorData: string[] = [
    "Professor Smith",
    "Dr. Johnson",
    "Professor Wilson",
    "Dr. Anderson",
    "Professor Brown",
    "Dr. Davis",
    "Professor Taylor",
    "Dr. Martinez",
    "Professor White",
    "Dr. Clark",
]
const academicTerms = [
    "Fall 2023",
    "Spring 2024",
    "Summer 2024",
    "Fall 2024",
    "Spring 2025",
    "Summer 2025",
    "Fall 2025",
    "Spring 2026",
    "Summer 2026",
    "Fall 2026",
]

export default function page({ params }: { params: { facultyName: string }}) {

    // use .find() to search through array, facultyData is assigned the hashmap in the array where the faculty name matched
    const facultyData = dummyCourseCodeArray.find(item => item.faculty === params.facultyName)

    const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
    const [selectedProf, setSelectedProf] = useState<string | null>(null)
    const [selectedAcademicTerm, setSelectedAcademicTerm] = useState<string | null>(null)
    const [selectedBiddingWindow, setSelectedBiddingWindow] = useState<string | null>(null)

    const [chartType, setChartType] = useState<string>("bar")
    const [chartData, setChartData] = useState<any>(dummyData)

    function dropDownHandler(option: string, category: string) {
        switch (category) {
          case "Course":
            setSelectedCourse(option)
            break
          case "Professors":
            setSelectedProf(option)
            break
          case "Academic Term":
            setSelectedAcademicTerm(option)
            break
          case "Bidding Window":
            setSelectedBiddingWindow(option)
            break
          default:
            break
        }
      }
    

    function chartTypeHandler(newChartType: string) {
        setChartType(newChartType)
    }
    
    function chartDataHandler(newChartData: any) {
        setChartData(newChartData)
    }

    useEffect(() => {
        if (selectedCourse !== null) {
            setChartType("line")
        }
    }, [selectedCourse, selectedProf, selectedAcademicTerm, selectedBiddingWindow])

    return (
        <>
            <h1 className="font-semibold text-2xl py-4 px-12">{params.facultyName.toUpperCase()}</h1>
            <div className="flex flex-row px-12 gap-6">
                <DropDown category="Course" options={facultyData?.courses} onSelect={(option) => dropDownHandler(option, "Course")}/>
                <DropDown category="Professors" options={professorData} onSelect={(option) => dropDownHandler(option, "Professors")}/>
                <DropDown category="Academic Term" options={academicTerms} onSelect={(option) => dropDownHandler(option, "Academic Term")}/>
                <DropDown category="Bidding Window" options={[]} onSelect={(option) => dropDownHandler(option, "Bidding Window")}/>
            </div>
            
            <div className="flex min-h-screen flex-rows px-12 py-4 justify-center">
                <div>
                    <div>
                        {(chartType === "bar") && <BarChart chartData={dummyData}/>}
                        {(chartType === "line") && <LineChart chartData={dummyData}/>}
                    </div>
                </div>
                {/* <div className="flex justify-center px-12">
                    <div className="flex flex-col gap-3 py-4 w-fit">
                        {facultyData? (
                            facultyData.courses.map((courseCode, index) =>
                            (
                                <div className="w-fit">
                                    <CourseCodeCard key={index} courseCode={courseCode}/>
                                </div>
                            )
                        )) : (
                            <p className="font-bold italic text-red-600">Oop, an Error occured</p>
                        )}
                    </div>
                </div> */}
            </div>
        </>
  )
}
