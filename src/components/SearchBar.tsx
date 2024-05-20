'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useDebounce } from 'use-debounce'

export default function SearchBar({ search }: { search?: string }) {
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL

    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState<string>(search || "")
    const [query] = useDebounce(text, 750)
    const [uniqueCourses, setUniqueCourses] = useState<string[]>([])
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

    useEffect(() => {
        const fetchAllCourseCodes = async() => {
            const response = await fetch(`${apiURL}/uniquecourses`)
            const jsonPayload = await response.json()
            setUniqueCourses(jsonPayload.data)
        }
        fetchAllCourseCodes()
    }, [])

    const search_not_found_message: string = "course code not found"
    const getSuggestions = (searchText: string) => {
        let searchSuggestions = uniqueCourses.filter(course =>course.toUpperCase().includes(searchText.toUpperCase()))
        if (searchSuggestions.length == 0) {
            searchSuggestions = [search_not_found_message]
            setSearchSuggestions(searchSuggestions)
        } else if (searchSuggestions.length == 1) {
            if (searchSuggestions[0].split(":")[0] != text) {
                setSearchSuggestions(searchSuggestions)
            }
        } else {
        setSearchSuggestions(searchSuggestions)
        }
    }

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        if (query) {
            getSuggestions(query)
        }
    }, [query])

    const handleSearchSelectedSuggestion = (courseCodeAndNameString: string) => {
        const courseCode = courseCodeAndNameString.split(":")[0]
        router.push(`/course/${courseCode}`)
        setText(courseCode)
        setSearchSuggestions([])
    }

    const handleKeyPressDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            router.push(`/course/${text}`)
            setSearchSuggestions([])
            setText(text.toUpperCase())
        }
    }

    return (
        <>
            <div className='rounded-xl w-[200px] sm:w-80 text-sm md:text-md'>
                <input
                    value={text}
                    placeholder='Search Course Code/Course Name'
                    // Maybe can add functionality to search professor too
                    onChange={e => setText(e.target.value)}
                    onKeyDown={handleKeyPressDown}
                    className='w-full rounded-md border-0 px-2 py-1.5 md:px-3 md:py-2 text-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-sky-700 sm:text-sm '
                />
                <div className='pointer-events-none absolute right-[65px] sm:right-[170px] md:right-[180px] top-[23px] md:top-[31px] flex items-center translate-x-full'>
                    <MagnifyingGlassIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                    />
                </div>
                {searchSuggestions.length > 0 && (
                    <ul className='absolute z-10 w-fit bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                        {searchSuggestions.map((searchSuggestion, index) => (
                            <li
                                key={index}
                                className='p-2 hover:bg-gray-200 cursor-pointer break-words'
                                onClick={() => { 
                                    if (searchSuggestion !== search_not_found_message) {
                                        // will not be able to select on course code not found option (prevents redundant search)
                                        handleSearchSelectedSuggestion(searchSuggestion)
                                        setSearchSuggestions([])
                                    }
                                }}
                            >
                                {searchSuggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
    
}
