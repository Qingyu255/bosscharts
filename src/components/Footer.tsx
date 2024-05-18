import React from 'react'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <footer id="footer" className="flex justify-center items-center p-3 border-t-2 gap-x-3">
        <Image
          src="/logo.png"
          width={25}
          height={25}
          alt="logo"
          style={{width: "auto", height: "25px"}}
        />
        <p className='text-sm font-semibold'>BOSS CHARTS</p>
        <Image
          src="/logo.png"
          width={25}
          height={25}
          alt="logo"
          style={{width: "auto", height: "25px"}}
        />
      </footer>
    </>
  )
}
