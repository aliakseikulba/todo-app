import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TodoList/Task',
  component: Task,
  args: {
    removeTask: action('Remove button inside Task'),
    changeTaskStatus: action('Status changed inside Task'),
    changeTaskTitle: action('Title changed inside Task'),
  },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  task: {id: '1', isDone: true, title: 'JS' },
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  task: {id: '2', isDone: false, title: 'TS' },
};
