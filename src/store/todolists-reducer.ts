import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}

export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}
export type ChangeTodoListTitleAT = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type ChangeTodoListFilterAT = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: FilterValuesType
}
export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.id);

    case 'ADD-TODOLIST':
      const todoListID = v1();
      const newTodoList: TodoListType = {
        id: todoListID,
        title: action.title,
        filter: 'all'
      };
      return [...todoLists, newTodoList];

    case 'CHANGE-TODOLIST-TITLE':
      return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);

    case 'CHANGE-TODOLIST-FILTER':
      return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);

    default:
      return todoLists;
  }
};