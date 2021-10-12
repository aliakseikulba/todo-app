import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const tasks_1: Array<TaskType> = [  // TaskType []
    { id: 1, title: 'HTML', isDone: true },
    { id: 2, title: 'CSS', isDone: true },
    { id: 3, title: 'React', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
  ];

    return (
        <div className="App">
            <TodoList
              title="What to learn"
              tasks={tasks_1}
            />


            {/*<TodoList title="What to buy"/>*/}
            {/*<TodoList title="What to read"/>*/}
        </div>
    );
}

export default App;
