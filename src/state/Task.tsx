import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from '../EditableSpan';
import {DeleteOutline} from '@material-ui/icons';
import {TaskType} from '../App';

type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  changeTaskTitle: (taskId: string, title: string) => void
}

const Task = React.memo(({task, changeTaskStatus, changeTaskTitle, removeTask}: TaskPropsType) => {

  const onRemoveHandler = () => removeTask(task.id);
  const onChangeHandler = useCallback( (e: ChangeEvent<HTMLInputElement>) => {
    changeTaskStatus(task.id, e.currentTarget.checked);
  }, [changeTaskStatus, task.id]);
  const changeTitle = useCallback((title: string) => {
    changeTaskTitle(task.id, title);
  }, [changeTaskTitle, task.id]);

  return (
    <ListItem
      disableGutters
      key={task.id}
      className={task.isDone ? 'is-done' : ''}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 0
      }}>
      <Checkbox onChange={onChangeHandler}
                checked={task.isDone}
                color="primary"/>
      <EditableSpan title={task.title} setNewTitle={changeTitle}/>
      <IconButton onClick={onRemoveHandler}>
        <DeleteOutline
          fontSize="small"/>
      </IconButton>
    </ListItem>
  );
})

export {Task};