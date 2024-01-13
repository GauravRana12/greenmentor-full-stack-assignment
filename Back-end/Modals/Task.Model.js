const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  image: { type: String},
  title: { type: String, required: true },
  description: { type: String, required: true },
  authorId: { type: String, required: true },
},
{
    timestamps: true 
}
);

const TaskModel = mongoose.model("blogs", TaskSchema);
module.exports = TaskModel;
