import React, {useCallback} from 'react';
import './App.css';
import {TodoList} from './TodoList';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
  addTodoListAC,
  changeTodoListFilterAC,
  changeTodoListTitleAC,
  removeTodoListAC,
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';


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

  const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);
  const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  const addTAsk = useCallback((title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID));
  }, [dispatch]);
  const removeTask = useCallback((taskId: string, todoListID: string) => {
    dispatch(removeTaskAC(taskId, todoListID));
  }, [dispatch]);
  const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListID));
  }, [dispatch]);
  const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListID));
  }, [dispatch]);

  const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
    dispatch(changeTodoListFilterAC(todoListID, filter));
  }, [dispatch]);
  const changeTodoListTitle = useCallback((todoListID: string, title: string) => {
    dispatch(changeTodoListTitleAC(todoListID, title));
  }, [dispatch]);
  const removeTodoList = useCallback((todoListID: string) => {
    const action = removeTodoListAC(todoListID);
    dispatch(action);
  }, [dispatch]);
  const addTodoList = useCallback(
    (title: string) => {
      const action = addTodoListAC(title);
      dispatch(action);
    }, [dispatch]);

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{justifyContent: 'space-between'}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            Todolists
          </Typography>
          <Button color="inherit" variant={'outlined'}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: '20px 0'}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={6}>
          {
            todoLists.map(tl => {

              return (
                <Grid item key={tl.id}>
                  <Paper elevation={8} style={{padding: '20px'}}>
                    <TodoList
                      id={tl.id}
                      filter={tl.filter}
                      title={tl.title}
                      tasks={tasks[tl.id]}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTAsk}
                      changeTaskStatus={changeTaskStatus}
                      removeTodoList={removeTodoList}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              );
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export {App};
