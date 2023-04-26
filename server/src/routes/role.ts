import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { createRole, getAllRoles, getRoleById } from '../controller/roles';
import { Role } from '../types';

const router = Router();


//route  admin routes\

router.route('/create-role').post(protect,authorize([Role.Admin]),createRole)
router.route('/allRoles').get(protect, authorize([Role.Admin]),  getAllRoles);
router.route('/:id').get(protect, authorize([Role.Admin]),  getRoleById);



export { router as roleRoutes };
