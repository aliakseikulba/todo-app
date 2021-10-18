import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

  let tasksForState: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
  ];

  const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  // let tasks: Array<TaskType> = [  // []TaskType
  //   { id: 1, title: 'HTML', isDone: true },
  //   { id: 2, title: 'CSS', isDone: true },
  //   { id: 3, title: 'React', isDone: false },
  //   { id: 4, title: 'Redux', isDone: false },
  // ];

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  let tasksForRender = tasks;
  if (filter === 'active') {
    tasksForRender = tasks.filter(task => task.isDone === false);
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(task => task.isDone === true);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={tasksForRender}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />

      {/*<TodoList title="What to buy"/>*/}
      {/*<TodoList title="What to read"/>*/}
    </div>
  );
}

export default App;
