import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { createRole, getAllRoles, getRoleById } from '../controller/roles';

const router = Router();


//route  admin routes\
router.route('/create-role').post(protect,authorize(['admin']),createRole)
router.route('/allRoles').get(protect, authorize(["admin"]),  getAllRoles);
router.route('/:id').get(protect, authorize(["admin"]),  getRoleById);



export { router as roleRoutes };
