import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { AssignTask, UpdateTask, createTask, deleteTask, getAllTasks, getAllTasksById, getTaskById } from '../controller/task';

const router = Router();
router.route('/create/:id').post(protect,authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]),createTask)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]),  getAllTasks);
router.route('/all/:projectId').get(protect,authorize([Role.SYSADMIN,Role.ADMIN]),getAllTasksById)
router.route('/:id').get(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.USER,Role.PROJECTMANAGER,Role.MEMBER]), getTaskById );
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]), deleteTask);
router.route('/:id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN,Role.PROJECTMANAGER,Role.MEMBER,Role.USER]),UpdateTask);
router.route('/id').patch(protect, authorize([Role.SYSADMIN,Role.ADMIN]),AssignTask)
export { router as TaskRoutes };
