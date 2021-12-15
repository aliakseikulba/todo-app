import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type ChangeTodoListTitleAT = ReturnType<typeof changeTodoListTitleAC>
export type ChangeTodoListFilterAT = ReturnType<typeof changeTodoListFilterAC>
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {

    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.todoListID);
    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todoListID,
        title: action.title,
        filter: 'all'
      };
      return [ newTodoList, ...todoLists];
    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);

    default:
      return todoLists;
  }
};

export const removeTodoListAC = (todolistID: string) => {
    return {
      type: 'REMOVE-TODOLIST',
      todoListID: todolistID
    } as const;
  };

export const addTodoListAC = (todolistTitle: string) => {
    return {
      type: 'ADD-TODOLIST',
      todoListID: v1(),
      title: todolistTitle
    } as const;
  };

export const changeTodoListTitleAC = (todolistID: string, todolistTitle: string) => {
    return {
      type: 'CHANGE-TODOLIST-TITLE',
      id: todolistID,
      title: todolistTitle,
    } as const;
  };

export const changeTodoListFilterAC = (todolistID: string, todolistFilter: FilterValuesType) => {
    return {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistID,
      filter: todolistFilter
    } as const;
  };