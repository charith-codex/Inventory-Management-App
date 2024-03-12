const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
} = require('../controllers/userController');
const protect = require('../middleWare/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/getuser', protect, getUser);

module.exports = router;
