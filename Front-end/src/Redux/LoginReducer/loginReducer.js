import { LOGIN_FAILED, LOGIN_PENDING, LOGIN_SUCCESSFUL, LOG_OUT, REGISTER_FAILED, REGISTER_PENDING, REGISTER_SUCCESSFUL } from "./LoginActionType"

const LoginInitialstate={
   isAuth:false,
   isAuthError:false,
   isAuthLoading:false,
   userData:{}
}

export const LoginReducer=(state=LoginInitialstate,{type,payload})=>{
   console.log("payload",payload);
    switch(type){
        case LOGIN_SUCCESSFUL:
            return {...state,isAuth:true,isAuthLoading:false,userData:payload}
         case LOGIN_FAILED:
            return {...state,isAuthError:true,isAuthLoading:false}
         case LOGIN_PENDING:
            return {...state,isAuthLoading:true}
         case REGISTER_FAILED:
            return {...state,isAuthError:true,isAuthLoading:false}
         case REGISTER_SUCCESSFUL:
            return {...state,userData:payload,isAuthLoading:false}
          case REGISTER_PENDING:
            return {...state,isAuthLoading:true}  
         case LOG_OUT:
            return {...state,isAuth:false}         
        default:
            return state;
    }
}

