import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { createRole, deleteRoleId, getAllRoles, getRoleById } from '../controller/roles';
import { Role } from '../types';

const router = Router();


//route  admin routes\

router.route('/create-role').post(protect,authorize([Role.SYSADMIN,Role.ADMIN]),createRole)
router.route('/allRoles').get(protect, authorize([Role.SYSADMIN,Role.ADMIN]),  getAllRoles);
router.route('/:id').get(protect, authorize([Role.ADMIN,Role.SYSADMIN]),  getRoleById);
router.route('/:id').delete(protect, authorize([Role.ADMIN,Role.SYSADMIN]),deleteRoleId)



export { router as roleRoutes };
