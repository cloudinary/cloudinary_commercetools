import React from 'react'

import type {Story, Meta} from '@storybook/react'

import ImageCard, {ImageCardProps} from '../components/ImageCard'

export default {
  component: ImageCard,
  title: 'Components/ImageCard',
} as Meta

const Template: Story<ImageCardProps> = args => <ImageCard {...args} />

export const RegularImage = Template.bind({})

RegularImage.args = {
  title: 'Glass',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut vehicula velit.',
  src: '/assets/Shanghai.jpg',
}
