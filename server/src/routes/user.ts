import { Router } from 'express';
import { deleteUser,updateUser,getAllUsers,getUserById, UpdateUserRole } from '../controller/user';
import { authorize, protect } from "../middleware/auth"

const router = Router();


//route  admin routes\
router.route('/all').get(protect, authorize(["admin"]),  getAllUsers);
router.route('/:id').get(protect, authorize(["admin"]),  getUserById);
router.route('/:id').delete(protect, authorize(["admin"]), deleteUser);
router.route('/:id').patch(protect, authorize(["admin"]), updateUser);
router.route("/updateRole/:id").patch(protect, authorize(["admin"]), UpdateUserRole);



export { router as userRoutes };
