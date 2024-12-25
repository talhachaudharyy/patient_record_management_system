import { ReactNode } from "react";

export interface IDoctor {
    [x: string]: ReactNode;
    _id: string;
    name: string;
    email: string;
}

export interface IAppointment {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    doctor: IDoctor;
    email: string;
    appointmentDate: string;
    appointmentTime: string;
    age: number;
    gender: string;
    address: string;
    reasonForVisit: string;
    medicalRecord: string;
    prescription: string;
    status: 'approved' | 'rejected';
    doctorPrescription: string;
}
