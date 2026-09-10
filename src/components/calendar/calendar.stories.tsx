import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import { Calendar } from './calendar';
import type { CalendarDateGroup } from './calendar';

function addDays(base: Date, days: number) {
	const date = new Date(base);
	date.setDate(date.getDate() + days);
	return date;
}

const today = new Date();

const defaultGroups: CalendarDateGroup[] = [
	{
		id: 'today',
		date: today,
		defaultExpanded: true,
		events: [
			{
				id: 'dinner',
				title: 'Гейминг',
				time: '18:00',
				subtitle: 'Steam',
				category: { label: 'Друзья', color: '#4a4aff' },
				onClick: fn(),
			},
			{
				id: 'standup',
				title: 'Дейлик',
				time: '10:20',
				subtitle: 'Google Meet',
				category: { label: 'Работа', color: '#c9772f' },
				onClick: fn(),
			},
		],
	},
	{
		id: 'workout',
		date: addDays(today, 1),
		events: [
			{
				id: 'workout-1',
				title: 'Тренировка',
				time: '21:00',
				subtitle: 'Спортзал',
				category: { label: 'Спорт', color: '#1d9e75' },
				onClick: fn(),
			},
		],
	},
	{
		id: 'movie',
		date: addDays(today, 4),
		events: [
			{
				id: 'movie-1',
				title: 'Человек паук',
				time: '19:00',
				subtitle: 'Кинотеатр Саларьево',
				category: { label: 'Друзья', color: '#d4537e' },
				onClick: fn(),
			},
		],
	},
];

const meta = {
	title: 'Components/Calendar',
	component: Calendar,
	args: {
		eyebrow: 'Предстоящие события',
		groups: defaultGroups,
	},
	parameters: {
		layout: 'padded',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
	args: {
		loading: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		disabledMessage: 'Календарь недоступен — нет доступа к календарю',
	},
};

export const Empty: Story = {
	args: {
		groups: [],
		emptyMessage: 'Событий пока нет',
	},
};

export const ExpandCollapse: Story = {
	args: {
		eyebrow: undefined,
		groups: [{ ...defaultGroups[0], defaultExpanded: false }],
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const toggle = canvas.getByRole('button', { expanded: false });
		await userEvent.click(toggle);
		await expect(
			canvas.getByRole('button', { expanded: true })
		).toBeInTheDocument();
	},
};

export const Interaction: Story = {
	args: {
		eyebrow: undefined,
		groups: [defaultGroups[1]],
	},
	play: async ({ args, canvasElement }) => {
		const canvas = within(canvasElement);
		const row = canvas.getByRole('button', { name: /Тренировка/ });
		await userEvent.click(row);
		await expect(args.groups[0].events[0].onClick).toHaveBeenCalledOnce();
	},
};
