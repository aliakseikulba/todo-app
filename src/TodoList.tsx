import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
        <EditableSpan title={t.title} />
        <button onClick={onRemoveHandler}>X</button>
      </li>
    );
  });

  const addTask = (title: string) => {
      props.addTask(title, props.id);
  };

  const setAll = () => props.changeFilter('all', props.id);
  const setActive = () => props.changeFilter('active', props.id);
  const setCompleted = () => props.changeFilter('completed', props.id);

  const allButtonClass = props.filter === 'all' ? 'active-filter' : '';
  const activeButtonClass = props.filter === 'active' ? 'active-filter' : '';
  const completedButtonClass = props.filter === 'completed' ? 'active-filter' : '';

  return (
    <div className="todolist">
      <h3>
        {props.title}
        <button onClick={() => {props.removeTodoList(props.id)}}>X</button>
      </h3>
     <AddItemForm addItem={addTask}/>
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