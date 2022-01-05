import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
 addItem: action('Button inside form clicked')
};
