import {addTask, changeStatus, removeCompletedTasks, tasksReducer, TasksType} from "../reducers/tasksReduser";

const state: TasksType[] =[
    {id: '1', title: 'task 1', isDone: false},
    {id: '2', title: 'task 2', isDone: true},
    {id: '3', title: 'task 3', isDone: false},
]

test('adding a task to the top of the list', () => {

    const result = tasksReducer(state, addTask('task 4'))

    expect(result.length).toBe(4)
    expect(result[0].title).toBe('task 4')
})

test('deleting completed tasks', () => {

    const result = tasksReducer(state, removeCompletedTasks())

    expect(result.length).toBe(2)
    expect(result[1].id).toBe('3')
})

test('changing the task status', () => {

    const result = tasksReducer(state, changeStatus('3', true))

    expect(result[2].isDone).toBe(true)
})