"use client"
import React, { useState, useEffect } from 'react'

export default function Page() {
  const [isWebShareSupported, setIsWebShareSupported] = useState<boolean>(false)

  useEffect(() => {
    setIsWebShareSupported(!!navigator.share)
  }, [])

  const handleMobileWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SMU BOSS Charts',
          text: 'Check out SMU BOSS Charts! Visualise Bid Price History and Analyse Detailed Bid Price Trends For Any Course with bid price charts.',
          url: 'https://www.smubosscharts.com',
        })
      } catch (error) {
        console.error('Error sharing site:', error)
      }
    } else {
      alert('Error: Web Share API is not supported in non-mobile browser.');
    }
  }
  
  return (
    <>
      <div className='py-10'>
        <ul className='list-disc p-5 px-20 text-md md:text-lg space-y-5'>
          <li>
              SMU Boss Charts was made to help Singapore Management university (SMU) students better bid for their courses during BOSS bidding.
          </li>
          {isWebShareSupported ?
            (<button
              onClick={handleMobileWebShare}
              className='px-3 py-1 bg-gray-200 border-black border-2 rounded-lg hover:bg-blue-600 hover:text-white transition duration-200 text-sm'
            >
              Click to share this site!
            </button>)
          : (
            <li>Help share this site!</li>
          )}

        </ul>
      </div>
    </>
  )
}
