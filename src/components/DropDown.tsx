"use client"
import React, { useState, useEffect } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react"

type DropdownProps = {
    // Define onSelect as a function that takes a string as a parameter
    onSelect: (option: string) => void,
    category: string,
    options : string[] | undefined
}

export default function DropDown( props : DropdownProps ) {
    // if props.options is null, options = ["No courses Found"]
    const category = props.category
    const options = (props.options && props.options.length > 0) ? props.options : [`No ${category} Found`]

    const [searchText, setSearchText] = useState<string>("")
    const [filteredOptions, setFilteredOptions] = useState<string[]>(props.options || [])

    const[selectedOption, setSelectedOption] = useState<string>(`Select ${category}`)

    // const selectedOption = searchText
    // ? `Select ${category}`
    // : `${category}: ${searchText.toUpperCase()}`;


    function selectionHandler(option: string) {
        props.onSelect(option)
        setSelectedOption(`${category}: ${option.toUpperCase()}`)
    }    

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered">
                    {selectedOption}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
                {/* <DropdownItem key={0} className="p-1">
                    <input
                        type="text"
                        placeholder={`Search ${category}`}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="w-full border rounded-md p-1"
                    />
                </DropdownItem> */}
                {options.map((option, index) => (
                    <DropdownItem key={index + 1}>
                        {/* block: Full Width: Block-level elements expand to occupy the full width of their containing block. This means that they stretch from the left edge to the right edge of their parent container. */}
                        <div onClick={() => selectionHandler(option)} className="block">
                            {(options[0] !== `No ${category} Found`)? option.toUpperCase() : option}
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}
