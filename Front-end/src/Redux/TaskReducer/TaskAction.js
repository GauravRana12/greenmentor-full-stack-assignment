import axios from "axios";
import { GET_MY_TASK, GET_SINGLE, GET_TASK_FAILED, GET_TASK_PENDING, GET_TASK_SUCCESSFUL, POST_TASK } from "./TaskActiontype";
const BaseUrl="http://localhost:8080";

export const GetallTask=async (dispatch)=>{
    dispatch({type:GET_TASK_PENDING})
    try {
        const response=await axios.get(`${BaseUrl}/task`);
        console.log(response);
        dispatch({type:GET_TASK_SUCCESSFUL,payload:response.data});
    } catch (error) {
        dispatch({type:GET_TASK_FAILED})
        console.log(error);
    }
}


export const getMyonly=async (dispatch)=>{
    dispatch({type:GET_TASK_PENDING})
    try {
        const token=localStorage.getItem('token');
        const header={
            Authorization:token
          }
        const response=await axios.get(`${BaseUrl}/task/getmy`,{
            headers:header,
            withCredentials:true
        })
        console.log(response.data);
        dispatch({type:GET_MY_TASK,payload:response.data})
    } catch (error) {
        dispatch({type:GET_TASK_FAILED})
        console.log(error);
    }
}

export const getSingle=(idd)=>async (dispatch)=>{
    try {
        console.log("entered",idd);
        const token=localStorage.getItem('token');
        console.log(token);
        const header={
            Authorization:token
          }
        const response=await axios.get(`${BaseUrl}/task/single/${idd}`,{
            headers:header
        })
        console.log("res",response.data);
        dispatch({type:GET_SINGLE,payload:response.data});
    } catch (error) {
        console.log(error);
    }
}

export const postTask=(task,navigate)=>async (dispatch)=>{
    try {
        const token=localStorage.getItem("token");
        console.log(token);
        const header={
            Authorization:token
          }
        const response=await axios.post(`${BaseUrl}/task`,task,{
            headers:header,
            withCredentials:true
        })
        dispatch(GetallTask);
        

    } catch (error) {
        console.log(error);
    }
}


export const deleteingTask=(taskId)=> async (dispatch)=>{
    try {
        const token=localStorage.getItem("token");
        const header={
            Authorization:token
          }
          await axios.delete(`${BaseUrl}/task/${taskId}`,{headers:header});
          
          dispatch(getMyonly);
        
    } catch (error) {
        console.log(error);
    }
}

export const patchingTask=(task,taskId)=>async (dispatch)=>{
    try {
        const token=localStorage.getItem("token");
        const header={
            Authorization:token
          }
        const res=await axios.patch(`${BaseUrl}/task/${taskId}`,task,{
            headers:header
        })
        console.log(res.data);
        dispatch(GetallTask);
    } catch (error) {
        console.log(error);
    }
}