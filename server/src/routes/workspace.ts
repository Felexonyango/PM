import { Router } from 'express';
import { CreateWorkspace,getAllWorkspace,deleteWorkspace,UpdateWorkspace,getWorkspaceById } from '../controller/workspace';
import { authorize, protect } from "../middleware/auth"

const router = Router();
router.route('/create').post(protect,authorize(["admin"]),CreateWorkspace)
router.route('/all').get(protect, authorize(["admin"]),  getAllWorkspace);
router.route('/:id').get(protect, authorize(["admin"]),  getWorkspaceById);
router.route('/:id').delete(protect, authorize(["admin"]), deleteWorkspace);
router.route('/:id').patch(protect, authorize(["admin"]), UpdateWorkspace);




export { router as workspaceRoutes };
