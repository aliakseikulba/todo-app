import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
 addItem: action('Button inside form clicked')
};
