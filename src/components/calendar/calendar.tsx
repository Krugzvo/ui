import type { KeyboardEvent, ReactNode } from 'react';

import { cn } from '../../lib/cn';

import { Typography } from '../typography';

export type CalendarEvent = {
	id: string;
	title: string;
	time?: string;
	subtitle?: ReactNode;
	category?: string;
	onClick?: () => void;
};

export type CalendarDateGroup = {
	id: string;
	date: Date;
	events: CalendarEvent[];
};

export type CalendarProps = {
	groups: CalendarDateGroup[];
	eyebrow?: ReactNode;
	action?: ReactNode;
	loading?: boolean;
	loadingRowCount?: number;
	disabled?: boolean;
	disabledMessage?: ReactNode;
	emptyMessage?: ReactNode;
	locale?: string;
	className?: string;
};

function formatDayLabel(date: Date, locale?: string) {
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
	}).format(date);
}

function CalendarDayLabel({ date, locale }: { date: Date; locale?: string }) {
	return (
		<div className="relative mt-5 mb-1 flex items-center first:mt-0">
			<span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[var(--ui-calendar-row-border)]" />
			<Typography
				as="span"
				variant="description"
				className="relative z-[1] ml-3 whitespace-nowrap bg-[var(--ui-calendar-background)] pr-2.5 font-bold uppercase tracking-wide text-[var(--ui-calendar-text-secondary)]">
				{formatDayLabel(date, locale)}
			</Typography>
		</div>
	);
}

function CalendarRow({ event }: { event: CalendarEvent }) {
	const interactive = Boolean(event.onClick);

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (!interactive) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			event.onClick?.();
		}
	}

	return (
		<div
			className={cn(
				'flex items-baseline gap-[18px] rounded-lg px-1 py-2.5',
				interactive &&
					'cursor-pointer hover:bg-[var(--ui-calendar-row-hover)] focus-visible:bg-[var(--ui-calendar-row-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-focus-ring)]'
			)}
			role={interactive ? 'button' : undefined}
			tabIndex={interactive ? 0 : undefined}
			onClick={event.onClick}
			onKeyDown={handleKeyDown}>
			<span className="w-[52px] flex-none text-[15px] font-semibold tabular-nums text-[var(--ui-calendar-text)]">
				{event.time}
			</span>
			<div className="min-w-0 flex-1">
				<Typography
					as="p"
					variant="body2"
					className="font-semibold text-[var(--ui-calendar-text)]">
					{event.title}
				</Typography>
				{event.subtitle && (
					<Typography
						as="p"
						variant="description"
						className="mt-0.5 text-[var(--ui-calendar-text-secondary)]">
						{event.subtitle}
					</Typography>
				)}
			</div>
			{event.category && (
				<span className="flex-none self-center whitespace-nowrap text-[11px] font-bold uppercase tracking-wide text-[var(--ui-calendar-text-secondary)]">
					{event.category}
				</span>
			)}
		</div>
	);
}

function CalendarSkeletonRow() {
	return (
		<div className="flex items-baseline gap-[18px] px-1 py-2.5">
			<div className="h-4 w-[36px] flex-none animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="h-3 w-1/2 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
				<div className="h-2.5 w-1/3 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
			</div>
			<div className="h-2.5 w-12 flex-none animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
		</div>
	);
}

export function Calendar({
	groups,
	eyebrow,
	action,
	loading = false,
	loadingRowCount = 3,
	disabled = false,
	disabledMessage,
	emptyMessage,
	locale,
	className,
}: CalendarProps) {
	return (
		<div
			className={cn(
				'rounded-[14px] border border-[var(--ui-calendar-border)] bg-[var(--ui-calendar-background)] p-[22px] pb-2 font-[family-name:var(--ui-font-family)]',
				className
			)}
			aria-disabled={disabled || undefined}>
			{(eyebrow || action) && (
				<div className="mb-[18px] flex items-baseline justify-between gap-3">
					{eyebrow && (
						<Typography
							as="p"
							variant="description"
							className="font-bold uppercase tracking-[0.08em] text-[var(--ui-calendar-text-secondary)]">
							{eyebrow}
						</Typography>
					)}
					{action}
				</div>
			)}

			{loading ? (
				<div className="flex flex-col">
					{Array.from({ length: loadingRowCount }).map((_, index) => (
						<CalendarSkeletonRow key={index} />
					))}
				</div>
			) : groups.length === 0 ? (
				<div className="px-1 py-7 text-center">
					<Typography
						as="p"
						variant="description"
						className="text-[var(--ui-calendar-text-muted)]">
						{emptyMessage}
					</Typography>
				</div>
			) : (
				<div className={cn(disabled && 'pointer-events-none opacity-50')}>
					{groups.map((group) => (
						<div key={group.id}>
							<CalendarDayLabel date={group.date} locale={locale} />
							{group.events.map((event) => (
								<CalendarRow key={event.id} event={event} />
							))}
						</div>
					))}
				</div>
			)}

			{disabled && disabledMessage && (
				<Typography
					as="p"
					variant="description"
					className="mb-2 mt-2 text-[var(--ui-calendar-text-muted)]">
					{disabledMessage}
				</Typography>
			)}
		</div>
	);
}
