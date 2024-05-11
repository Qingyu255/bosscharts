"use client"
import React, { useState, useEffect, useRef } from "react";
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

    const [selectedOption, setSelectedOption] = useState<string>(`Select ${category}`)
    // To ensure that the latest state is used in our resize event handler, we can use useRef to keep track of the current values
    const selectedOptionRef = useRef(selectedOption)

    // Update ref whenever selectedOption changes
    useEffect(() => {
        selectedOptionRef.current = selectedOption
    }, [selectedOption])

    useEffect(() => {
        const handleResize = () => {
            // this strips the `${category}: ` from the selected option displayed is viewport becomes too small
            if (selectedOptionRef.current.split(`${category}: `).length > 1 && selectedOptionRef.current !== `Select ${category}` && window.innerWidth < 500) {
                const string_without_select_word = selectedOptionRef.current.split(`${category}: `)[1]
                setSelectedOption(string_without_select_word)
            }
        }
        window.addEventListener("resize", handleResize)
    
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [selectedOption])

    function selectionHandler(option: string) {
        props.onSelect(option)
        setSelectedOption(`${category}: ${option.toUpperCase()}`)
    }    

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" className="text-[11px] sm:text-sm">
                    {selectedOption}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
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
