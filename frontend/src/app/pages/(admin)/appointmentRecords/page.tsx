"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, PlusIcon, TrashIcon, Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentFormDialog from '@/app/components/adminComponents/AppointmentButton';
import EditAppointmentDialog from '@/app/components/adminComponents/EditAppointmentDialog';
import { fetchAppointments, updateAppointment, deleteAppointment } from '../../../utils/api';
import { IAppointment } from './interfaces';

interface ConfirmationDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ onClose, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4 text-sm">Are you sure you want to delete this appointment?</p>
        <div className="flex justify-end">
          <Button variant="outline" className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function AppointmentRecords() {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [deletingAppointmentId, setDeletingAppointmentId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        // Sort patients by _id in descending order to get the latest first
        const sortedData = data.sort((a: { _id: any; }, b: { _id: string; }) => b._id.localeCompare(a._id));

        setAppointments(sortedData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAppointments();
  }, []);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleOpenEditDialog = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setIsEditDialogOpen(true);
  };
  const handleCloseEditDialog = () => setIsEditDialogOpen(false);

  const handleUpdateAppointment = (updatedAppointment: IAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id ? updatedAppointment : appointment
      )
    );
  };

  const handleDeleteAppointment = async () => {
    if (!deletingAppointmentId) return;

    setIsDeleting(true);
    try {
      await deleteAppointment(deletingAppointmentId);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== deletingAppointmentId)
      );
    } catch (error) {
      console.error('Error deleting appointment:', error);
    } finally {
      setIsDeleting(false);
      setIsConfirmDialogOpen(false);
    }
  };

  const handleOpenConfirmDialog = (appointmentId: string) => {
    setDeletingAppointmentId(appointmentId);
    setIsConfirmDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => setIsConfirmDialogOpen(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.firstName} ${appointment.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Appointment Records</h1>
          <Button onClick={handleOpenDialog} variant="outline" size="sm" className="flex items-center">
            <PlusIcon className="h-4 w-4 mr-2" />
            Create Appointment
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-sm">
            <CardHeader className="border-b border-gray-200">
              <CardTitle className="text-lg font-medium">Manage Appointments</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search appointments..."
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
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredAppointments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center">
                          No data to show
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAppointments.map((appointment) => (
                        <motion.tr
                          key={appointment._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <TableCell className="font-medium">{`${appointment.firstName} ${appointment.lastName}`}</TableCell>
                          <TableCell>{appointment.doctor.name}</TableCell>
                          <TableCell>{new Date(appointment.appointmentDate).toLocaleDateString()}</TableCell>
                          <TableCell>{appointment.appointmentTime}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleOpenEditDialog(appointment)}>
                              <PencilIcon className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleOpenConfirmDialog(appointment._id)}>
                              <TrashIcon className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
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

      <AppointmentFormDialog isOpen={isDialogOpen} onClose={handleCloseDialog} />

      <EditAppointmentDialog
        isOpen={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        appointment={selectedAppointment}
        onUpdate={handleUpdateAppointment}
      />

      {isConfirmDialogOpen && (
        <ConfirmationDialog
          onClose={handleCloseConfirmDialog}
          onConfirm={handleDeleteAppointment}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
}