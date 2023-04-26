import { Router } from 'express';
import { deleteUser,updateUser,getAllUsers,getUserById, UpdateUserRole } from '../controller/user';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();


//route  admin routes\
router.route('/all').get(protect, authorize([Role.SYSADMIN]),  getAllUsers);
router.route('/:id').get(protect, authorize([Role.SYSADMIN]),  getUserById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN]), deleteUser);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN]), updateUser);
router.route("/updateRole/:id").patch(protect, authorize([Role.SYSADMIN]), UpdateUserRole);



export { router as userRoutes };
