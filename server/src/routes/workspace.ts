import { Router } from 'express';
import { CreateWorkspace,getAllWorkspace,deleteWorkspace,UpdateWorkspace,getWorkspaceById } from '../controller/workspace';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();
router.route('/create').post(protect,authorize([Role.SYSADMIN,Role.ADMIN]),CreateWorkspace)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.ADMIN]),  getAllWorkspace);
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.ADMIN]),  getWorkspaceById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.ADMIN]), deleteWorkspace);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN]), UpdateWorkspace);
export { router as workspaceRoutes };
