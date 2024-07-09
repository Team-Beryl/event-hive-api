import { EventModel } from "../models/event_model.js";


//Function to post a new event
export const addEvent = async (req, res, next) =>{
    try {
      const newEvent = await EventModel.create({
        ...req.body,
        banner: req.file.filename
      }) 
      res.status(200).send(newEvent) 
    } catch (error) {
       next(error) 
    }
}

//Function to get all events
export const getEvents = async (req, res, next) => {
    try {
        const { 
            filter = "{}", 
            sort = "{}",
            fields = "{}",
            limit = 15, 
            skip = 0, 
        } = req.body
       const allEvents = await EventModel
          .find(JSON.parse(filter))
          .sort(JSON.parse.sort)
          .select(JSON.parse(fields))
          .limit(limit)
          .skip(skip);
       res.status(201).send(allEvents) 
    } catch (error) {
        next(error)
    }
}

//Function to update an event
export const updateEvent = async (req, res, next) => {
    try {
       const updatedEvent = await EventModel.findByIdAndUpdate(
        req.params.id,
        { ...req.body, flier: req?.file?.filename },
        { new: true }
    ) 
       res.status(201).send(updatedEvent)
    } catch (error) {
        next(error)
    }
}

//Function to delete an event
export const deleteEvent = async (req, res, next) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        res.status(201).send("An event has been deleted successfully ");
    } catch (error) {
        next(error)
    }
}

//Function to display an event by id
export const getEvent = async (req, res, next) => {
    try {
        const getOneEvent = await EventModel.findById(req.params.id)
        res.json(getOneEvent)
    } catch (error) {
        next(error);
    }
}
