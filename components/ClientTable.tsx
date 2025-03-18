import React from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash2 } from "lucide-react"

const ClientTable = (props: any) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props?.records?.length > 0 ? (
                props?.records?.map((record: any) => (
                    <TableRow key={record.id}>
                        <TableCell>{record.id}</TableCell>
                        <TableCell>{record.name}</TableCell>
                        <TableCell>{record.email}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => props?.handleEditRecord(record)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => props?.handleDeleteRecord(record.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8">
                        {props?.records.length === 0
                          ? "No records found. Please upload a JSON file."
                          : "No matching records found."}
                      </TableCell>
                    </TableRow>
                  )}
        </TableBody>
    </Table>
  )
}

export default ClientTable