import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  todoListID: string
}
export type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
  todoListID: string
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
      return todoLists.filter(tl => tl.id !== action.todoListID);

    case 'ADD-TODOLIST':
      const newTodoList: TodoListType = {
        id: action.todoListID,
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

export const RemoveTodoListAC =
  (todolistID: string): RemoveTodoListAT => {
    return {
      type: 'REMOVE-TODOLIST',
      todoListID: todolistID
    };
  };

export const AddTodoListAC =
  (todolistTitle: string): AddTodoListAT => {
    return {
      type: 'ADD-TODOLIST',
      todoListID: v1(),
      title: todolistTitle
    };
  };

export const ChangeTodoListTitleAC =
  (todolistTitle: string, todolistID: string): ChangeTodoListTitleAT => {
    return {
      type: 'CHANGE-TODOLIST-TITLE',
      id: todolistID,
      title: todolistTitle,
    };
  };

export const ChangeTodoListFilterAC =
  (todolistID: string, todolistFilter: FilterValuesType): ChangeTodoListFilterAT => {
    return {
      type: 'CHANGE-TODOLIST-FILTER',
      id: todolistID,
      filter: todolistFilter
    };
  };