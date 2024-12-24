"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Loader2, Plus, Edit, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { fetchApprovedPatients, updatePatientData, deletePatientData, registerApprovedPatient } from "@/app/utils/api"
import { z } from "zod" // Import Zod

// Define Zod schema for patient data
const patientSchema = z.object({
  name: z.string().max(10, "Name must be 50 characters or less"), // Limit name to 50 characters
  email: z.string().email("Please enter a valid email address"), // Validate email format
  password: z.string().max(12, "Password must be 12 characters or less"), // Limit password to 12 characters
  type: z.enum(["patient"], {
    errorMap: () => ({ message: "Please select a valid patient type" }),
  }), // Validate type
})

interface Patient {
  _id: string
  name: string
  email: string
  type: string
  password: string
}

export default function PatientRecord() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [newPatient, setNewPatient] = useState<Patient>({ _id: "", name: "", email: "", type: "patient", password: "" })
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchApprovedPatients()
        const sortedData = data.sort((a: { _id: string }, b: { _id: string }) => b._id.localeCompare(a._id))
        setPatients(sortedData)
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getPatients()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedPatient) {
      setSelectedPatient({ ...selectedPatient, [e.target.name]: e.target.value })
    }
  }

  const handleSaveChanges = async () => {
    if (selectedPatient) {
      try {
        // Validate the selected patient data
        patientSchema.parse(selectedPatient)

        setIsLoading(true)
        await updatePatientData(selectedPatient._id, selectedPatient)
        const updatedPatients = patients.map((patient) =>
          patient._id === selectedPatient._id ? selectedPatient : patient
        )
        setPatients(updatedPatients)
        setSelectedPatient(null)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage(error.errors[0].message)
        } else {
          console.error("Error updating patient:", error)
        }
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDelete = async (patientId: string) => {
    setIsLoading(true)
    try {
      await deletePatientData(patientId)
      setPatients(patients.filter((patient) => patient._id !== patientId))
    } catch (error) {
      console.error("Error deleting patient:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value })
  }

  const handleRegisterPatient = async () => {
    try {
      // Validate the new patient data
      patientSchema.parse(newPatient)

      setIsRegistering(true)
      await registerApprovedPatient(newPatient)
      window.location.reload()
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrorMessage(error.errors[0].message)
      } else {
        console.error("Error registering patient:", error)
      }
    } finally {
      setIsRegistering(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b">
        <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-foreground">Approved Patient Records</h1>
          <Button onClick={() => setIsRegisterDialogOpen(true)} variant="default" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Register Patient
          </Button>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Manage Patients</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search patient..."
                    className="pl-10 w-[20rem]"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredPatients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center">
                          No patients found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((patient) => (
                        <motion.tr key={patient._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.email}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                              {patient.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEditClick(patient)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Patient</DialogTitle>
                                  </DialogHeader>
                                  {selectedPatient && (
                                    <>
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="name" className="text-right">
                                            Name
                                          </Label>
                                          <Input
                                            id="name"
                                            name="name"
                                            value={selectedPatient.name}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="email" className="text-right">
                                            Email
                                          </Label>
                                          <Input
                                            id="email"
                                            name="email"
                                            value={selectedPatient.email}
                                            onChange={handleInputChange}
                                            className="col-span-3"
                                          />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="type" className="text-right">
                                            Type
                                          </Label>
                                          <Select
                                            onValueChange={(value) =>
                                              setSelectedPatient({ ...selectedPatient, type: value })
                                            }
                                            defaultValue={selectedPatient.type}
                                          >
                                            <SelectTrigger className="col-span-3">
                                              <SelectValue placeholder="Select patient type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="patient">Patient</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button onClick={handleSaveChanges}>Save changes</Button>
                                      </DialogFooter>
                                    </>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <Button variant="destructive" size="sm" onClick={() => handleDelete(patient._id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))
                    )}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Dialog open={isRegisterDialogOpen} onOpenChange={setIsRegisterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Patient</DialogTitle>
          </DialogHeader>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newPatient.name}
                onChange={handleRegisterInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={newPatient.email}
                onChange={handleRegisterInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newPatient.password}
                onChange={handleRegisterInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                onValueChange={(value) =>
                  setNewPatient({ ...newPatient, type: value })
                }
                defaultValue={newPatient.type}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select patient type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleRegisterPatient} disabled={isRegistering}>
              {isRegistering ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Register
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
