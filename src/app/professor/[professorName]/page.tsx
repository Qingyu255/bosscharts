import React from 'react'

export default function page({ params } : { params: {professorName: string} }) {
    const professorName = decodeURIComponent(params.professorName)
  return (
    <div>
      <h1>{`This page should show all the courses taught by ${professorName}`}</h1>
    </div>
  )
}
