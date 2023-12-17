import mongoose from 'mongoose';
import TourModal from '../models/tour.js';

export const createTour = async(req,res)=>{
    const tour = req.body;
    const newTour = new TourModal({
        ...tour,
        creator:req.userId,
        createdAt : new Date().toISOString(),
    });

    try {
        await newTour.save();
        res.status(201).json(newTour)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getTours = async(req,res)=>{
    try {
        const tours = await TourModal.find();
        res.status(200).json(tours)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getTour = async(req,res)=>{
    const {id}= req.params;
    try {
        const tour = await TourModal.findById(id);
        res.status(200).json(tour)
    } catch (error) {
        res.status(404).json({message:"Something went wrong"});
    }
}

export const getToursByUser = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:'User does not exist'});
        }
        const userTours = await TourModal.find({creator : id});
        res.status(200).json(userTours);
        
    } 
    catch (error) {
        res.status(404).json({message:"Something went wrong"}); 
    }
}

export const deleteTour = async(req,res)=>{
    const {id} = req.params;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:'Tour does not exist'});
        }
       await TourModal.findByIdAndDelete(id);
       res.json({message:'Tour Deleted Successfully'});
        
    } 
    catch (error) {
        res.status(404).json({message:"Something went wrong"}); 
    }
}

export const updateTour = async(req,res)=>{
    const {id} = req.params;
    const {title,description,creator,imageFile,tags} =req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:'Tour does not exist'});
        }
        const updatedTour = {
            creator,
            title,
            description,
            tags,
            imageFile,
            _id : id

        }

        await TourModal.findByIdAndUpdate(id,updatedTour,{new:true});
        res.status(201).json(updateTour)
       
        
    } 
    catch (error) {
        res.status(404).json({message:"Something went wrong"}); 
    }
}
