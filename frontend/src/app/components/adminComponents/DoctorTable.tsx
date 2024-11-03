import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
}

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (id: string) => void;
  showNoDataMessage: boolean;
}

const DoctorTable: React.FC<DoctorTableProps> = ({ doctors, onEdit, onDelete, showNoDataMessage }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Specialization</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <AnimatePresence>
          {showNoDataMessage ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                We have no data to show
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor) => (
              <motion.tr
                key={doctor._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mr-2" 
                    onClick={() => onEdit(doctor)}
                  >
                    <PencilIcon className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => onDelete(doctor._id)}
                  >
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </motion.tr>
            ))
          )}
        </AnimatePresence>
      </TableBody>
    </Table>
  );
};

export default DoctorTable;