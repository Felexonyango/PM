import { Request, Response, NextFunction } from "express";
import { Roles } from "../model/roles";

export const RoleService = {
  async CreateRole(req: Request, res: Response, next: NextFunction) {
    try {
      let { name,description } = req.body;
      const checkExsting = await Roles.findOne({ name: name });
      if (checkExsting) {
        return res.status(400).json({ msg: "Role  already exists" });
      } else {
        let roles = await Roles.create({
          name,
          description
        });
        let result = await roles.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created role", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllRoles(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Roles.find({});
      if (result)
        return res
          .status(200)
          .json({ message: "Roles retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getRoleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await Roles.findById(id);
      if (!result) return res.status(404).json({ message: " Role not found" });
      res.status(200).json({ msg: "successfully retrived role ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async deleteRole(req:Request, res:Response, next:Function){
    try {
            
      const { id } = req.params;
      const result = await Roles.findByIdAndRemove(id);
      if (!result) return res.status(404).json({ message: " Role not found" });
      res.status(200).json({ msg: `successfully deleteted  this ${id} role`, result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async updateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await Roles.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "Role not found" });
      res.status(200).json({ message: "Role updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Role" });
    }
    next();
  },

  
};
