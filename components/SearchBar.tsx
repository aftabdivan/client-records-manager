import React from 'react'
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchBar = (props: any) => {
  return (
    <div className="flex-1">
        <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by ID, Name, or Email"
              className="pl-8"
              value={props?.searchTerm}
              onChange={(e: any) => props?.setSearchTerm(e.target.value)}
            />
        </div>
    </div>
  )
}

export default SearchBar