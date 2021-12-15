import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

export type AppStateType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks: tasksReducer
})

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;