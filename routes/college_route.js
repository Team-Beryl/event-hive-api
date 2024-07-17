import { Router } from "express";
import {
  deleteCollege,
  getACollege,
  getCollege,
  patchCollege,
  postCollege,
} from "../controllers/college_controller.js";
import { remoteUpload } from "../middlewares/upload.js";
import { checkUserSession } from "../middlewares/auth.js";

export const collegeRouter = Router();

collegeRouter.post(
  "/colleges",
  remoteUpload.single("banner"),
  checkUserSession,
  postCollege
);

collegeRouter.get("/colleges", getCollege);

collegeRouter.get("/colleges/:id", getACollege);

collegeRouter.patch(
  "/colleges/:id",
  remoteUpload.single("banner"),
  patchCollege
);

collegeRouter.delete("/colleges/:id", deleteCollege);

export default collegeRouter;
