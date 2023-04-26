import { Router } from 'express';
import { CreateWorkspace,getAllWorkspace,deleteWorkspace,UpdateWorkspace,getWorkspaceById } from '../controller/workspace';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';

const router = Router();
router.route('/create').post(protect,authorize([Role.SYSADMIN]),CreateWorkspace)
router.route('/all').get(protect, authorize([Role.SYSADMIN]),  getAllWorkspace);
router.route('/:id').get(protect, authorize([Role.SYSADMIN]),  getWorkspaceById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN]), deleteWorkspace);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN]), UpdateWorkspace);




export { router as workspaceRoutes };
