import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { CreateProject, UpdateProject, deleteProject, getAllProject, getProjectById } from '../controller/Project';

const router = Router();
router.route('/create').post(protect,authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]),CreateProject)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]),  getAllProject);
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.USER,Role.PROJECTMANAGER,Role.MEMBER]),  getProjectById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]), deleteProject);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]), UpdateProject);
export { router as projectRoutes };
