import type { Meta, StoryObj } from '@storybook/react-vite';

import { Status } from './status';
import { Typography } from '../typography';

const meta = {
	title: 'Components/Status',
	component: Status,
	tags: ['autodocs'],
} satisfies Meta<typeof Status>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body: Story = {
	args: {
		children: <Typography variant="body1">Status</Typography>,
		variant: 'base',
	},
};

export const Variants: Story = {
	args: { variant: 'base' },
	render: () => (
		<div style={{ display: 'grid', gap: 16 }}>
			<Status variant="base">
				<Typography variant="body1">Status</Typography>
			</Status>
			<Status variant="success">
				<Typography variant="body1">Status</Typography>
			</Status>
			<Status variant="warning">
				<Typography variant="body1">Status</Typography>
			</Status>
			<Status variant="error">
				<Typography variant="body1">Status</Typography>
			</Status>
		</div>
	),
};
