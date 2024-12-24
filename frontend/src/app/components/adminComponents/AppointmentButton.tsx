"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { fetchDoctors, createAppointment } from '@/app/utils/api';
import { Loader2, CheckCircle } from 'lucide-react';
import { z } from "zod"; // Import Zod

// Define Zod schema for appointment form validation
const appointmentSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(10, "First Name must be 10 characters or less"),
  lastName: z.string().min(1, "Last Name is required").max(10, "Last Name must be 10 characters or less"),
  phoneNumber: z.string().refine(
    (value) => /^\d{12}$/.test(value), // Ensure exactly 12 digits
    "Phone Number must be exactly 12 digits"
  ),
  doctor: z.string().min(1, "Doctor is required"),
  email: z.string().email("Invalid email address").refine(
    (value) => /\b(gmail\.com|yahoo\.com|hotmail\.com)$/.test(value),
    "Email must end with gmail.com, yahoo.com, or hotmail.com"
  ),
  appointmentDate: z.string().refine(
    (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30); // Allow dates within the next 30 days
      return selectedDate >= today && selectedDate <= maxDate;
    },
    "Appointment date must be within the next 30 days"
  ),
  appointmentTime: z.string().min(1, "Appointment Time is required"),
  age: z.string().refine(
    (value) => {
      const age = parseInt(value, 10);
      return age > 0;
    },
    "Age must be greater than 0"
  ),
  gender: z.string().min(1, "Gender is required"),
  address: z.string().min(1, "Address is required"),
  reasonForVisit: z.string().min(1, "Reason for Visit is required"),
  medicalRecord: z.string().optional(),
  prescription: z.string().optional(),
});

interface AppointmentFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AppointmentFormDialog({ isOpen, onClose }: AppointmentFormDialogProps) {
  const [doctors, setDoctors] = useState<{ _id: string; name: string; specialization: string }[]>([]);
  const [specialization, setSpecialization] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    doctor: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    age: '',
    gender: '',
    address: '',
    reasonForVisit: '',
    medicalRecord: '',
    prescription: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const doctorsData = await fetchDoctors();
        setDoctors(doctorsData);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        // Mock data for testing if fetchDoctors is not working
        setDoctors([
          { _id: '1', name: 'Dr. John Doe', specialization: 'cardiology' },
          { _id: '2', name: 'Dr. Jane Smith', specialization: 'dermatology' },
        ]);
      }
    };
    fetchDoctorsData();
  }, []);

  const filteredDoctors = doctors.filter(doctor => doctor.specialization === specialization);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    try {
      // Validate the form data using Zod schema
      appointmentSchema.parse(formData);
      setValidationErrors({}); // Clear validation errors if valid
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Map Zod errors to validationErrors object
        const errors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          errors[err.path[0]] = err.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call

      const isSlotBooked = await checkSlotAvailability(formData.appointmentDate, formData.appointmentTime);
      if (isSlotBooked) {
        setError('The selected slot is already booked. Please choose another slot.');
        setIsLoading(false);
        return;
      }

      await createAppointment(formData);
      setSuccess(true);

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const checkSlotAvailability = async (date: string, time: string): Promise<boolean> => {
    // Simulated slot availability check
    const bookedSlots = [
      { date: '2023-10-01', time: '10:00' },
      { date: '2023-10-02', time: '11:00' }
    ];
    return bookedSlots.some(slot => slot.date === date && slot.time === time);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[700px] lg:max-w-[900px] h-[90vh] overflow-y-auto">
        <Card className="border-0">
          <CardHeader>
            <h2 className="text-xl font-bold">Create Appointment</h2>
          </CardHeader>

          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin" />
              </div>
            ) : success ? (
              <div className="flex flex-col items-center justify-center h-64">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-green-500 text-xl mt-4">Appointment booked successfully!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-500">{error}</div>}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 10); // Limit to 10 characters
                      }}
                    />
                    {validationErrors.firstName && <div className="text-red-500 text-xs mt-1">{validationErrors.firstName}</div>}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^a-zA-Z\s]/g, '').slice(0, 10); // Limit to 10 characters
                      }}
                    />
                    {validationErrors.lastName && <div className="text-red-500 text-xs mt-1">{validationErrors.lastName}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/\D/g, '').slice(0, 12); // Allow only digits and limit to 12
                      }}
                    />
                    {validationErrors.phoneNumber && <div className="text-red-500 text-xs mt-1">{validationErrors.phoneNumber}</div>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.email && <div className="text-red-500 text-xs mt-1">{validationErrors.email}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select
                      value={specialization}
                      onValueChange={(value) => setSpecialization(value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cardiology">Cardiology</SelectItem>
                        <SelectItem value="dermatology">Dermatology</SelectItem>
                        <SelectItem value="neurology">Neurology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="doctor">Doctor</Label>
                    <Select
                      value={formData.doctor}
                      onValueChange={(value) => setFormData({ ...formData, doctor: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDoctors.length > 0 ? (
                          filteredDoctors.map(doctor => (
                            <SelectItem key={doctor._id} value={doctor._id}>{doctor.name} ({doctor.specialization})</SelectItem>
                          ))
                        ) : (
                          <SelectItem value="null" disabled>No doctors available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {validationErrors.doctor && <div className="text-red-500 text-xs mt-1">{validationErrors.doctor}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="appointmentDate">Appointment Date</Label>
                    <Input
                      id="appointmentDate"
                      name="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {validationErrors.appointmentDate && <div className="text-red-500 text-xs mt-1">{validationErrors.appointmentDate}</div>}
                  </div>
                  <div>
                    <Label htmlFor="appointmentTime">Appointment Time</Label>
                    <Input
                      id="appointmentTime"
                      name="appointmentTime"
                      type="time"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      required
                    />
                    {validationErrors.appointmentTime && <div className="text-red-500 text-xs mt-1">{validationErrors.appointmentTime}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        // Limit to 3 digits
                        if (input.value.length > 3) {
                          input.value = input.value.slice(0, 3);
                        }
                      }}
                    />
                    {validationErrors.age && <div className="text-red-500 text-xs mt-1">{validationErrors.age}</div>}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {validationErrors.gender && <div className="text-red-500 text-xs mt-1">{validationErrors.gender}</div>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.address && <div className="text-red-500 text-xs mt-1">{validationErrors.address}</div>}
                </div>
                <div>
                  <Label htmlFor="reasonForVisit">Reason for Visit</Label>
                  <Textarea
                    id="reasonForVisit"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    required
                  />
                  {validationErrors.reasonForVisit && <div className="text-red-500 text-xs mt-1">{validationErrors.reasonForVisit}</div>}
                </div>
                <div>
                  <Label htmlFor="medicalRecord">Medical Record (Optional)</Label>
                  <Textarea
                    id="medicalRecord"
                    name="medicalRecord"
                    value={formData.medicalRecord}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="prescription">Prescription (Optional)</Label>
                  <Textarea
                    id="prescription"
                    name="prescription"
                    value={formData.prescription}
                    onChange={handleChange}
                  />
                </div>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button className="bg-teal-400 hover:bg-teal-600" type="submit" onClick={handleSubmit} disabled={isLoading}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
