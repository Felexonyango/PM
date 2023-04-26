import { Router } from 'express';
import { deleteUser,updateUser,getAllUsers,getUserById, AssignUserRole, UnssignUserRole } from '../controller/user';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();


//route  admin routes\
router.route('/all').get(protect, authorize([Role.SYSADMIN]),  getAllUsers);
router.route('/:id').get(protect, authorize([Role.SYSADMIN]),  getUserById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN]), deleteUser);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN]), updateUser);
router.route("/assign/:id").patch(protect, authorize([Role.SYSADMIN]), AssignUserRole,UnssignUserRole);
router.route("/unassign/:id").patch(protect, authorize([Role.SYSADMIN]), UnssignUserRole)


export { router as userRoutes };
