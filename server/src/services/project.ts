import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import { Iworkspace as WorkspaceType } from "../types/workspace";
import { Project } from "../model/project";
import {Status} from "../types/project"
export const ProjectService = {
  async CreateProject(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        projectName,
        description,
        startDate,
        endDate,
        projectduration,
        
      } = req.body;
      const checkExsting = await Project.findOne({ projectName: projectName });
      if (checkExsting) {
        return res
          .status(400)
          .json({ msg: "Project with that name already exists" });
      } else {
        const user = req.user as UserType;
        const workspace = req.workspace as WorkspaceType;
        let project = await Project.create({
          projectName,
          description,
          startDate,
          endDate,
          projectduration,
          status:Status.PENDING,
          user: user?._id,
          workspace:workspace?._id
        });
        let result = await project.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created project", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getAllProjects(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Project.find({}).populate('user').select("-password").exec()
      if (result)
        return res
          .status(200)
          .json({ message: "Projects retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async updateProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "Project not found" });
      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Project" });
    }
    next();
  },

  async deleteProject(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await Project.findByIdAndRemove({ _id: id });
      if (user)
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const result = await Project.findById(id).populate("user");

      if (!result) return res.status(404).json({ message: " Project not found" });
      res.status(200).json({ msg: "successfully retrieved Project ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

 
};
