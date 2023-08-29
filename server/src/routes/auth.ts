import { Router } from "express";
import {
  validate,
  loginValidation,
  signUpValidation,
  changePasswordValidation,
} from "../validation/index";
import { changedPassword, login, signUp } from "../controller/auth";

const router = Router();

router.route("/create-user").post(signUpValidation(), validate, signUp);
router.route("/login").post(loginValidation(), validate, login);

router
  .route("/change-password")
  .patch(changePasswordValidation(), validate, changedPassword);

export { router as authRoutes };
