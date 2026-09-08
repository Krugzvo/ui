import type { Meta, StoryObj } from '@storybook/react-vite';

import { Typography } from './typography';

const meta = {
	title: 'Components/Typography',
	component: Typography,
	tags: ['autodocs'],
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
	args: { children: 'Typography', variant: 'body1' },
};

export const Scale: Story = {
	render: () => (
		<div style={{ display: 'grid', gap: 16 }}>
			<Typography variant="h1">Heading 1</Typography>
			<Typography variant="h2">Heading 2</Typography>
			<Typography variant="h3">Heading 3</Typography>
			<Typography variant="h4">Heading 4</Typography>
			<Typography variant="h5">Heading 5</Typography>
			<Typography variant="h6">Heading 6</Typography>
			<Typography variant="body1">Body 1</Typography>
			<Typography variant="body2">Body 2</Typography>
			<Typography variant="description">Description</Typography>
		</div>
	),
};
