const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(doctorId) {
                const user = await mongoose.model('User').findById(doctorId);
                return user && user.type === 'doctor';
            },
            message: 'Doctor must be a user of type doctor'
        }
    },
    email: {
        type: String,
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    reasonForVisit: {
        type: String,
        required: true
    },
    medicalRecord: {
        type: String,
        required: false
    },
    prescription: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['approved', 'cancelled'],
        default: 'approved'
    },
    doctorPrescription: {
        type: String,
        required: false,
        default: '' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);