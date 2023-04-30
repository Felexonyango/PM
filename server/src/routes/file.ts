import { Router } from 'express';
import {protect } from "../middleware/auth"
import { createFile, deleteFile, getAllFiles } from '../controller/file';

const router = Router();
router.route('/create/:projectId').post(protect,createFile)
router.route('/all/:projectId').get(protect, getAllFiles)
router.route('/:projectId').delete(protect, deleteFile);

export { router as FileRoutes };
