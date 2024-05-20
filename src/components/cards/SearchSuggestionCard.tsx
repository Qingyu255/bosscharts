import React from 'react'
import { useRouter } from 'next/navigation'

type SearchSuggestionCard = {
  text: string
  category: string
}

export default function SearchSuggestionCard({ text, category }: SearchSuggestionCard) {
  const router = useRouter()
  
  const handleSearchSelectedSuggestion = () => {
    if (category == "course") {
      const courseCode = text.split(":")[0]
      router.push(`/course/${courseCode}`)
    } else if (category == "professor") {
      router.push(`/professor/${text}`)
    }
  }

  return (
    <>
      {(text !== "No Matching Results") ? (
        <div 
          className='border-2 rounded-lg border-gray-200 p-2 sm:p-3 cursor-pointer hover:bg-gray-50 flex justify-between'
          onClick={() => { 
            handleSearchSelectedSuggestion()
          }}
        >
          <p>{text}</p>
          {/* {(category == "course") && (
            <p className='text-xs text-gray-400 underline flex items-center'>view charts</p>
          )} */}
          {(category == "professor") && (
            <p className='text-xs text-gray-400 underline flex items-center'>view courses taught</p>
          )}
        </div>
      ) : (
        <div 
        className='border-2 rounded-lg border-gray-200 p-2 sm:p-3 cursor-not-allowed bg-gray-50'
        >
          {text}
        </div>
      )}
    </>
  )
}
