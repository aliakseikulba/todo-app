import {TasksStateType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type AddTask = ReturnType<typeof addTaskAC>;

export type ActionType = RemoveTaskAT | AddTask

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
