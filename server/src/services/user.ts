import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";

export const  UserService = {

  async getAllUsers(req: Request, res: Response, next:NextFunction) {
    try {
        
        const result = await User.find({}).select('-password').exec();
        if (result) return res.status(200).json({ message: "Users retrieved successfully",result});
      } catch (err) {
        res.status(500).json({ error: err });
      }
      next()
    },

  async  updateUser(req: Request, res: Response, next:NextFunction) {
    try{
        const { id } = req.params;

        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user });
      } catch (error) {
        res.status(500).json({ message: "Error in updating user product" });
      }
      next()
    },
  

    
  async deleteUser(req: Request, res: Response, next:NextFunction) {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndRemove({ _id: id });
        if (user) return res.status(200).json({ message: "User deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
      next()
    },

async getUserById(req: Request, res: Response,next:NextFunction){
    try {
      const { id } = req.params;
  
      const result = await User.findById(id)
      if (!result) return res.status(404).json({ message: " User not found" });
      res.status(200).json({ msg:"successfully retrived user ",result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next()
  }
}