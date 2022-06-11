import React from 'react';
import style from './App.module.scss'
import {Todolist} from "./components/Todolist";

function App() {
    return (
        <div className={style.app}>
            <h1 className={style.title}>todos</h1>
            <Todolist/>
        </div>
    );
}

export default App;
