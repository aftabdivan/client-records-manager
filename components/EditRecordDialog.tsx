"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface ClientRecord {
  id: number
  name: string
  email: string
}

interface EditRecordDialogProps {
  record: ClientRecord
  isOpen: boolean
  onClose: () => void
  onSave: (record: ClientRecord) => boolean
}

const EditRecordDialog = ({ record, isOpen, onClose, onSave }: EditRecordDialogProps) => {
  const [editedRecord, setEditedRecord] = useState<ClientRecord>({ ...record })
  const [emailError, setEmailError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedRecord((prev) => ({ ...prev, [name]: value }))

    // Clear email error when user types in email field
    if (name === "email") {
      setEmailError("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!editedRecord.name.trim()) {
      alert("Name is required")
      return
    }

    if (!editedRecord.email.trim()) {
      setEmailError("Email is required")
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(editedRecord.email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    // Try to save the record
    const success = onSave(editedRecord)
    if (!success) {
      setEmailError("This email is already in use")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Client Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input id="id" name="id" value={editedRecord.id} className="col-span-3" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" value={editedRecord.name} onChange={handleChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 space-y-1">
                <Input
                  id="email"
                  name="email"
                  value={editedRecord.email}
                  onChange={handleChange}
                  className={emailError ? "border-red-500" : ""}
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditRecordDialog;

