'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDebounce } from 'use-debounce'
import SearchSuggestionCard from './cards/SearchSuggestionCard'
import { Spinner } from '@nextui-org/react'

export default function HomeSearchBar({ search }: { search?: string }) {
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL

    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState<string>(search || "")
    const [query] = useDebounce(text, 750)
    const [uniqueCourses, setUniqueCourses] = useState<string[]>([])
    const [uniqueProfessors, setUniqueProfessors] = useState<string[]>([])
    const [courseSearchSuggestions, setCourseSearchSuggestions] = useState<string[]>([])
    const [professorSearchSuggestions, setProfessorSearchSuggestions] = useState<string[]>([])

    useEffect(() => {
        const fetchAllCourseCodes = async() => {
            const response = await fetch(`${apiURL}/uniquecourses`)
            const jsonPayload = await response.json()
            setUniqueCourses(jsonPayload.data)
        }
        const fetchAllProfessors = async() => {
            const response = await fetch(`${apiURL}/uniqueprofessors`)
            const jsonPayload = await response.json()
            setUniqueProfessors(jsonPayload.data)
        }
        fetchAllCourseCodes()
        fetchAllProfessors()
    }, [])

    const search_not_found_message: string = "No Matching Results"
    const getCourseSuggestions = (searchText: string) => {
        let courseSearchSuggestions = uniqueCourses.filter(course =>course.toUpperCase().includes(searchText.toUpperCase()))
        if (courseSearchSuggestions.length == 0) {
            courseSearchSuggestions = [search_not_found_message]
            setCourseSearchSuggestions(courseSearchSuggestions)
        } else if (courseSearchSuggestions.length == 1) {
            if (courseSearchSuggestions[0].split(":")[0] != text) {
                setCourseSearchSuggestions(courseSearchSuggestions)
            }
        } else {
            setCourseSearchSuggestions(courseSearchSuggestions)
        }
    }

    const getProfessorSuggestions = (searchText: string) => {
        let professorSearchSuggestions = uniqueProfessors.filter(professor =>professor.toUpperCase().includes(searchText.toUpperCase()))
        if (professorSearchSuggestions.length == 0) {
            professorSearchSuggestions = [search_not_found_message]
            setProfessorSearchSuggestions(professorSearchSuggestions)
        } else if (professorSearchSuggestions.length == 1) {
            if (professorSearchSuggestions[0].split(":")[0] != text) {
                setProfessorSearchSuggestions(professorSearchSuggestions)
            }
        } else {
            setProfessorSearchSuggestions(professorSearchSuggestions)
        }
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        if (query) {
            getCourseSuggestions(query)
            getProfessorSuggestions(query)
        }
    }, [query])

    // const handleSearchSelectedSuggestion = (courseCodeAndNameString: string) => {
    //     const courseCode = courseCodeAndNameString.split(":")[0]
    //     router.push(`/course/${courseCode}`)
    //     setText(courseCode)
    //     setCourseSearchSuggestions([])
    // }

    const handleKeyPressDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`/course/${text}`)
            setCourseSearchSuggestions([])
            setText(text.toUpperCase())
        }
    }

    return (
        <>
            <div className='rounded-xl w-full text-sm md:text-md'>
                <input
                    value={text}
                    placeholder='Search Course Code/Course Name/Professor'
                    // Maybe can add functionality to search professor too
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyPressDown}
                    className='w-full rounded-2xl border-2 border-gray-600 px-2 py-1.5 md:px-3 md:py-2 text-[12px] text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-sky-700 sm:text-sm'
                />
                <div className='pointer-events-none absolute right-[60px] md:right-[95px] top-[23px] md:top-[31px] flex items-center translate-x-full'>
                    <MagnifyingGlassIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                    />
                </div>
                {(courseSearchSuggestions.length > 0 || professorSearchSuggestions.length > 0) && (
                    <>
                        <h1 className='text-lg  md:text-xl font-semibold py-3'>COURSES</h1>
                        <div className='flex flex-col gap-y-1 max-h-80 overflow-y-auto '>
                            {courseSearchSuggestions.map((courseSearchSuggestion, index) => (
                                <SearchSuggestionCard
                                    key={index}
                                    text={courseSearchSuggestion}
                                    category='course'
                                >
                                </SearchSuggestionCard>
                            ))}
                        </div>
                   
                        <h1 className='text-lg  md:text-xl font-semibold py-3'>PROFESSORS</h1>
                        <div className='flex flex-col gap-y-1 max-h-80 overflow-y-auto '>
                            {professorSearchSuggestions.map((professorSearchSuggestion, index) => (
                                <SearchSuggestionCard
                                    key={index}
                                    text={professorSearchSuggestion}
                                    category='professor'
                                >
                                </SearchSuggestionCard>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
    
}
