"use client"
import React, { useEffect, useState } from 'react'
import ErrorPopUp from '@/components/ErrorPopUp'
import SearchSuggestionCard from '@/components/cards/SearchSuggestionCard'

export default function Page({ params } : { params: {professorName: string} }) {
    const professorName = decodeURIComponent(params.professorName)
    const apiURL = process.env.NEXT_PUBLIC_ANALYTICS_API_URL
    const [coursesTaught, setCoursesTaught] = useState<string[]>([])
    const [error, setError] = useState<any>(null)

    useEffect(() => {
      const fetchCoursesTaught = async () => {
        try {
          const response = await fetch(`${apiURL}/coursestaughtbyprofessor/${professorName}`)
          const coursesTaught = await response.json()
          setCoursesTaught(coursesTaught.data)
        } catch (error: any) {
          setError(error)
          console.error(error)
        }
      }
      fetchCoursesTaught()
    }, [apiURL])
  return (
    <>
      {error ? (
        <ErrorPopUp error={error}/>
      ) : (
        <div className="flex justify-center py-12">
          <div className='flex flex-col w-7/12 xl:w-5/12'>
            <h1 className='text-md sm:text-xl font-medium py-3 pb-7'>{`Courses Taught By ${professorName}`}</h1>
            <div className='flex flex-col gap-y-2'>
              {coursesTaught.map((course, index) => (
                <SearchSuggestionCard
                  key={index}
                  text={course}
                  category='course'
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
