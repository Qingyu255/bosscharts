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

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }
        if (query) {
            getSuggestions(query)
        }
    }, [query])

    const search_not_found_message: string = "course code not found"
    const getSuggestions = (searchText: string) => {
        let searchSuggestions = uniqueCourses.filter(course =>course.toUpperCase().includes(searchText.toUpperCase()))
        if (searchSuggestions.length == 0) {
            searchSuggestions = [search_not_found_message]
        }
        setSearchSuggestions(searchSuggestions)
    }

    const handleSearchSelectedSuggestion = (courseCode: string) => {
        router.push(`/course/${courseCode}`);
    };

    return (
        <>
            <div className='rounded-xl w-[200px] md:w-64 text-sm md:text-md'>
                <input
                    value={text}
                    placeholder='Search Course Code'
                    // Maybe can add functionality to search professor too
                    onChange={e => setText(e.target.value)}
                    className='block w-full rounded-md border-0 px-2 py-1.5 md:px-3 md:py-2 text-[12px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 focus:ring-inset focus:ring-sky-600 sm:text-sm '
                />
                <div className='pointer-events-none absolute right-[60px] md:right-[105px] top-[25px] md:top-[33px] flex items-center'>
                    <MagnifyingGlassIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                    />
                </div>
                {searchSuggestions.length > 0 && (
                    <ul className='absolute z-10 w-full bg-white rounded-lg shadow-lg max-h-60 overflow-auto'>
                        {searchSuggestions.map((searchSuggestion, index) => (
                            <li
                                key={index}
                                className='p-2 hover:bg-gray-200 cursor-pointer'
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
