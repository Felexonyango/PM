import { Router } from 'express';
import { deleteUser,updateUser,getAllUsers,getUserById, AssignUserRole, UnssignUserRole } from '../controller/user';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();


//route  admin routes\
router.route('/all').get(protect, authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),  getAllUsers);
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),  getUserById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), deleteUser);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), updateUser);
router.route("/assign/:id").patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), AssignUserRole,UnssignUserRole);
router.route("/unassign/:id").patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), UnssignUserRole)


export { router as userRoutes };
