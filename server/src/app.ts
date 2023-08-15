import * as dotenv from "dotenv";
dotenv.config();
import express, { Application, NextFunction, Request, Response } from "express";
import { PORT } from "./config/index";
import { destroyData, importData } from "./seeder";
import cors from "cors";
import  path  from 'path'
import passport from "passport";
require("./lib/passport")(passport);

//importing routes
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { workspaceRoutes } from "./routes/workspace";
import { connectDb } from "./database";
import { roleRoutes } from "./routes/role";
import { projectRoutes } from "./routes/project";
import { TaskRoutes } from "./routes/task";
import { CommentSRoute } from "./routes/comment";
import { FeedbackRoute } from "./routes/feedback";
import { FileRoutes } from "./routes/file";
import { FaqRoutes } from "./routes/faq";
import multer from "multer";
import { CustomerRoutes } from "./routes/customer";
import {sendProjectReminder} from './services/project'
import { sendTaskReminder } from "./services/task";
// import { MenuRoutes } from "./routes/MenuRoute";
const app: Application = express();
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

connectDb();
//destroyData()
let event
sendProjectReminder(event)
sendTaskReminder(event)

app.use(cors());

//file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workspace", workspaceRoutes);
app.use('/api/role',roleRoutes)
app.use('/api/project',projectRoutes)
app.use("/api/task",TaskRoutes)
app.use('/api/comment',CommentSRoute)
app.use("/api/feedback",FeedbackRoute)
app.use('/api/file', upload.single('file'), FileRoutes)
app.use("/api/faq",FaqRoutes)
app.use("/api/customer",CustomerRoutes)
// app.use("/api/menus",MenuRoutes)



//updated body-parser for ts node
app.use(express.json());
app.listen(PORT, () => {
  
  console.log(`server is listening at port ${PORT}`)
})
