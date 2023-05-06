import { Router } from 'express';
import {protect } from "../middleware/auth"

import { UpdateFaq, createFaq, deleteFaq, getAllFaq, getFaqById } from '../controller/Faq';

const router = Router();
router.route('/create').post(protect,createFaq)
router.route('/all').get(protect,getAllFaq)
router.route('/:faqId').get(protect,getFaqById);
router.route('/:faqId').delete(protect, deleteFaq);
router.route('/:faqId').patch(protect, UpdateFaq);

export { router as FaqRoutes };
