"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import EditRecordDialog from "@/components/EditRecordDialog"
import PaginationControls from "@/components/PaginationControls"
import ClientTable from "@/components/ClientTable"
import SearchBar from "@/components/SearchBar"
import FileUpload from "@/components/FileUpload"

// Define the Client Record type
interface ClientRecord {
  id: number
  name: string
  email: string
}

export default function Home() {
  // State for client records
  const [records, setRecords] = useState<ClientRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<ClientRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPage = 5

  // Edit record state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [recordToEdit, setRecordToEdit] = useState<ClientRecord | null>(null)

  // Load records from localStorage on initial render
  useEffect(() => {
    const savedRecords = localStorage.getItem("clientRecords")
    if (savedRecords) {
      setRecords(JSON.parse(savedRecords))
    }
  }, [])

  // Update localStorage and filtered records when records change
  useEffect(() => {
    localStorage.setItem("clientRecords", JSON.stringify(records))
    handleSearch(searchTerm)
  }, [records])

  // Update filtered records when search term changes
  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm])

  // Handle search
  const handleSearch = (term: string) => {
    const filtered = records.filter(
      (record) =>
        record.id.toString().includes(term) ||
        record.name.toLowerCase().includes(term.toLowerCase()) ||
        record.email.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredRecords(filtered)
  }

  // Handle edit record
  const handleEditRecord = (record: ClientRecord) => {
    setRecordToEdit(record)
    setIsEditDialogOpen(true)
  }

  // Save edited record
  const saveEditedRecord = (editedRecord: ClientRecord) => {
    // Check if email is unique (except for the current record)
    const isDuplicateEmail = records.some(
      (record) => record.email === editedRecord.email && record.id !== editedRecord.id,
    )

    if (isDuplicateEmail) {
      alert("Email address must be unique. This email is already in use.")
      return false
    }

    const updatedRecords = records.map((record) => (record.id === editedRecord.id ? editedRecord : record))

    setRecords(updatedRecords)
    setIsEditDialogOpen(false)
    return true
  }

  // Handle delete record
  const handleDeleteRecord = (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      const updatedRecords = records.filter((record) => record.id !== id)
      setRecords(updatedRecords)

      // Adjust current page if necessary
      const maxPage = Math.ceil(updatedRecords.length / recordsPerPage)
      if (currentPage > maxPage && maxPage > 0) {
        setCurrentPage(maxPage)
      }
    }
  }

  // Calculate pagination
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage)

  // Generate pagination items
  const paginationItems = []
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <PaginationItem key={i}>
        <PaginationLink isActive={i === currentPage} onClick={() => setCurrentPage(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>,
    )
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Client Records Management</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FileUpload setRecords={setRecords} records={records} setCurrentPage={setCurrentPage} />
      </div>

      <Card className="mb-6">
        <CardContent className="p-0">
        <ClientTable records={currentRecords} handleEditRecord={handleEditRecord} handleDeleteRecord={handleDeleteRecord} />
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <PaginationControls currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} paginationItems={paginationItems}/>
      )}

      {isEditDialogOpen && recordToEdit && (
        <EditRecordDialog
          record={recordToEdit}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSave={saveEditedRecord}
        />
      )}
    </main>
  )
}

