import React from "react"
import Link from "next/link"
import SearchBar from "./SearchBar"

export default function Navbar() {
    return (
        <>
            <div className="flex bg-blue-300 items-center rounded-b-md">
                <div className="p-5 px-8">
                    <Link href='/' className="text-2xl font-bold">BOSS Analytics</Link>
                </div>
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