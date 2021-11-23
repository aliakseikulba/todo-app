import React, {ChangeEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {Edit} from '@material-ui/icons';

type EditableSpanPropsType = {
  title: string
  setNewTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>('');


  const onEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const offEditMode = () => {
    setEditMode(false);
    props.setNewTitle(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {editMode
        ? <TextField autoFocus
                     style={{width: "120px"}}
                     value={title}
                     onBlur={offEditMode}
                     onChange={changeTitle}/>
        : <span>{props.title}
          <IconButton onClick={onEditMode}>
          <Edit fontSize="small"/>
        </IconButton></span>
      }
    </>
  );
};
