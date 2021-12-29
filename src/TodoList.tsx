import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton, List, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';


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

export const TodoList = React.memo((props: TodoListPropsType) => {

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props]);
  const removeTask = useCallback((taskID: string) => {
    props.removeTask(taskID, props.id);
  }, [props]);
  const changeTaskStatus = useCallback((taskID: string, newStatus: boolean) => {
    props.changeTaskStatus(taskID, newStatus, props.id);
  }, [props]);
  const changeTaskTitle = useCallback((taskId: string, title: string) => {
    props.changeTaskTitle(taskId, title, props.id);
  }, [props]);

  const setAll = useCallback(() => props.changeFilter(props.id, 'all'), [props]);
  const setActive = useCallback(() => props.changeFilter(props.id, 'active'), [props]);
  const setCompleted = useCallback(() => props.changeFilter(props.id, 'completed'), [props]);
  const changeTodoListTitle = useCallback( (title: string) => props.changeTodoListTitle(props.id, title),
    [props]);

  const allButtonClass = props.filter === 'all' ? 'active-filter' : '';
  const activeButtonClass = props.filter === 'active' ? 'active-filter' : '';
  const completedButtonClass = props.filter === 'completed' ? 'active-filter' : '';

  let tasksForRender = props.tasks;
  if (props.filter === 'active') {
    tasksForRender = tasksForRender.filter(task => !task.isDone);
  }
  if (props.filter === 'completed') {
    tasksForRender = tasksForRender.filter(task => task.isDone);
  }

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
          tasksForRender.map(t => {

            return (
              <Task key={t.id}
                    task={t}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
              />
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
});
