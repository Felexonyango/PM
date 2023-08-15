import { Router } from "express";
import { authorize, protect } from "../middleware/auth";
import { Role } from "../types";
import {
  AssignProject,
  CreateProject,
  UpdateProject,
  deleteProject,
  getAllProject,
  getAllProjectsByWorkspaceById,
  getProjectById,
  getAllProjectsAssigneTome,
  getAllCompletedProject,
  getAllOngoingProjects,
  getAllOnholdProjects,
  getAllPendingProjects,
  updateProjectPercentage,
  getAllUsersProject,
} from "../controller/Project";
import { ProjectService } from "../services/project";
import { Request, Response, NextFunction } from "express";
const router = Router();
//Admin Routes 

router
  .route("/create")
  .post(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    CreateProject
  );
router
  .route("/all")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    getAllProject
  );
router
  .route("/all/myprojects")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    getAllProjectsAssigneTome
  );
router
  .route("all/completed")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    getAllCompletedProject
  );
router
  .route("/all/onhold")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    getAllOnholdProjects
  );
router
  .route("/all/ongoing")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    getAllOngoingProjects
  );
router
  .route("/all/pending")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    getAllPendingProjects
  );

router
  .route("/workspace/all/:workspaceId")
  .get(
    protect,
    authorize([Role.SYSADMIN,Role.PROJECTMANAGER]),
    getAllProjectsByWorkspaceById
  );
router
  .route("/:id")
  .get(
    protect,
    authorize([Role.SYSADMIN, Role.USER, Role.PROJECTMANAGER]),
    getProjectById
  );
router
  .route("/:id")
  .delete(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    deleteProject
  );
router
  .route("/:id")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    UpdateProject
  );
  router
  .route("/assignTo/:id")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER, Role.USER]),
    AssignProject
  );
router
  .route("/id")
  .patch(protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), AssignProject);
router
  .route("/updatePercentage/:id")
  .patch(
    protect,
    authorize([Role.SYSADMIN, Role.PROJECTMANAGER]),
    updateProjectPercentage
  );
  router.route('/api/projects/users').get(protect,authorize([Role.USER]), getAllUsersProject)

  router.get("/dashboard/totals", protect, authorize([Role.SYSADMIN,Role.PROJECTMANAGER]), async (req:Request, res:Response,next:NextFunction) => {
    try {
      const result = await ProjectService.dashboardSummary(req,res,next);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
    next()
  });

  router.get("/dashboard/user/totals", protect, authorize([Role.USER]), async (req:Request, res:Response,next:NextFunction) => {
    try {
      const result = await ProjectService.getUserDashboardSummary(req,res,next);
      res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
    } catch (error) {
      res.status(500).json({ msg:error });
    }
    next()
  });


  // router.get("/user/total", protect, authorize(['user']), async (req, res) => {
  //   try {
  //     const result = await getUserTotals(req);
  //     res.status(200).json({ msg:"successfully retrieved dashboard summary", result });
  //   } catch (error) {
  //     res.status(500).json({ msg:error });
  //   }
  // });

export { router as projectRoutes };
