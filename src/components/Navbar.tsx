import React from "react"
import Link from "next/link"
import Image from 'next/image'
import SearchBar from "./SearchBar"

export default function Navbar() {
    const siteName = "BOSS CHARTS"
    return (
        <>
            <div id="navbar" className="flex items-center justify-between border-b-2 md:px-3 md:py-2">
                    <Link href='/' className="flex items-center text-sm md:text-xl font-bold px-3 md:px-4 py-2 gap-x-2 md:gap-x-4">
                        <Image
                            src="/logo.png"
                            width={50}
                            height={50}
                            alt="logo"
                        />
                        {siteName}
                    </Link>
                
                <div className="flex flex-row text-md">
                    <div className="flex justify-center">
                        <SearchBar />
                    </div>
                    <div className="flex items-center px-2 md:px-4 text-[11px] md:text-sm font-medium">
                        <Link href="/">Donate</Link>
                    </div>
                </div>
            </div>
        </>
    )
}