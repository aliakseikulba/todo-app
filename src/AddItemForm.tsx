import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const errorMessageStyle = {color: "red"};
  const errorInputStyle = {border: "2px solid red", outline: "none"}

  const errorMessage = error
    ? <div style={errorMessageStyle}>Title is required</div>
    : null;

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
      <input
        style={error ? errorInputStyle : undefined}
        placeholder="Add title..."
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}/>
      <button onClick={addItem}>+</button>
      {errorMessage}
    </div>
  );
};

