import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {tasksReducer} from "./reducers/tasksReduser";

const rootReducer = combineReducers({
    tasks: tasksReducer
})

export const store = createStore(rootReducer);
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
