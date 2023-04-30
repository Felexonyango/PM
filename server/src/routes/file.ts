import { Router } from 'express';
import {authorize, protect } from "../middleware/auth"
import { createFile, deleteFile, getAllFiles } from '../controller/file';
import { Role } from '../types';

const router = Router();
router.route('/create/:projectId').post(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),createFile)
router.route('/all/:projectId').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getAllFiles)
router.route('/:projectId').delete(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),deleteFile);

export { router as FileRoutes };
