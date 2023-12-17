import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
    title : String,
    description : String,
    name : String,
    creator : String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likeCounts :{
        type : Number,
        default : 0,
    },

})
const TourModal = mongoose.model('Tour',tourSchema);

export default TourModal;