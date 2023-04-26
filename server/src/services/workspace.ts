import { Request, Response, NextFunction } from "express";
import { Workspace } from "../model/workspace";
import { workspaceActions } from "../types";

export const WorkspaceService = {
  async CreateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, email, phoneNumber, address, country, OrgType } = req.body;
      const checkExsting = await Workspace.findOne({ name: name });
      if (checkExsting) {
        return res
          .status(400)
          .json({ msg: "Worspace with that name already exists" });
      } else {
        let workspace = await Workspace.create({
          name,
          email,
          phoneNumber,
          address,
          country,
          OrgType,
        });
        let result = await workspace.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created workspace", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getAllWorkspaces(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Workspace.find({});
      if (result)
        return res
          .status(200)
          .json({ message: "Worskapaces retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async UpdateWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const workspace = await Workspace.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!workspace)
        return res.status(404).json({ message: " workspace not found" });
      res.status(200).json({ message: "User updated successfully", workspace });
    } catch (error) {
      res.status(500).json({ message: "Error in updating workspace" });
    }
    next();
  },

  async deleteWorkspace(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const workspace = await Workspace.findByIdAndRemove({ _id: id });
      if (workspace)
        return res
          .status(200)
          .json({ message: "Workspace deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getWorkspaceById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await Workspace.findById(id);
      if (!result)
        return res.status(404).json({ message: " Workspace not found" });
      res.status(200).json({ msg: "successfully retrived Workspace ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
 
};
