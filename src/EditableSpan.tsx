import React from 'react';

type EditableSpanPropsType = {
  title: string
}


export const EditableSpan = (props: EditableSpanPropsType) => {
  return (
    <>
      <span>{props.title}</span>
    </>
  );
};
