import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router(); // base url "/api/users"

router.route('/').post(registerUser) // .get(authenticateProtectedRoute, authenticateAdmin, getUsers);
// router.post('/login', authenticateUser); 

export default router; 
