import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../services/project";

 const ProjectController = {
    CreateProject(req: Request, res: Response, next:NextFunction) {
        ProjectService.CreateProject(req, res,next);
      },

  getAllProject(req: Request, res: Response, next:NextFunction) {
    ProjectService.getAllProjects(req, res,next);
  },
 
  UpdateProject(req: Request, res: Response, next:NextFunction) {
    ProjectService.updateProject(req, res,next);
  },
  deleteProject(req: Request, res: Response, next:NextFunction) {
    ProjectService.deleteProject(req, res,next);
  },
  getProjectById(req: Request, res: Response, next:NextFunction) {
    ProjectService.getProjectById(req, res,next);
  },
  AssignProject(req:Request,res: Response, next:NextFunction){
    ProjectService.AssignProject(req, res, next);
  },
  getAllProjectsByWorkspaceById(req:Request, res: Response, next:NextFunction){
    ProjectService.getAllProjectsByWorkspaceById(req, res, next)
  }
};
export const { CreateProject,UpdateProject,deleteProject,getAllProject,getProjectById,AssignProject,getAllProjectsByWorkspaceById} =ProjectController