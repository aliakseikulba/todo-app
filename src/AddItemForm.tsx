import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import {AddCircleOutline} from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const errorMessage = "Title is required";

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setTitle(e.currentTarget.value);
  };

  const addItem = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      props.addItem(trimmedTitle);
    } else {
      setError(true);
    }
    setTitle('');
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div>
      <TextField value={title}
                 size="small"
                 variant="outlined"
                 onChange={onChangeHandler}
                 onKeyPress={onKeyPressHandler}
                 label='title'
                 error={error}
                 helperText={error && errorMessage}
      />
      <IconButton onClick={addItem}
                  color="primary"
                  size="small"
      >
        <AddCircleOutline fontSize={'large'}/>
      </IconButton>
    </div>
  );
};

