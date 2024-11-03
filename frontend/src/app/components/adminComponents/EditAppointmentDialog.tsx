"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IAppointment } from '@/app/pages/(admin)/appointmentRecords/interfaces';
import { updateAppointment } from '@/app/utils/api';
import { CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface EditAppointmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    appointment: IAppointment | null;
    onUpdate: (updatedAppointment: IAppointment) => void;
}

const EditAppointmentDialog: React.FC<EditAppointmentDialogProps> = ({ isOpen, onClose, appointment, onUpdate }) => {
    const [editedAppointment, setEditedAppointment] = useState<IAppointment | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setEditedAppointment(appointment);
    }, [appointment]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedAppointment((prev) => ({
            ...prev!,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editedAppointment) {
            setIsLoading(true);
            try {
                // Simulate an API call or form submission logic
                await new Promise(resolve => setTimeout(resolve, 2000)); // Replace with actual API call
                const updatedAppointment = await updateAppointment(editedAppointment._id, editedAppointment);
                onUpdate(updatedAppointment);
                onClose();
            } catch (error) {
                console.error('Error updating appointment:', error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    if (!editedAppointment) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='[&>button]:hidden border-0 relative mx-auto p-10 w-full md:w-3/4 bottom-[20rem] left-[15rem] max-h-screen rounded-xl bg-white shadow-lg dark:bg-gray-800 dark:text-white overflow-hidden'>
                <DialogHeader>
                    <DialogTitle>Edit Appointment</DialogTitle>
                </DialogHeader>
                <CardContent className="flex flex-col h-[60vh] w-auto">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="h-12 w-12 text-teal-400 animate-spin" />
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-2 custom-scrollbar">
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="firstName" className="text-right">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        value={editedAppointment.firstName}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lastName" className="text-right">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        value={editedAppointment.lastName}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phoneNumber" className="text-right">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={editedAppointment.phoneNumber}
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
                                        value={editedAppointment.email}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="appointmentDate" className="text-right">
                                        Appointment Date
                                    </Label>
                                    <Input
                                        id="appointmentDate"
                                        name="appointmentDate"
                                        type="date"
                                        value={new Date(editedAppointment.appointmentDate).toISOString().split('T')[0]}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="appointmentTime" className="text-right">
                                        Appointment Time
                                    </Label>
                                    <Input
                                        id="appointmentTime"
                                        name="appointmentTime"
                                        value={editedAppointment.appointmentTime}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="age" className="text-right">
                                        Age
                                    </Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        value={editedAppointment.age}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="gender" className="text-right">
                                        Gender
                                    </Label>
                                    <Input
                                        id="gender"
                                        name="gender"
                                        value={editedAppointment.gender}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="address" className="text-right">
                                        Address
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={editedAppointment.address}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="reasonForVisit" className="text-right">
                                        Reason for Visit
                                    </Label>
                                    <Input
                                        id="reasonForVisit"
                                        name="reasonForVisit"
                                        value={editedAppointment.reasonForVisit}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="medicalRecord" className="text-right">
                                        Medical Record
                                    </Label>
                                    <Input
                                        id="medicalRecord"
                                        name="medicalRecord"
                                        value={editedAppointment.medicalRecord}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="prescription" className="text-right">
                                        Prescription
                                    </Label>
                                    <Input
                                        id="prescription"
                                        name="prescription"
                                        value={editedAppointment.prescription}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="status" className="text-right">
                                        Status
                                    </Label>
                                    <Input
                                        id="status"
                                        name="status"
                                        value={editedAppointment.status}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="doctorPrescription" className="text-right">
                                        Doctor Prescription
                                    </Label>
                                    <Input
                                        id="doctorPrescription"
                                        name="doctorPrescription"
                                        value={editedAppointment.doctorPrescription}
                                        onChange={handleInputChange}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                    <div className='flex flex-row justify-end gap-4 mt-4'>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
                            Save changes
                        </Button>
                    </div>
                </CardContent>
            </DialogContent>
        </Dialog>
    );
};

export default EditAppointmentDialog;