import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';

import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';
import {TaskType} from '../App';

export default {
  title: 'TODOLISTS/Task',
  component: Task,
} as ComponentMeta<typeof Task>;

// const Template: Story<typeof Task> = (args) => <Task {...args} />;
//
// export const TaskIsDoneStory = Template.bind({});
// TaskIsDoneStory.args = {
//   task: {id: '1', isDone: true, title: 'JS'},
//   removeTask: action('remove task'),
//     changeTaskStatus: action('changeTaskStatus'),
//   changeTaskTitle: action('changeTaskTitle')
// };

