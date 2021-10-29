import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';


type TodoListPropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

  const [title, setTitle] = useState<string>('');

  const tasksJSXElements = props.tasks.map(task => {
    const onRemoveHandle = () => props.removeTask(task.id);

    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone}/>
        <span>{task.title}</span>
        <button onClick={onRemoveHandle}>X</button>
      </li>
    );
  });
  const addTask = () => {
    if (title) {
      props.addTask(title);
      setTitle('');
    }
  };
  const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const setAll = () => props.changeFilter('all');
  const setActive = () => props.changeFilter('active');
  const setCompleted = () => props.changeFilter('completed');

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input
          placeholder="Add task..."
          value={title}
          onChange={onChangeHandle}
          onKeyPress={onKeyPressHandle}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksJSXElements}
      </ul>
      <div>
        <button onClick={setAll}>All</button>
        <button onClick={setActive}>Active</button>
        <button onClick={setCompleted}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;