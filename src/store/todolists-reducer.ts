import {TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
  type: 'REMOVE-TODOLIST'
  id: string
}

type AddTodoListAT = {
  type: 'ADD-TODOLIST'
  title: string
}

type ActionsType = RemoveTodoListAT | AddTodoListAT

export const todolistsReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return todoLists.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      const todoListID = v1();
      const newTodoList: TodoListType = {
        id: todoListID,
        title: action.title,
        filter: 'all'
      }
      return [...todoLists, newTodoList]
    default:
      return todoLists;
  }
};