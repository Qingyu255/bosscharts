import Link from 'next/link'
import React from 'react'

type CourseCodeCard = {
    courseCode: string
}

export default function CourseCodeCard({courseCode}: CourseCodeCard) {
  return (
    <Link href={`/course/${courseCode.toLowerCase()}`}>
      <div className='flex justify-center items-center border-2 border-gray-500 px-6 py-4 w-80 h-8 rounded-2xl bg-white'>
        <h1 className='text-xl font-bold text-center'>{courseCode.toLocaleUpperCase()}</h1>
      </div>
    </Link>
  )
}