import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from '../App';
import {Provider} from 'react-redux';
import {store} from '../state/store';

export default {
  title: 'TodoList/App',
  component: App,
  args: {

  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args) => <Provider store={store}> <App/></Provider>;

export const AppStory = Template.bind({});
AppStory.args = {

};

