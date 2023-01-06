import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-uuid';
const initialState = {
    isLoading:false,
    list:[],
};
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        startLoadingTasks:(state)=>{
            state.isLoading = true;
        },
        finishLoadingTasks:(state)=>{
            state.isLoading = false;
        },
        getTasks:(state,action)=>{
            state.list=action.payload;
        },
        addTask: (state, action) => {
            console.log(action.payload);
            state.list.push(action.payload);
        },
        updateTask: (state, action) => {
            console.log(action.payload);
            const {id,title,description} = action.payload;
            const task = state.list.find(t=>t.id ==id);
            if(task){
                task.title = title;
                task.description = description;
            }
        },
        removeTask: (state, action) => {
            const filteredTasks = state.list.filter(f=>f.id!==action.payload);
            return {...state, list: filteredTasks};
        },
    }
})

export const { startLoadingTasks,finishLoadingTasks,getTasks,addTask, updateTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;