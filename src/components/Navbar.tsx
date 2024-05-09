import React from "react"
import Link from "next/link"
import Image from 'next/image'
import SearchBar from "./SearchBar"

export default function Navbar() {
    return (
        <>
            <div className="flex bg-blue-300 items-center rounded-b-md">
                    <Link href='/' className="flex items-center text-2xl font-bold px-5 py-2 gap-x-2">
                        <Image
                            src="/logo.png"
                            width={50}
                            height={50}
                            alt="logo"
                        />
                        BOSS Analytics
                    </Link>
                <div className="flex justify-end">
                    
                </div>
                
                <ul className="flex flex-row space-x-6 ml-auto p-3 pr-12 text-md">
                    <li className="w-80">
                        <SearchBar />
                    </li>
                    <li className="flex items-center">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="flex items-center">
                        <Link href="/">Donate</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}