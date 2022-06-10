import {AppRootStateType} from "../store";

export const selectAllTasks = (state: AppRootStateType) => state.tasks
export const selectCompletedTasks = (state: AppRootStateType) => state.tasks.filter(tasks=>tasks.isDone)
export const selectActiveTasks = (state: AppRootStateType) => state.tasks.filter(tasks=>!tasks.isDone)