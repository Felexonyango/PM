import { Request, Response, NextFunction, response } from "express";
import { User as UserType } from "../types/user";
import { IComments as CommentType } from "../types/comment";

import { Comment } from "../model/comment";
import { Project } from "../model/project";
export const CommentService = {
  async CreateComment(req: Request, res: Response, next: NextFunction) {
    try {
      let { comment } = req.body;
      const user = req.user as UserType;
      const { projectId } = req.params;
      const project = await Project.findById(projectId);

      let comments = await Comment.create({
        comment,
        commentedBy: user?._id,
        project: project?._id,
      });
      let result = await comments.save();

      if (result)
        return res
          .status(200)
          .json({ msg: "Successfully created comment", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  },
  async getAllCommentsByProjectId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { projectId } = req.params;
      let project = await Project.findById(projectId);
      if (project) {
        const result = await Comment.find({ project: project.id }).populate(
          "commentedBy","-password"
        );

        if (result)
          return res.status(200).json({
            message: `Comments for ${projectId} retrieved successfully`,
            result,
          });
      } else {
        return res.status(404).json({ message: "Comments not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getCommentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      const result = await Comment.findById(commentId).populate("commentedBy","-password");

      console.log(result);
      if (!result)
        return res.status(404).json({ message: " Comment not found" });
      res.status(200).json({ msg: "successfully retrieved Comment ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async updateComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;

      let comment = await Comment.findByIdAndUpdate(commentId, req.body, {
        new: true,
        runValidators: true,
      });
      if (!comment)
        return res.status(404).json({ message: "Comment not found" });
      res
        .status(200)
        .json({ message: "Comment updated successfully", comment });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Comment" });
    }
    next();
  },

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      let findcommentedBy = await Comment.findById(commentId).populate(
        "commentedBy"
      );   
      const user = req.user as UserType;
      if (findcommentedBy?.commentedBy._id.equals(user._id)) {
       const data= await Comment.findByIdAndRemove(commentId);
       if(data){
        return res.status(200).json({msg:"Comment deleted"})
       }
  
      }
      else{
        return res.status(403).json({msg:"You do not have permission to delete this comment"})
      }
      
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
};
