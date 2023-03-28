import React from 'react'

import type {Story, Meta} from '@storybook/react'

import Button, {ButtonProps} from '../components/Button'

export default {
  component: Button,
  title: 'Components/Button',
} as Meta

// 👇 We create a “template” of how args map to rendering
const Template: Story<ButtonProps> = args => <Button {...args} />

export const WhiteButton = Template.bind({})
export const RedButton = Template.bind({})

WhiteButton.args = {
  text: 'White button',
}

RedButton.args = {
  text: 'Red button',
  background: 'red',
}
