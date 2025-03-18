import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

// Define the Client Record type
interface ClientRecord {
    id: number
    name: string
    email: string
  }

const FileUpload = (props: any) => {

    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const triggerFileUpload = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return
    
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const newRecords = JSON.parse(e.target?.result as string) as ClientRecord[]
    
            // Merge with existing records and remove duplicates by email
            const mergedRecords = [...props?.records]
            const existingIds = new Set(props?.records.map((record: ClientRecord) => record.id));
            const existingEmails = new Set(props?.records.map((record: ClientRecord) => record.email))
    
            const duplicateEntries: ClientRecord[] = [];
    
            newRecords.forEach((newRecord) => {
              if (existingIds.has(newRecord.id) || existingEmails.has(newRecord.email)) {
                duplicateEntries.push(newRecord); // Track duplicates
              } else {
                mergedRecords.push(newRecord);
                existingIds.add(newRecord.id);
                existingEmails.add(newRecord.email);
              }
            });
      
    
            props?.setRecords(mergedRecords)
            props?.setCurrentPage(1) // Reset to first page after upload
    
            if (duplicateEntries.length > 0) {
              alert(`${duplicateEntries.length} duplicate record(s) were not added due to duplicate ID or Email.`);
            }
    
          } catch (error) {
            console.error("Error parsing JSON file:", error)
            alert("Invalid JSON file. Please upload a valid JSON file.")
          }
        }
        reader.readAsText(file)
    
        // Reset the file input
        event.target.value = ""
      }

  return (
    <div>
        <input
            id="file-upload"
            type="file"
            accept=".json"
            className="hidden"
            ref={fileInputRef}
            onChange={(event)=>{
                handleFileUpload(event)
            }}
        />
        <label htmlFor="file-upload">
            <Button as="span" onClick={triggerFileUpload}>
                <Upload className="mr-2 h-4 w-4" />
                  Upload JSON
            </Button>
        </label>
    </div>
  )
}

export default FileUpload