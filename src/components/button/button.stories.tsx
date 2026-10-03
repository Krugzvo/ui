import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { CrossIcon } from '../../icons';

import { Button } from './button';

const meta = {
	title: 'Components/Button',
	component: Button,
	args: {
		children: 'Button',
		onClick: fn(),
	},
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithIcon: Story = {
	args: { icon: <CrossIcon /> },
};

export const IconOnly: Story = {
	args: {
		'aria-label': 'Close',
		children: undefined,
		icon: <CrossIcon />,
		iconOnly: true,
	},
};

export const Interaction: Story = {
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Button' });
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalledOnce();
	},
};

export const Disabled: Story = {
	args: { disabled: true },
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: 'Button' });
		await userEvent.click(button);
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};

const variants = ['primary', 'secondary', 'ghost'] as const;
const sizes = ['md', 'sm'] as const;
const states = ['default', 'hover', 'active', 'disabled'] as const;

const previewStateClasses = {
	primary: {
		hover: 'bg-[var(--ui-color-primary-hover)]',
		active: 'bg-[var(--ui-color-primary-pressed)]',
	},
	secondary: {
		hover:
			'bg-[var(--ui-color-surface-accent)] border-[var(--ui-color-border-strong)]',
		active:
			'bg-[var(--ui-color-surface-accent)] border-[var(--ui-color-primary-pressed)]',
	},
	ghost: {
		hover: 'bg-[var(--ui-color-surface-accent)]',
		active: 'bg-[var(--ui-color-surface-accent)]',
	},
} as const;

export const Matrix: Story = {
	render: () => (
		<div style={{ display: 'grid', gap: 32 }}>
			{(['light', 'dark'] as const).map((theme) => (
				<section
					key={theme}
					className={theme === 'dark' ? 'dark' : undefined}
					style={{ background: 'var(--ui-color-background)', padding: 32 }}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, max-content)',
							gap: 12,
						}}
					>
						{sizes.flatMap((size) =>
							variants.flatMap((variant) =>
								states.map((state) => (
									<Button
										key={`${theme}-${size}-${variant}-${state}`}
										variant={variant}
										size={size}
										disabled={state === 'disabled'}
										className={
											state === 'hover' || state === 'active'
												? previewStateClasses[variant][state]
												: undefined
										}
										icon={<CrossIcon />}
									>
										Button
									</Button>
								))
							)
						)}
					</div>
				</section>
			))}
		</div>
	),
};
