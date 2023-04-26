import { Router } from 'express';
import { deleteUser,updateUser,getAllUsers,getUserById, UpdateUserRole } from '../controller/user';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();


//route  admin routes\
router.route('/all').get(protect, authorize([Role.Admin]),  getAllUsers);
router.route('/:id').get(protect, authorize([Role.Admin]),  getUserById);
router.route('/:id').delete(protect, authorize([Role.Admin]), deleteUser);
router.route('/:id').patch(protect, authorize([Role.Admin]), updateUser);
router.route("/updateRole/:id").patch(protect, authorize([Role.Admin]), UpdateUserRole);



export { router as userRoutes };
