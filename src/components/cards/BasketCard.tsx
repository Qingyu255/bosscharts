import Link from 'next/link'
import React from 'react'

type FacultyCardProps = {
    facultyName: string
}

export default function FacultyCard({facultyName}: FacultyCardProps) {
  return (
    <Link href={{
      pathname: `/faculty/${facultyName.toLowerCase()}`,
      // query: facultyName.toLowerCase()
    }}>
      <div className='flex justify-center items-center border-2 border-gray-500 p-6 w-60 h-36 rounded-2xl bg-white'>
        <h1 className='text-3xl font-bold text-center'>{facultyName}</h1>
      </div>
    </Link>
  )
}
