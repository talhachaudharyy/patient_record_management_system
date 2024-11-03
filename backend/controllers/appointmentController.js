const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Create a new appointment
exports.createAppointment = async (req, res) => {
    try {
        const { doctor, appointmentDate, appointmentTime } = req.body;

        // Check if the doctor exists and is of type 'doctor'
        const doctorExists = await User.findOne({ _id: doctor, type: 'doctor' });
        if (!doctorExists) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if the appointment date is in the past
        const today = new Date();
        const selectedDate = new Date(appointmentDate);

        // Set the time of the selected date to the start of the day
        selectedDate.setHours(0, 0, 0, 0);

        // Set the time of today to the start of the day
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return res.status(400).json({ message: 'Cannot book an appointment for a past date' });
        }

        // Check if the slot is already booked
        const existingAppointment = await Appointment.findOne({
            doctor,
            appointmentDate,
            appointmentTime
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment slot already booked' });
        }

        const appointment = new Appointment(req.body);
        await appointment.save();

        // Populate the doctor field to include doctor's name and email
        const populatedAppointment = await Appointment.findById(appointment._id).populate('doctor', 'name email');

        res.status(201).json(populatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctor', 'name email');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single appointment by ID
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctor', 'name email');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
        const { doctor, appointmentDate, appointmentTime } = req.body;

        // Check if the doctor exists and is of type 'doctor'
        const doctorExists = await User.findOne({ _id: doctor, type: 'doctor' });
        if (!doctorExists) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check if the slot is already booked
        const existingAppointment = await Appointment.findOne({
            doctor,
            appointmentDate,
            appointmentTime,
            _id: { $ne: req.params.id }
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Appointment slot already booked' });
        }

        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('doctor', 'name email');
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get the total count of appointments
exports.getTotalAppointmentCount = async (req, res) => {
    try {
        const totalCount = await Appointment.countDocuments();
        res.status(200).json({ totalAppointments: totalCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
