import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';


type TodoListPropsType = {
  filter: FilterValuesType
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

  const [title, setTitle] = useState<string>('');

  const tasksJSXElements = props.tasks.map(t => {
    const onRemoveHandler = () => props.removeTask(t.id);

    return (
      <li key={t.id}>
        <input type="checkbox" checked={t.isDone}/>
        <span>{t.title}</span>
        <button onClick={onRemoveHandler}>X</button>
      </li>
    );
  });

  const addTask = () => {
    if (title) {
      props.addTask(title);
      setTitle('');
    }
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const setAll = () => props.changeFilter('all');
  const setActive = () => props.changeFilter('active');
  const setCompleted = () => props.changeFilter('completed');

  const allButtonClass = props.filter === 'all' ? 'active-filter' : '';
  const activeButtonClass = props.filter === 'active' ? 'active-filter' : '';
  const completedButtonClass = props.filter === 'completed' ? 'active-filter' : '';

  return (
    <div className="todolist">
      <h3>{props.title}</h3>
      <div>
        <input
          placeholder="Add task..."
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {tasksJSXElements}
      </ul>
      <div>
        <button
          className={allButtonClass}
          onClick={setAll}>All
        </button>
        <button
          className={activeButtonClass}
          onClick={setActive}>Active</button>
        <button
          className={completedButtonClass}
          onClick={setCompleted}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;