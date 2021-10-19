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

  //data to state
  let tasksForState: Array<TaskType> = [
    {id: 1, title: 'HTML', isDone: true},
    {id: 2, title: 'CSS', isDone: true},
    {id: 3, title: 'React', isDone: false},
    {id: 4, title: 'Redux', isDone: false},
  ];

  //state
  const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  //remove tasks function
  const removeTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  //tasks filter function
  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
  };

  //filter for tasks rendering
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
    </div>
  );
}

export default App;
