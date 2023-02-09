import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  task: string;
}


//mongoose schema and schema type
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'please tell us your name'],
  }
});

const Task = mongoose.model<ITask>('Task', taskSchema);

module.exports = Task;
