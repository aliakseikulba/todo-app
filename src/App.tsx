import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid'; //id generator

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  //data to state
  let tasksForState: Array<TaskType> = [
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'React', isDone: false},
    {id: v1(), title: 'Redux', isDone: false},
  ];

  //state
  const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState);
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
    // const updatedTasks = tasks.map(t => {
    //   if (t.id === taskId) {
    //     return {...t, isDone};
    //   }
    //   return t;
    // });
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
