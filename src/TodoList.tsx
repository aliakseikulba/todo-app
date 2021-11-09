import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';


type TodoListPropsType = {
  id: string
  filter: FilterValuesType
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListID: string) => void
  changeFilter: (filter: FilterValuesType, todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
}

const TodoList = (props: TodoListPropsType) => {

  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const tasksJSXElements = props.tasks.map(t => {
    const onRemoveHandler = () => props.removeTask(t.id, props.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
    };

    return (
      <li
        key={t.id}
        className={t.isDone ? 'is-done' : ''}>
        <input
          type="checkbox"
          checked={t.isDone}
          onChange={onChangeHandler}/>
        <span>{t.title}</span>
        <button onClick={onRemoveHandler}>X</button>
      </li>
    );
  });

  const addTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addTask(trimmedTitle, props.id);
    } else {
      setError(true);
    }
    setTitle('');
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  const setAll = () => props.changeFilter('all', props.id);
  const setActive = () => props.changeFilter('active', props.id);
  const setCompleted = () => props.changeFilter('completed', props.id);

  const allButtonClass = props.filter === 'all' ? 'active-filter' : '';
  const activeButtonClass = props.filter === 'active' ? 'active-filter' : '';
  const completedButtonClass = props.filter === 'completed' ? 'active-filter' : '';
  const errorMessage = error
    ? <div style={{color: 'red'}}>Title is required</div>
    : null;

  return (
    <div className="todolist">
      <h3>{props.title} <button onClick={() => {props.removeTodoList(props.id)}}>X</button></h3>
      <div>
        <input
          className={error ? 'error' : ''}
          placeholder="Add task..."
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {errorMessage}
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
          onClick={setActive}>Active
        </button>
        <button
          className={completedButtonClass}
          onClick={setCompleted}>Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;