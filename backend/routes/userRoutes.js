const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../middleware/authMiddleware');

router.post('/register', userController.registerUser);
router.patch('/approve/:id', userController.approveUser);
router.post('/login', userController.loginUser);
router.get('/unapproved', userController.getUnapprovedUsers);
router.get('/approved-doctors', userController.getApprovedDoctors);
router.delete('/delete/:id', userController.deleteUser);
// Register a new doctor and set their status as approved
router.post('/register-doctor', userController.registerAndApproveDoctor);
// Update a user by ID
router.put('/:id', userController.updateUser);
//delete user
router.delete('/:id', userController.deleteUser);


// Route to get all approved patients

router.get('/approved-patients', userController.getApprovedPatients);

// Route to update patient data by ID
router.put('/update-patient/:id', userController.updatePatient);

// Register a new approved patient
router.post('/register-approved-patient', userController.registerApprovedPatient);

router.get('/counts', userController.getCounts);






module.exports = router;