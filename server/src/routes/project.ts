import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { AssignProject, CreateProject, UpdateProject, deleteProject, getAllProject, getAllProjectsByWorkspaceById, getProjectById,getAllProjectsAssigneTome, getAllCompletedProject, getAllOngoingProjects, getAllOnholdProjects, getAllPendingProjects, getpercentageOfProject } from '../controller/Project';

const router = Router();
router.route('/create/:id').post(protect,authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.USER]),CreateProject)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.USER]),  getAllProject);
router.route('/all/myprojects').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.USER]),getAllProjectsAssigneTome);
router.route('all/completed').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),getAllCompletedProject)
router.route('all/onhold').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),getAllOnholdProjects)
router.route('all/ongoing').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),getAllOngoingProjects)
router.route('all/pending').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),getAllPendingProjects)
router.route('/percentage/:projectId').get(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),getpercentageOfProject)
router.route('/all/:workspaceId').get(protect, authorize([Role.SYSADMIN,Role.ADMIN]),getAllProjectsByWorkspaceById)
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.USER,Role.PROJECTMANAGER]),  getProjectById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.USER]), deleteProject);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.USER]), UpdateProject);
router.route('/id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN]),AssignProject)
export { router as projectRoutes };
