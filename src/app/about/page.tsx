"use client"
import React, { useState, useEffect } from 'react'
import handleMobileWebShare from '@/utils/handleMobileWebshare'

export default function Page() {
  const [isWebShareSupported, setIsWebShareSupported] = useState<boolean>(false)

  useEffect(() => {
    setIsWebShareSupported(!!navigator.share)
  }, [])
  
  return (
    <>
      <div className='py-10'>
        <ul className='list-disc p-2 px-20 text-md md:text-lg space-y-5'>
          <li>
              SMU Boss Charts was made to help Singapore Management university (SMU) students better bid for their courses during BOSS bidding.
          </li>
          {isWebShareSupported ?
            (<button
              onClick={handleMobileWebShare}
              className='px-3 py-1 bg-gray-200 border-black border-2 rounded-lg hover:bg-blue-500 hover:text-white hover:border-white transition duration-200 text-sm'
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
