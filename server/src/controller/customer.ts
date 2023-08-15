import { NextFunction, Request, Response } from "express";
import { CustomerService } from "../services/customer";
const CustomerController = {
  createcustomer(req: Request, res: Response, next: NextFunction) {
    CustomerService.Creatcustomer(req, res, next);
  },

  getAllCustomer(req: Request, res: Response, next: NextFunction) {
    CustomerService.getAllCustomers(req, res, next);
  },
 
  UpdateCustomer(req: Request, res: Response, next: NextFunction) {
    CustomerService.UpdateCustomer(req, res, next);
  },
  deleteCustomer(req: Request, res: Response, next: NextFunction) {
    CustomerService.deletecustomer(req, res, next);
  },
  getCustomerById(req: Request, res: Response, next: NextFunction) {
    CustomerService.getCustomerById(req, res, next);
  },
 
};
export const {
 createcustomer,
 getAllCustomer,
 getCustomerById,
 deleteCustomer,
 UpdateCustomer
  
} = CustomerController;
