"use client"
import React, {useEffect, useState, useRef} from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import SearchBar from "./SearchBar"

export default function Navbar() {
    const siteName = "BOSS CHARTS"
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
    const [displaySearchBox, setDisplaySearchBox] = useState<boolean>(false)
    const pathName = usePathname()
    const sidebarRef = useRef<HTMLDivElement>(null)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setSidebarOpen(false)
        }
    }

    useEffect(() => {
        const checkPathIsNotRoot = () => {
            setDisplaySearchBox(pathName !== "/")
        }
        checkPathIsNotRoot()
    }, [pathName])

    useEffect(() => {
        if (sidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        } else {
            document.removeEventListener("mousedown", handleClickOutside)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [sidebarOpen])

    return (
        <>
            <div id="navbar" className="flex items-center justify-between border-b-2 md:px-3 md:py-2">
                <Link href='/' className="flex items-center text-sm md:text-xl font-bold px-3 md:px-4 py-2 gap-x-2 md:gap-x-4">
                    <Image
                        src="/logo.png"
                        width={50}
                        height={50}
                        alt="logo"
                        style={{width: "auto", height: "50px"}}
                    />
                    {siteName}
                </Link>
                
                <div className="flex flex-row">
                    {displaySearchBox ? (
                        <div className="flex justify-center">
                            <SearchBar />
                        </div>
                    ) : (
                        <div className="bg-white w-[30px] z-20"> </div>
                    )}
                        <div className="hidden sm:flex flex-row items-center gap-x-3 font-medium bg-white z-10 px-3 text-sm">
                            <Link href="/">HOME</Link>
                            <Link href="/about">ABOUT</Link>
                        </div>

                    <div className="sm:hidden flex items-center px-2 pr-2.5 md:px-4 text-[11px] md:text-sm font-medium">
                        <button onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div ref={sidebarRef} className={`z-30 fixed top-0 right-0 w-64 bg-white h-full shadow-md transform ${sidebarOpen ? 'translate-x-20' : 'translate-x-full'} transition-transform ease-in-out`}>
                <ul className="mt-8 ml-4 space-y-4 font-semibold">
                    <li className="flex items-center">
                        <button onClick={toggleSidebar}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fill-rule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </li>
                    <li><Link href="/" onClick={toggleSidebar}>Home</Link></li>
                    <li><Link href="/about" onClick={toggleSidebar}>About</Link></li>
                </ul>
            </div>
            
        </>
    )
}