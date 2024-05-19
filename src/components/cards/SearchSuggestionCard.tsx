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
          className='border-2 rounded-lg border-gray-200 p-3 cursor-pointer'
          onClick={() => { 
            handleSearchSelectedSuggestion()
          }}
        >
          {text}
        </div>
      ) : (
        <div 
        className='border-2 rounded-lg border-gray-200 p-3 cursor-not-allowed bg-gray-50'
        >
          {text}
        </div>
      )}
    </>
  )
}
