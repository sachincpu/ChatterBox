import mongoose from "mongoose";

const chatousSchema = mongoose.Schema({
 message: String,
 name: String,
timestamp:String,
received:Boolean
});

export default mongoose.model("Messages", chatousSchema);