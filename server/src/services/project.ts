import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import { Iworkspace as WorkspaceType } from "../types/workspace";
import { Project } from "../model/project";
import { Status } from "../types/project";
import { User } from "../model/user";
import { Workspace, workspaceDocument } from "../model/workspace";
export const ProjectService = {
  async CreateProject(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        projectName,
        description,
        startDate,
        endDate,
        projectduration,
        budget,
      } = req.body;
      const checkExsting = await Project.findOne({ projectName: projectName });
      if (checkExsting) {
        return res
          .status(400)
          .json({ msg: "Project with that name already exists" });
      } else {
        const user = req.user as UserType;
        const {id} =req.params
        const workspace = await Workspace.findById(id);

        if (!workspace) {
          return res.status(400).json({ msg: 'Workspace not found' });
        }
        console.log(workspace)
        let project = await Project.create({
          projectName,
          description,
          startDate,
          endDate,
          budget,
          projectduration,
          status: Status.PENDING,
          user: user?._id,
          workspace: workspace?._id,
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
      const result = await Project.find({}).populate('assignedTo').populate("user").select("-password").exec();
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
        return res
          .status(200)
          .json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getProjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Project.findById(id).populate("user").populate('assignedTo').select("-password").exec();

      if (!result)
        return res.status(404).json({ message: " Project not found" });
      res.status(200).json({ msg: "successfully retrieved Project ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async  assignProjectToUser(projectId: string, userId: string): Promise<void> {
    try {
      const project = await Project.findById(projectId);
  
      if (!project) {
        throw new Error("Project not found");
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        throw new Error("User not found");
      }
  
      project.assignedTo = user._id;
      await project.save();
    } catch (error) {
      throw new Error("Failed to assign project to user");
    }
  },
  async AssignProject(req: Request, res: Response, next: NextFunction) {
    const projectId = req.params.id;
    const userId = req.body.userId;
  
    try {
      await this.assignProjectToUser(projectId, userId);
  
      return res.status(200).send({ message: "Project assigned to user successfully" });
    } catch (error) {
      res.status(500).send({ message: "Failed to assign project to user" });
    }
    next()
  }
  
  
};

