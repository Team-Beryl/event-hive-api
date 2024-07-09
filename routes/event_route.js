import { Router } from "express";
import { remoteUpload } from "../middlewares/upload.js";
import { addEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controllers/event_controller.js";

export const eventRouter = Router();

eventRouter.post('/events', remoteUpload.single('banner'), addEvent);

eventRouter.patch('/events/:id', remoteUpload.single('banner'), updateEvent);

eventRouter.get('/events', getEvents);

eventRouter.delete('/events/:id', deleteEvent);

eventRouter.get('/events/:id', getEvent)






