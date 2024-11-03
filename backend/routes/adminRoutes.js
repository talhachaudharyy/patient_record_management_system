const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const middleware = require('../middleware/authMiddleware')

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.post('/passwordchange',middleware, adminController.changePassword);

module.exports = router;