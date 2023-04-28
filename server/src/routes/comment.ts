import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { UpdateComment, createComment, deleteComment, getAllCommentsByProjectId, getCommentById } from '../controller/comment';

const router = Router();
router.route('/create/:projectId').post(protect,createComment)
router.route('/all/:projectId').get(protect, getAllCommentsByProjectId)
router.route('/:commentId').get(protect, getCommentById);
router.route('/:commentId').delete(protect, deleteComment);
router.route('/:commentId').patch(protect, UpdateComment);

export { router as CommentSRoute };
