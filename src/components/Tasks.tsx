import React, {ChangeEvent} from 'react';
import {TasksType} from "../state/reducers/tasksReduser";
import style from './Tasks.module.scss'

type TasksPropsType = {
    tasks: TasksType[]
    callback: (id: string, isDone: boolean) => void

}

export const Tasks = ({tasks, callback}: TasksPropsType) => {
    const onChangeHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        callback(id, e.currentTarget.checked)
    }

    const filteredTasks = tasks.map(t => (
        <label key={t.id}>
            <input className={style.checkbox} type="checkbox" checked={t.isDone}
                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
                       onChangeHandler(t.id, e)
                   }}/>
            <span className={style.checkStyle}/>
            <span className={style.title}>{t.title}</span>

        </label>
    ))
    return (
        <>
            {filteredTasks}
        </>
    )
};
