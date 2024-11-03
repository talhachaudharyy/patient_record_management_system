const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user (patient or doctor)
exports.registerUser = async (req, res) => {
    const { name, email, password, type, specialization } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            type,
            specialization: type === 'doctor' ? specialization : undefined,
        });

        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Approve a user by ID
exports.approveUser = async (req, res) => {
    const { approved } = req.body;

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { approved } },
            { new: true, runValidators: false } // Disable validation for other fields
        );

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({
            msg: 'User approval status updated successfully',
            user: user,
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        if (!user.approved) {
            return res.status(401).json({ msg: 'User not approved' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return JWT
        const payload = {
            user: {
                id: user.id,
                type: user.type, // Include user type in the payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }, // Set token expiration to 24 hours
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        type: user.type,
                        approved: user.approved,
                        // Include any other user data you need
                    },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all unapproved users
exports.getUnapprovedUsers = async (req, res) => {
    try {
        const users = await User.find({ approved: false });

        if (users.length === 0) {
            return res.status(404).json({ msg: 'No unapproved users found' });
        }

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get all approved users with type 'doctor'
exports.getApprovedDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ approved: true, type: 'doctor' });

        if (doctors.length === 0) {
            return res.status(404).json({ msg: 'No approved doctors found' });
        }

        res.json(doctors);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.deleteOne();

        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
};

// Register a new doctor and set their status as approved
exports.registerAndApproveDoctor = async (req, res) => {
    const { name, email, password, specialization } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            type: 'doctor',
            specialization,
            approved: true, // Set the status as approved
        });

        await user.save();

        res.status(201).json({
            msg: 'Doctor registered and approved successfully',
            user: user,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    const { name, email, password, type, specialization, approved } = req.body;

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update user fields
        user.name = name || user.name;
        user.email = email || user.email;
        user.type = type || user.type;

        // Only update specialization if type is 'doctor'
        if (type === 'doctor') {
            user.specialization = specialization || user.specialization;
        }

        // Update approval status if provided
        user.approved = approved !== undefined ? approved : user.approved;

        // Hash password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Save the updated user
        await user.save();

        res.json({
            msg: 'User updated successfully',
            user: user,
        });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server error');
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Find user by ID

        if (!user) {
            return res.status(404).json({ msg: 'User not found' }); // If user is not found
        }

        await user.deleteOne(); // Remove the user

        res.json({ msg: 'User deleted successfully' }); // Success message
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' }); // Handle invalid ObjectId
        }
        res.status(500).send('Server error');
    }
};

// Get all approved patients
exports.getApprovedPatients = async (req, res) => {
    try {
        const approvedPatients = await User.find({ type: 'patient', approved: true });
        res.json(approvedPatients);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// userController.js

// Update patient data
exports.updatePatient = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.params.id; // assuming we pass the user ID in the URL
  
    try {
      // Find the user by ID
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Update user details
      if (name) user.name = name;
      if (email) user.email = email;
      
      // Update password only if it's provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
      }
  
      await user.save();
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
// Register a new patient and set their status as approved
exports.registerApprovedPatient = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            type: 'patient',
            approved: true, // Set the status as approved
        });

        await user.save();

        res.status(201).json({
            msg: 'Patient registered and approved successfully',
            user: user,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get counts of total doctors, total users, and total patients
exports.getCounts = async (req, res) => {
    try {
        // Count total users
        const totalUsers = await User.countDocuments();

        // Count approved doctors
        const totalDoctors = await User.countDocuments({ type: 'doctor', approved: true });

        // Count approved patients
        const totalPatients = await User.countDocuments({ type: 'patient', approved: true });

        // Send the counts in the response
        res.json({
            totalUsers,
            totalDoctors,
            totalPatients
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
