import { Request, Response, NextFunction } from "express";
import { User } from "../model/user";
import { User as UserTypes } from "../types/user";
import { Project } from  '../model/project'
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user as UserTypes;
    const {
      projectName,
      description,
      startDate,
      endDate,
      projectduration,
      status,
    } = req.body;
    const project = await Project.create({
      comment,
      startDate,
      endDate,
      status: Status.PENDING,
      user: user._id,
      leavetype: leavetyp._id,
    });
    const result = await leave.save();
    if (result) {
      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $push: { leave: leave._id },
      });
      if (updatedUser) {
        await updatedUser
          .populate({
            path: "leave",
            model: "Leave",
            populate: { path: "leavetype", model: "LeaveType" },
          })
          .execPopulate();
      }
    }

    return res.status(200).json({ msg: "Succesfully created leave", leave });
  } catch (err) {
    res.status(500).json({ msg: "Error while creating leave" });
  }
  next();
};
