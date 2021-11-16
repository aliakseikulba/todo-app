import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  title: string
  setNewTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>('');


  const onEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
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
      {editMode ?
        <input autoFocus
               value={title}
               onBlur={offEditMode}
               onChange={changeTitle}/> :
        <span onDoubleClick={onEditMode}>{props.title}</span>
      }
    </>
  );
};
