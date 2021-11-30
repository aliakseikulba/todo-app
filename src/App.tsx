import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';


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
  ]);

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
  });

  const addTAsk = (title: string, todoListID: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false
    };
    setTasks({
      ...tasks,
      [todoListID]: [newTask, ...tasks[todoListID]]
    });
  };
  const removeTask = (taskId: string, todoListID: string) => {
    setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)});
  };
  const changeTaskStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone} : t)
    });
  };
  const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
    setTasks({
      ...tasks,
      [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title} : t)
    });
  };

  const changeFilter = (filter: FilterValuesType, todoListID: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl));
  };
  const changeTodoListTitle = (title: string, todoListID: string) => {
    setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl));
  };
  const removeTodoList = (todoListID: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
    delete tasks[todoListID];
  };
  const addTodoList = (title: string) => {
    const todoListID = v1();
    const newTodoList: TodoListType = {
      id: todoListID,
      title,
      filter: 'all'
    }
      setTodoLists([...todoLists, newTodoList])
      setTasks({...tasks, [todoListID]: []})
  }



  ///UI
  const todoListComponents = todoLists.map(tl => {

    let tasksForRender: Array<TaskType> = tasks[tl.id];
    if (tl.filter === 'active') {
      tasksForRender = tasks[tl.id].filter(task => !task.isDone);
    }
    if (tl.filter === 'completed') {
      tasksForRender = tasks[tl.id].filter(task => task.isDone);
    }

    return (
      <Grid item
            key={tl.id}>
        <Paper elevation={8} style={{padding: "20px"}}>
          <TodoList
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
    )
  })

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar style={{justifyContent: "space-between"}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            Todolists
          </Typography>
          <Button color="inherit" variant={"outlined"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px 0"}}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={6}>
          {todoListComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
