import React from 'react';
import './App.css';
import TodoList from './TodoList';
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

  // const todoListID_1 = v1();
  // const todoListID_2 = v1();
  //
  // const [todoLists, dispatchTodoLists] = useReducer( todolistsReducer,[
  //   {id: todoListID_1, title: 'What to learn', filter: 'all'},
  //   {id: todoListID_2, title: 'What buy', filter: 'all'},
  // ]);
  //
  // const [tasks, dispatchTasks] = useReducer(tasksReducer,{
  //   [todoListID_1]: [
  //     {id: v1(), title: 'HTML', isDone: true},
  //     {id: v1(), title: 'CSS', isDone: true},
  //     {id: v1(), title: 'React', isDone: false},
  //     {id: v1(), title: 'Redux', isDone: false},
  //   ],
  //   [todoListID_2]: [
  //     {id: v1(), title: 'Bread', isDone: true},
  //     {id: v1(), title: 'Milk', isDone: true},
  //     {id: v1(), title: 'Jam', isDone: false},
  //     {id: v1(), title: 'Butter', isDone: false},
  //   ],
  // });

  const todoLists = useSelector<AppStateType, Array<TodoListType>>(state => state.todoLists);
  const tasks = useSelector<AppStateType, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();

  const addTAsk = (title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID));
  };
  const removeTask = (taskId: string, todoListID: string) => {
    dispatch(removeTaskAC(taskId, todoListID));
  };
  const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListID));
  };
  const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListID));
  };

  const changeFilter = (todoListID: string, filter: FilterValuesType) => {
    dispatch(changeTodoListFilterAC(todoListID, filter));
  };
  const changeTodoListTitle = (todoListID: string, title: string) => {
    dispatch(changeTodoListTitleAC(todoListID, title));
  };
  const removeTodoList = (todoListID: string) => {
    const action = removeTodoListAC(todoListID);
    dispatch(action);
    dispatch(action);
  };
  const addTodoList = (title: string) => {
    const action = addTodoListAC(title);
    dispatch(action);
  };

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

              let tasksForRender: Array<TaskType> = tasks[tl.id];
              if (tl.filter === 'active') {
                tasksForRender = tasks[tl.id].filter(task => !task.isDone);
              }
              if (tl.filter === 'completed') {
                tasksForRender = tasks[tl.id].filter(task => task.isDone);
              }

              return (
                <Grid item>
                  <Paper elevation={8} style={{padding: '20px'}}>
                    <TodoList
                      key={tl.id}
                      id={tl.id}
                      filter={tl.filter}
                      title={tl.title}
                      tasks={tasksForRender}
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
