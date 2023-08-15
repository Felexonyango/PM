import { Router } from 'express';
import { authorize, protect } from "../middleware/auth"
import { Role } from '../types';
import { UpdateCustomer, createcustomer, deleteCustomer, getAllCustomer, getCustomerById } from '../controller/customer';

const router = Router();
router.route('/create/:id').post(protect,authorize([Role.SYSADMIN,]),createcustomer)
router.route('/all/:id').get(protect, authorize([Role.SYSADMIN]), getAllCustomer)
router.route('/:id').get(protect,authorize([Role.SYSADMIN]), getCustomerById);
router.route('/:id').delete(protect,authorize([Role.SYSADMIN]), deleteCustomer);
router.route('/:id').patch(protect,authorize([Role.SYSADMIN]), UpdateCustomer);

export { router as CustomerRoutes };
