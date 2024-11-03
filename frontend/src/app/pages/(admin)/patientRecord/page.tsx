"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "../../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { fetchApprovedPatients, updatePatientData, deletePatientData, registerApprovedPatient } from "@/app/utils/api";

interface Patient {
  _id: string;
  name: string;
  email: string;
  type: string;
  password: string; // Ensure password is always a string
}

export default function PatientRecord() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // For the edit dialog
  const [newPatient, setNewPatient] = useState<Patient>({ _id: "", name: "", email: "", type: "patient", password: "" }); // For the register dialog
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // New state for registration loading

  useEffect(() => {
    const getPatients = async () => {
      try {
        const data = await fetchApprovedPatients();
        // Sort patients by _id in descending order to get the latest first
        const sortedData = data.sort((a: { _id: any; }, b: { _id: string; }) => b._id.localeCompare(a._id));
        setPatients(sortedData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getPatients();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedPatient) {
      setSelectedPatient({ ...selectedPatient, [e.target.name]: e.target.value });
    }
  };

  const handleSaveChanges = async () => {
    if (selectedPatient) {
      setIsLoading(true);
      try {
        await updatePatientData(selectedPatient._id, selectedPatient);
        const updatedPatients = patients.map((patient) =>
          patient._id === selectedPatient._id ? selectedPatient : patient
        );
        setPatients(updatedPatients);
      } catch (error) {
        console.error("Error updating patient:", error);
      } finally {
        setIsLoading(false);
        setSelectedPatient(null); // Close dialog
      }
    }
  };

  const handleDelete = async (patientId: string) => {
    setIsLoading(true);
    try {
      await deletePatientData(patientId);
      setPatients(patients.filter((patient) => patient._id !== patientId));
    } catch (error) {
      console.error("Error deleting patient:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleRegisterPatient = async () => {
    setIsRegistering(true); // Set registering state to true
    try {
      await registerApprovedPatient(newPatient);
      window.location.reload(); // Reload the page after successful registration
    } catch (error) {
      console.error("Error registering patient:", error);
    } finally {
      setIsRegistering(false); // Set registering state to false
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const filteredPatients = patients.filter(
    (patient) =>
      (patient.name ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Approved Patient Records</h1>
          <Button onClick={() => setIsRegisterDialogOpen(true)} variant="outline" size="sm" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Register Patient
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-medium">Manage Patients</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search patient..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                          We have no data to show
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPatients.map((patient) => (
                        <motion.tr key={patient._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.email}</TableCell>
                          <TableCell>{patient.type}</TableCell>
                          <TableCell>
                            <div className="flex space-x-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" onClick={() => handleEditClick(patient)}>
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Edit Patient</DialogTitle>
                                  </DialogHeader>
                                  {selectedPatient && (
                                    <>
                                      <div className="mb-4">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                          id="name"
                                          name="name"
                                          value={selectedPatient.name}
                                          onChange={handleInputChange}
                                        />
                                      </div>

                                      <div className="mb-4">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                          id="email"
                                          name="email"
                                          value={selectedPatient.email}
                                          onChange={handleInputChange}
                                        />
                                      </div>

                                      <div className="mb-4">
                                        <Label htmlFor="type">Type</Label>
                                        <Input
                                          id="type"
                                          name="type"
                                          value={selectedPatient.type}
                                          onChange={handleInputChange}
                                        />
                                      </div>

                                      <DialogFooter>
                                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                                      </DialogFooter>
                                    </>
                                  )}
                                </DialogContent>
                              </Dialog>

                              <Button variant="destructive" onClick={() => handleDelete(patient._id)}>
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
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
             onInput={(e) => {
              const input = e.target as HTMLInputElement; 
              input.value = input.value.replace(/[^a-zA-Z]/g, '');
            }}
              id="name"
              name="name"
              value={newPatient.name}
              onChange={handleRegisterInputChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              value={newPatient.email}
              onChange={handleRegisterInputChange}
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={newPatient.password}
              onChange={handleRegisterInputChange}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleRegisterPatient} disabled={isRegistering}>
              {isRegistering ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Register"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}