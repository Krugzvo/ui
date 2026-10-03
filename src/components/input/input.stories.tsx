import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { ArrowSingleUpIcon } from '../../icons';

import { Input } from './input';

const meta = {
	title: 'Components/Input',
	component: Input,
	args: {
		placeholder: 'your text here...',
	},
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
	args: {
		clearable: true,
		leftIcon: <ArrowSingleUpIcon />,
		onClear: fn(),
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button', { name: 'Clear input' }));
		await expect(args.onClear).toHaveBeenCalledOnce();
		await expect(canvas.getByRole('textbox')).toHaveFocus();
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const Error: Story = {
	args: {
		status: 'error',
	},
};

export const Success: Story = {
	args: {
		status: 'success',
	},
};

const states = ['default', 'error', 'success'] as const;

export const Matrix: Story = {
	render: () => (
		<div className="grid grid-cols-2 gap-3 bg-black p-5">
			{states.map((status) => (
				<Input key={`${status}-plain`} status={status} placeholder="your text here..." />
			))}
			{states.map((status) => (
				<Input
					key={`${status}-icons`}
					status={status}
					placeholder="your text here..."
					leftIcon={<ArrowSingleUpIcon />}
					clearable
				/>
			))}
			<Input disabled placeholder="your text here..." />
			<Input disabled clearable leftIcon={<ArrowSingleUpIcon />} placeholder="your text here..." />
		</div>
	),
};
