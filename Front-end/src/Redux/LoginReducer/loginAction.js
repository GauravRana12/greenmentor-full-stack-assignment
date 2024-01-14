import axios from "axios";
import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESSFUL, LOG_OUT, REGISTER_FAILED, REGISTER_PENDING, REGISTER_SUCCESSFUL } from "./LoginActionType";
import toast from "react-hot-toast";

const notify = (msg) => toast.success(msg);
const noti = (msg) => toast.error(msg);
  const BaseUrl="http://localhost:8080";

export const loggingIn=(user,navigate)=>async (dispatch)=>{
    dispatch({type:LOGIN_PENDING})
    try {
        const response= await axios.post(`${BaseUrl}/user/login`,user,{
            withCredentials:true
        })
        console.log(response);
        if(response.data?.message){
            noti("Fill correct credentials");
            return;
        }
        if(response.data){
            notify("Login Successful");
            setTimeout(() => {
              navigate('/')
            }, 2000);
            console.log(response.data);
            localStorage.setItem('token',response.data);
            dispatch({type:LOGIN_SUCCESSFUL,payload:user})
        }
    } catch (error) {
        dispatch({type:LOGIN_FAILED})
        console.log(error);
    }
}

export const getLoginUser=(token)=>async (dispatch)=>{
    try {
        const response=await axios.get(`${BaseUrl}/user`,{
            headers:{Authorization:`${token}`}
        })
        dispatch({type:LOGIN_SUCCESSFUL,payload:response.data})
    } catch (error) {
        console.log(error);
    }
}

export const  RegisterUser=(user)=>async (dispatch)=>{
    dispatch({type:REGISTER_PENDING})
    try {
        const response=await axios.post(`${BaseUrl}/user/signup`,user);
        dispatch({type:REGISTER_SUCCESSFUL,payload:user});
    } catch (error) {
        dispatch({type:REGISTER_FAILED})
        console.log(error);
    }
}

export const Loggingout= (dispatch)=>{
    dispatch({type:LOG_OUT});
    localStorage.clear();
}

export const updateUser=(input,ID)=>async (dispatch)=>{
    try {
        const token=localStorage.getItem("token");
        console.log(token);
        console.log("input",input,ID);
        const header={
            Authorization:token
          }
        const response=await axios.patch(`${BaseUrl}/user/change/${ID}`,input,{
            headers:header,
            withCredentials:true
        })
        dispatch(getLoginUser(token))
    } catch (error) {
        console.log(error);
    }
}