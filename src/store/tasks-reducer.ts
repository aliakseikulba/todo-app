import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;

export type ActionType = RemoveTaskAT
  | AddTaskAT
  | ChangeTaskStatusAT
  | ChangeTaskTitleAT
  | AddTodoListAT
  | RemoveTodoListAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
  switch (action.type) {

    case 'REMOVE-TASK':
      return {
        ...state, [action.todolistID]: state[action.todolistID]
          .filter(t => t.id !== action.taskID)
      };
    case 'ADD-TASK': {
      return {
        ...state, [action.todoListID]: [
          {id: v1(), title: action.taskTitle, isDone: false}, ...state[action.todoListID]]
      };
    }
    case 'CHANGE-TASK-STATUS': {
      return {
        ...state, [action.todoListID]: state[action.todoListID].map(t =>
          t.id === action.taskID ? {...t, isDone: action.value} : t)
      };
    }
    case 'CHANGE-TASK-TITLE': {
      return {
        ...state, [action.todoListID]: state[action.todoListID].map(t =>
          t.id === action.taskID ? {...t, title: action.title} : t)
      };
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.todoListID]: []
      };
    }
    case 'REMOVE-TODOLIST': {
      let newState = {...state};
      delete newState[action.todoListID];
      return newState;
    }

    default:
      return state;
  }
};

export const removeTaskAC = (taskID: string, todolistID: string) => {
  return {
    type: 'REMOVE-TASK',
    todolistID,
    taskID
  } as const;
};

export const addTaskAC = (taskTitle: string, todoListID: string) => {
  return {
    type: 'ADD-TASK',
    taskTitle,
    todoListID
  } as const;
};

export const changeTaskStatusAC = (taskID: string, value: boolean, todoListID: string) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    taskID,
    value,
    todoListID
  } as const;
};

export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string) => {
  return {
    type: 'CHANGE-TASK-TITLE',
    taskID,
    title,
    todoListID
  } as const;
};