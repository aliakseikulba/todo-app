import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import {Task, TaskPropsType} from '../Task';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TodoList/Task',
  component: Task,
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action('Remove button inside Task');
const changeTaskStatusCallback = action('Status changed inside Task');
const changeTaskTitleCallback = action('Title changed inside Task');

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
  removeTask: removeTaskCallback,
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
}

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
  ...baseArgs,
  task: {id: '1', isDone: true, title: 'JS' },
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  ...baseArgs,
  task: {id: '1', isDone: false, title: 'JS' },
};
