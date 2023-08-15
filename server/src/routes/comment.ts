import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { UpdateComment, createComment, deleteComment, getAllCommentsByProjectId, getCommentById } from '../controller/comment';

const router = Router();
router.route('/create/:projectId').post(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]),createComment)
router.route('/all/:projectId').get(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getAllCommentsByProjectId)
router.route('/:commentId').get(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), getCommentById);
router.route('/:commentId').delete(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), deleteComment);
router.route('/:commentId').patch(protect,authorize([Role.SYSADMIN,Role.PROJECTMANAGER,Role.USER]), UpdateComment);

export { router as CommentSRoute };
