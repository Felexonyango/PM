import { Request, Response, NextFunction } from "express";
import { User as UserType } from "../types/user";
import { Task } from "../model/task";
import { User } from "../model/user";
import mongoose from "mongoose";
import { Project } from "../model/project";
import { Ipriority, Status } from "../types";
export const TaskService = {
  async CreateTask(req: Request, res: Response, next: NextFunction) {
    try {
      let { name, dueDate, startDate, endDate } = req.body;
      const checkExsting = await Task.findOne({ name });
      if (checkExsting) {
        return res
          .status(400)
          .json({ msg: "Task with that name already exists" });
      } else {
        const user = req.user as UserType;
        const { id } = req.params;
        let project = await Project.findById(id);

        if (!project) {
          return res.status(400).json({ msg: "Project not found" });
        }
        let task = await Task.create({
          name,
          startDate,
          endDate,
          status: Status.PENDING,
          dueDate,
          priority: Ipriority.LOW,
          user: user?._id,
          project: project?._id,
        });
        let result = await task.save();

        if (result)
          return res
            .status(200)
            .json({ msg: "Successfully created Task", result });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getTasksAssignedTOme(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as UserType;

      const result = await Task.find({
        assignedTo: mongoose.Types.ObjectId(user._id),
      }).populate("assignedTo", "-password")
      .sort({ createdAt: -1 });
      console.log(result);
      if (result)
        return res
          .status(200)
          .json({ message: "Tasks retrieved successfully", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async getAllTasksByProjectId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { projectId } = req.params;
      let project = await Project.findById(projectId);
      if (project) {
        const result = await Task.find({ project: project.id })
          .populate("assignedTo", "-password")
          .populate("user")
          .sort({ createdAt: -1 })
          .exec();
        if (result)
          return res
            .status(200)
            .json({ message: "Tasks retrieved successfully", result });
      } else {
        return res.status(404).json({ message: "Tasks not found" });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },
  async updateTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return res.status(404).json({ message: "Task not found" });
      res.status(200).json({ message: "Task updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Error in updating Project" });
    }
    next();
  },

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndRemove({ _id: id });
      if (task)
        return res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async getTaskById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await Task.findById(id)
        .populate("project")
        .populate("assignedTo", "-password")
        .populate("user", "-password")
        .select("-password")
        .exec();

      if (!result) return res.status(404).json({ message: " Task not found" });
      res.status(200).json({ msg: "successfully retrieved Task ", result });
    } catch (err) {
      res.status(500).json({ error: err });
    }
    next();
  },

  async assignTaskToUser(taskId: string, userId: string): Promise<void> {
    try {
      const task = await Task.findById(taskId);

      if (!task) {
        throw new Error("Task not found");
      }

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      task.assignedTo = user._id;
      await task.save();
    } catch (error) {
      throw new Error("Failed to assign Task to user");
    }
  },
  async AssignTask(req: Request, res: Response, next: NextFunction) {
    const taskId = req.params.id;
    const userId = req.body.userId;

    try {
      await this.assignTaskToUser(taskId, userId);

      return res
        .status(200)
        .send({ message: "Task assigned to user successfully" });
    } catch (error) {
      res.status(500).send({ message: "Failed to assign Task to user" });
    }
    next();
  },
};
