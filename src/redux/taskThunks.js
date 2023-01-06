import { addTask, finishLoadingTasks, getTasks, removeTask, startLoadingTasks, updateTask } from "./taskSlice";
import uuid from 'react-uuid';

const url = "http://localhost:3000/tasks";
export const fetchTasks = () => {
    return async (dispatch) => {
        dispatch(startLoadingTasks());
        const data = await fetch(url);
        const tasks = await data.json();
        dispatch(getTasks(tasks));
        dispatch(finishLoadingTasks());
    }
};

export const  CreateTaskDb = ({title,description})=>{
    return async (dispatch) => {
        dispatch(startLoadingTasks());
        const newTask = {title,description,id:uuid(),completed:false};
        const resp = await fetch(url,{
            method:'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(newTask)
        });
        dispatch(addTask(newTask));
        dispatch(finishLoadingTasks());
    }
}

export const DeleteTaskDb = (id) => {
    return async (dispatch) => {
        dispatch(startLoadingTasks());
        const resp = await fetch(url+"/"+id,{
            method:'DELETE',
        });
        console.log(resp);
        dispatch(removeTask(id));
        dispatch(finishLoadingTasks());
    }
}

export const updateTaskDb =( task={})=>{
    return async (dispatch,getState) => {
        const  {id,...rest} = task;
        dispatch(startLoadingTasks());
        const resp = await fetch(url+"/"+id,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(rest),
        });
        console.log(resp);
        dispatch(updateTask(task));
        dispatch(finishLoadingTasks());
    }
}