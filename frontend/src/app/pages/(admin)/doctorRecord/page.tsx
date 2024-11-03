"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchDoctors, registerDoctor, deleteDoctor, updateDoctor } from '@/app/utils/api';
import DoctorTable from '@/app/components/adminComponents/DoctorTable';
import DoctorDialog from '@/app/components/adminComponents/DoctorDialog';
import SearchBar from '@/app/components/adminComponents/SearchBar';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Plus } from 'lucide-react';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
}

export default function DoctorRecords() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const data = await fetchDoctors();
        const sortedData = data.sort((a: { _id: any; }, b: { _id: string; }) => b._id.localeCompare(a._id));

        setDoctors(sortedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredDoctors = doctors.filter(doctor => 
    (doctor.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doctor.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDoctor = async (newDoctor: Doctor) => {
    try {
      const response = await registerDoctor(newDoctor);
      setDoctors([...doctors, response]);
      setIsAddDialogOpen(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setIsEditDialogOpen(true);
  };

  const handleUpdateDoctor = async (updatedDoctor: Doctor) => {
    if (updatedDoctor) {
      try {
        await updateDoctor(updatedDoctor._id, updatedDoctor);
        setDoctors(doctors.map(doctor => 
          doctor._id === updatedDoctor._id ? updatedDoctor : doctor
        ));
        setIsEditDialogOpen(false);
        setEditingDoctor(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoctor(id);
      setDoctors(doctors.filter(doctor => doctor._id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Doctor Records</h1>
          <Button onClick={() => setIsAddDialogOpen(true)} variant="outline" size="sm" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-medium">Manage Doctors</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 text-red-700 p-3 rounded-md text-sm mt-4"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="mt-4">
                <DoctorTable 
                  doctors={filteredDoctors} 
                  onEdit={handleEdit} 
                  onDelete={handleDelete} 
                  showNoDataMessage={filteredDoctors.length === 0}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <DoctorDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        doctor={null}
        onSubmit={handleAddDoctor}
      />
      <DoctorDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        doctor={editingDoctor}
        onSubmit={handleUpdateDoctor}
      />
    </div>
  );
}