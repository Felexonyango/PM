import { Router } from 'express';
import {protect } from "../middleware/auth"
import { createFeedback, deleteFeedback, getAllfeedback, getFeedbackById, updateFeedBack } from '../controller/feedback';

const router = Router();
router.route('/create').post(protect,createFeedback)
router.route('/all').get(protect, getAllfeedback)
router.route('/:id').get(protect, getFeedbackById);
router.route('/:id').delete(protect, deleteFeedback);
router.route('/:id').patch(protect, updateFeedBack);

export { router as FeedbackRoute };
