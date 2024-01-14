import {
  GET_MY_TASK,
  GET_SINGLE,
  GET_TASK_FAILED,
  GET_TASK_PENDING,
  GET_TASK_SUCCESSFUL,
} from "./TaskActiontype";

const initialTask = {
  totalTask: [],
  myTask: [],
  taskError: false,
  taskLoading: false,
  singletask:{}
};

export const Taskreducer = (state = initialTask, { type, payload }) => {
  switch (type) {
    case GET_TASK_FAILED:
      return { ...state, taskError: true, taskLoading: false };
    case GET_TASK_PENDING:
      return { ...state, taskLoading: true };
    case GET_TASK_SUCCESSFUL:
      return { ...state, taskLoading: false, totalTask: payload };
    case GET_MY_TASK:
      return { ...state, myTask: payload, taskLoading:false };
    case GET_SINGLE:
      return {...state,singletask:payload}  
    default:
      return state;
  }
};
