import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import {Delete, DeleteOutline} from '@material-ui/icons';


type TodoListPropsType = {
  id: string
  filter: FilterValuesType
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListID: string) => void
  changeFilter: (todoListID: string, filter: FilterValuesType) => void
  addTask: (title: string, todoListID: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
  removeTodoList: (todoListID: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
  changeTodoListTitle: (todoListID: string, title: string) => void
}

const TodoList = (props: TodoListPropsType) => {

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const setAll = () => props.changeFilter(props.id, 'all');
  const setActive = () => props.changeFilter(props.id, 'active');
  const setCompleted = () => props.changeFilter(props.id, 'completed');
  const changeTodoListTitle = (title: string) => props.changeTodoListTitle(props.id, title);

  const allButtonClass = props.filter === 'all' ? 'active-filter' : '';
  const activeButtonClass = props.filter === 'active' ? 'active-filter' : '';
  const completedButtonClass = props.filter === 'completed' ? 'active-filter' : '';

  return (
    <div className="todolist">
      <Typography variant="h6"
                  align="center"
                  style={{fontWeight: 600}}>
        <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
        <IconButton onClick={() => {
          props.removeTodoList(props.id);
        }}>
          <Delete/>
        </IconButton>
      </Typography>
      <AddItemForm addItem={addTask}/>
      <List>
        {
          props.tasks.map(t => {
            const onRemoveHandler = () => props.removeTask(t.id, props.id);
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };
            const changeTitle = (title: string) => {
              props.changeTaskTitle(t.id, title, props.id);
            };

            return (
              <ListItem
                disableGutters
                key={t.id}
                className={t.isDone ? 'is-done' : ''}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: 0
                }}>
                <Checkbox onChange={onChangeHandler}
                          checked={t.isDone}
                          color="primary"/>
                <EditableSpan title={t.title} setNewTitle={changeTitle}/>
                <IconButton>
                  <DeleteOutline onClick={onRemoveHandler}
                                 fontSize="small"/>
                </IconButton>
              </ListItem>
            );
          })
        }
      </List>
      <div>
        <ButtonGroup aria-label="small outlined button group" disableElevation>
          <Button color={props.filter === 'all' ? 'primary' : 'default'}
                  className={allButtonClass}
                  onClick={setAll}>All
          </Button>
          <Button color={props.filter === 'active' ? 'primary' : 'default'}
                  className={activeButtonClass}
                  onClick={setActive}>Active
          </Button>
          <Button color={props.filter === 'completed' ? 'primary' : 'default'}
                  className={completedButtonClass}
                  onClick={setCompleted}>Completed
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default TodoList;