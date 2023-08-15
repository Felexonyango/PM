import { Router } from 'express';
import {authorize, protect } from "../middleware/auth"
import { createFeedback, deleteFeedback, getAllfeedback, getFeedbackById, updateFeedBack } from '../controller/feedback';
import { Role } from '../types';

const router = Router();
router.route('/create').post(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),createFeedback)
router.route('/all').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getAllfeedback)
router.route('/:id').get(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getFeedbackById);
router.route('/:id').delete(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), deleteFeedback);
router.route('/:id').patch(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), updateFeedBack);

export { router as FeedbackRoute };
