import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {useAppSelector} from "../state/store";
import {selectActiveTasks, selectAllTasks, selectCompletedTasks} from "../state/selectors/selectors";
import {addTask, changeStatus, removeCompletedTasks} from "../state/reducers/tasksReduser";
import {Tasks} from "./Tasks";
import style from './Todolist.module.scss'

type FilterValuesType = "all" | "active" | "completed";

export const Todolist = () => {
    const [status, setStatus] = useState<FilterValuesType>('all')
    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState<string>("")
    const dispatch = useDispatch()

    let tasks = useAppSelector(selectAllTasks)
    let activeTasks = useAppSelector(selectActiveTasks)
    let completedTasks = useAppSelector(selectCompletedTasks)

    if (status === 'active') {
        tasks = activeTasks
    }
    if (status === 'completed') {
        tasks = completedTasks
    }
    const itemsLeft = activeTasks.length

    const onAllClickHandler = () => setStatus("all");
    const onActiveClickHandler = () => setStatus("active");
    const onCompletedClickHandler = () => setStatus("completed");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const getTitleForTask = () => {
        if (title.trim() !== "") {
            dispatch(addTask(title.trim()))
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeCheckedHandler = (id: string, isDone: boolean) => {
        dispatch(changeStatus(id, isDone))
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            getTitleForTask()
        }
    }

    const deleteCompletedTasks = () => {
        dispatch(removeCompletedTasks())
    }
    return (
        <div className={style.todo}>
            <div className={style.inputBlock}>
                <span className={style.downArrow}/>
                <input className={style.inputText}
                       type="text" placeholder={error ? error : 'What needs to be done?'}
                       value={title} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                />
            </div>
            <Tasks tasks={tasks} callback={onChangeCheckedHandler}/>
            <div className={style.footerItems}>
                <span>{`${itemsLeft} items left`}</span>
                <span className={style.filter}>
                    <span className={status === 'all' ? style.active : ''} onClick={onAllClickHandler}>All</span>
                    <span className={status === 'active' ? style.active : ''}
                          onClick={onActiveClickHandler}>Active</span>
                    <span className={status === 'completed' ? style.active : ''}
                          onClick={onCompletedClickHandler}>Completed</span>
                </span>
                <span className={style.clearCompleted} onClick={deleteCompletedTasks}>Clear completed</span>
            </div>
        </div>
    );
};