import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user";

 const UserController = {

  getAllUsers(req: Request, res: Response, next:NextFunction) {
    UserService.getAllUsers(req, res,next);
  },
 
  updateUser(req: Request, res: Response, next:NextFunction) {
    UserService.updateUser(req, res,next);
  },
  deleteUser(req: Request, res: Response, next:NextFunction) {
    UserService.deleteUser(req, res,next);
  },
  getUserById(req: Request, res: Response, next:NextFunction) {
    UserService.getUserById(req, res,next);
  },
UpdateUserRole(req: Request, res: Response, next:NextFunction){
  UserService.UpdateUserRole(req,res,next);
}
};
export const {getAllUsers,updateUser,deleteUser,getUserById,UpdateUserRole} =UserController