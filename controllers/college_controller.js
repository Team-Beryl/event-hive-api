import { CollegeModel } from "../models/college_model.js";

export const postCollege = async (req,res, next) => {
   try {
     const newCollege = await CollegeModel.create({
         ...req.body,
         banner: req.file.filename
 
     })
 
     res.status(201).json(newCollege)
   } catch (error) {
    next(error)
   }
}


export const getCollege = async (req,res,next) => {
    try {
        const allColleges = await CollegeModel.find()
        res.json(allColleges)
    } catch (error) {
        next(error)
    }
}

export const getACollege = async (req,res,next) => {
    try {
        const singleCollege = await CollegeModel.findById(req.params.id)
        res.json(singleCollege);
    } catch (error) {
        next(error)
    }
}


export const patchCollege = async (req,res,next) => {
    try {
        const editCollege = await CollegeModel.findByIdAndUpdate( req.params.id,
            { ...req.body, banner: req?.file?.filename },
            { new: true })
        res.json(editCollege);
    } catch (error) {
        next(error)
    }
}

export const deleteCollege = async (req,res,next) => {
   try {
     const delCollege = await CollegeModel.findByIdAndDelete(req.params.id);
     res.json(`College with id ${req.params.id} Deleted`)
   } catch (error) {
    next(error)
   }
}