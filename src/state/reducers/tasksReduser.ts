import { v1 } from "uuid"

const initialState: TasksType[] = []

export const tasksReducer = (state: TasksType[] = initialState, action: ActionType): TasksType[] => {
    switch (action.type) {
        case 'ADD-TASK':
            let newTask = {id: v1(), title: action.title, isDone: false}
            return [{...newTask}, ...state]
        case 'REMOVE-COMPLETED-TASKS':
            return state.filter(task => !task.isDone)
        case 'CHANGE-STATUS':
            return state.map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)
        default:
            return state
    }
}

export const addTask = (title: string) =>
    ({type: 'ADD-TASK', title} as const)

export const removeCompletedTasks = () =>
    ({type: 'REMOVE-COMPLETED-TASKS',} as const)

export const changeStatus = (id: string, isDone: boolean) =>
    ({type: 'CHANGE-STATUS', id, isDone} as const)

type ActionType = ReturnType<typeof addTask>
    | ReturnType<typeof removeCompletedTasks>
    | ReturnType<typeof changeStatus>

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}