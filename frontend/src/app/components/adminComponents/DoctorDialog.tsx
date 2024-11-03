// app/components/adminComponents/DoctorDialog.tsx

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from 'lucide-react';

interface Doctor {
  _id: string; 
  name: string;
  email: string;
  specialization: string;
  password?: string
}


interface DoctorDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  doctor: Doctor | null;
  onSubmit: (doctor: Doctor) => Promise<void>;
}

const DoctorDialog: React.FC<DoctorDialogProps> = ({ isOpen, onOpenChange, doctor, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (doctor) {
      setName(doctor.name);
      setEmail(doctor.email);
      setSpecialization(doctor.specialization);

    } else {
      setName('');
      setEmail('');
      setSpecialization('');
      setPassword('');
    }
  }, [doctor]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (doctor) {
        await onSubmit({ ...doctor, name, email, specialization, password });
      } else {
        await onSubmit({ _id: '', name, email, specialization, password });
      }
      // Reload the page after adding or updating the doctor
      window.location.reload();
    } catch (error) {
      console.error("Error submitting doctor data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{doctor ? 'Edit Doctor' : 'Add Doctor'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
             onInput={(e) => {
              const input = e.target as HTMLInputElement; 
              input.value = input.value.replace(/[^a-zA-Z]/g, '');
            }}
             id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="specialization">Specialization</Label>
            <Input  
            onInput={(e) => {
                        const input = e.target as HTMLInputElement; 
                        input.value = input.value.replace(/[^a-zA-Z]/g, '');
                      }}
              id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
          </div>
          {!doctor && (
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : doctor ? 'Update Doctor' : 'Add Doctor'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDialog;