import mongoose from "mongoose";
let Schema = mongoose.Schema;

let todoSchema = new Schema({
    title: String
});

module.exports = mongoose.model("ToDo",todoSchema);