const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Register a new admin (superadmin)
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if an admin already exists
        const existingAdmin = await Admin.findOne();
        if (existingAdmin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
        });

        await admin.save();

        // Create and return JWT
        const payload = {
            admin: {
                id: admin.id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return JWT
        const payload = {
            admin: {
                id: admin.id,
                type: 'admin', // Include admin type in the payload
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                    admin: {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email,
                        type: 'admin', // Include admin type in the response
                        // Include any other admin data you need
                    },
                });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// Change admin password
exports.changePassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body;

    try {
        // Check if the admin exists
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ msg: 'Admin not found' });
        }

        // Validate new password and confirm password
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ msg: 'New password and confirm password do not match' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update admin password
        admin.password = hashedNewPassword;
        await admin.save();

        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};