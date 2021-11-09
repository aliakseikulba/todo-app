import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';


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
  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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

  let tasksForRender = tasks;
  if (filter === 'active') {
    tasksForRender = tasks.filter(task => !task.isDone);
  }
  if (filter === 'completed') {
    tasksForRender = tasks.filter(task => task.isDone);
  }

  const addTAsk = (title: string, todoListID: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    };
    setTasks({...tasks,
      [todoListID]: [newTask, ...tasks[todoListID]]});
  };

  const removeTask = (taskId: string, todoListID: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})
  };

  const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    setTasks({...tasks,
      [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
    })
  };

  const changeFilter = (filter: FilterValuesType, todoListID: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
  };

  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
  }


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
