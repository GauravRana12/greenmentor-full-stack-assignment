const express=require('express');
const { Authenticate } = require('../Middleware/Auth');
const TaskModel = require('../Modals/Task.Model');
var TaskRoute=express.Router();


TaskRoute.post('/',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let task=req.body;
        let obj={
            ...task,
            userId
        }
        await TaskModel.create(obj);
        res.send("task added successfully");
    } catch (error) {
        console.log(error);
    }
})

TaskRoute.patch('/:taskId',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let {taskId}=req.params;
        const input=req.body;
        const task=await TaskModel.findOne({_id:taskId,authorId});
        if(!task){
            return res.status(404).json({message:"No such a task found"});
        }
        else{
            if(task.authorId!=userId){
                return res.status(401).json({message:'You are not authorized to update this task'});
            }
            await TaskModel.findByIdAndUpdate(taskId,input);
            res.send('Task updated successfully');
        }
    } catch (error) {
        console.log(error);
    }
})

TaskRoute.delete('/:taskId',Authenticate,async (req,res)=>{
    try {
        const userId=req.userId;
        let {taskId}=req.params;
        const task=await TaskModel.findOne({_id:taskId,authorId:userId});
        if (!task) {
            return res.status(404).json({ message: 'This task does not exist or you do not have access to it.' });
        }
        else{
            await TaskModel.findByIdAndDelete(taskId);
            res.send('Task deleted successfully')
        }
    } catch (error) {
        console.log(error);
    }
})

module.exports=TaskRoute