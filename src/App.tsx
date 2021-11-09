import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid'; //id generator


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}


function App() {

  const todoListID_1 = v1();
  const todoListID_2 = v1();
  const [todoList, setTodoList] = useState<Array<TodoListType>>([
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What buy', filter: 'all'},
  ])

  const [tasks, setTasks] = useState<TasksStateType>({
    [todoListID_1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'React', isDone: false},
      {id: v1(), title: 'Redux', isDone: false},
    ],
    [todoListID_2]: [
      {id: v1(), title: 'Bread', isDone: true},
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Jam', isDone: false},
      {id: v1(), title: 'Butter', isDone: false},
    ],
  })

  const [filter, setFilter] = useState<FilterValuesType>('all');

  let tasksForRender = tasks;
  if (filter === 'active') {
    tasksForRender = tasks.filter(task => !task.isDone);
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(task => task.isDone);
  }

  const addTAsk = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    };
    setTasks([newTask, ...tasks]);
  };
  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  const changeTaskStatus = (taskId: string, isDone: boolean) => {
    const updatedTasks = tasks
      .map(t => t.id === taskId ? {...t, isDone}: t)
    setTasks(updatedTasks);
  };
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };


  return (
    <div className="App">
      <TodoList
        filter={filter}
        title="What to learn"
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTAsk}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
