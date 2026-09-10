import { useState, type KeyboardEvent, type ReactNode } from 'react';

import { cn } from '../../lib/cn';
import { ArrowDownIcon } from '../../icons';

import { Typography } from '../typography';

export type CalendarEventCategory = {
	label: string;
	color: string;
};

export type CalendarEvent = {
	id: string;
	title: string;
	time?: string;
	subtitle?: ReactNode;
	icon?: ReactNode;
	category?: CalendarEventCategory;
	onClick?: () => void;
};

export type CalendarDateGroup = {
	id: string;
	date: Date;
	events: CalendarEvent[];
	defaultExpanded?: boolean;
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

function formatDateParts(date: Date, locale?: string) {
	return {
		day: date.getDate(),
		month: new Intl.DateTimeFormat(locale, { month: 'short' }).format(date).replace('.', ''),
	};
}

function CalendarDateBadge({ date, locale }: { date: Date; locale?: string }) {
	const { day, month } = formatDateParts(date, locale);

	return (
		<div className="flex h-[46px] w-[46px] flex-none flex-col items-center justify-center gap-[1px] rounded-[10px] border border-[var(--ui-calendar-date-border)]">
			<span className="text-[19px] font-bold leading-none text-[var(--ui-calendar-accent)]">{day}</span>
			<span className="text-[8px] font-semibold uppercase tracking-wide text-[var(--ui-calendar-text-secondary)]">{month}</span>
		</div>
	);
}

function CalendarSkeletonRow() {
	return (
		<div className="flex items-center gap-3.5 p-3">
			<div className="h-[46px] w-[46px] flex-none animate-pulse rounded-lg bg-[var(--ui-calendar-skeleton)]" />
			<div className="flex min-w-0 flex-1 flex-col gap-1.5">
				<div className="h-3 w-1/2 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
				<div className="h-2.5 w-1/3 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
			</div>
			<div className="flex flex-none flex-col items-end gap-1.5">
				<div className="h-2.5 w-8 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
				<div className="h-2.5 w-12 animate-pulse rounded bg-[var(--ui-calendar-skeleton)]" />
			</div>
		</div>
	);
}

function CalendarEventRow({ event, date, locale }: { event: CalendarEvent; date?: Date; locale?: string }) {
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
				'flex items-center gap-3.5 rounded-lg p-3',
				interactive &&
					'cursor-pointer hover:bg-[var(--ui-calendar-row-hover)] focus-visible:bg-[var(--ui-calendar-row-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-focus-ring)]'
			)}
			role={interactive ? 'button' : undefined}
			tabIndex={interactive ? 0 : undefined}
			onClick={event.onClick}
			onKeyDown={handleKeyDown}
		>
			{date && <CalendarDateBadge date={date} locale={locale} />}
			<div className="flex min-w-0 flex-1 flex-col gap-0.5">
				<Typography as="p" variant="body2" className="truncate font-semibold text-[var(--ui-calendar-text)]">
					{event.title}
				</Typography>
				{event.subtitle && (
					<Typography
						as="p"
						variant="description"
						className="flex items-center gap-1 text-[var(--ui-calendar-text-secondary)]"
					>
						{event.icon && (
							<span className="flex size-3.5 shrink-0 items-center justify-center [&>svg]:size-3.5" aria-hidden="true">
								{event.icon}
							</span>
						)}
						{event.subtitle}
					</Typography>
				)}
			</div>
			<div className="flex flex-none items-center gap-2.5">
				{event.time && (
					<Typography as="span" variant="description" className="font-semibold text-[var(--ui-calendar-text-secondary)]">
						{event.time}
					</Typography>
				)}
				{event.category && (
					<span className="flex items-center gap-1.5 text-[11px] font-semibold text-[var(--ui-calendar-text-secondary)]">
						<span className="size-1.5 flex-none rounded-full" style={{ backgroundColor: event.category.color }} />
						{event.category.label}
					</span>
				)}
			</div>
		</div>
	);
}

function CalendarGroupRow({ group, locale }: { group: CalendarDateGroup; locale?: string }) {
	const [expanded, setExpanded] = useState(Boolean(group.defaultExpanded));

	if (group.events.length <= 1) {
		return (
			<div className="border-t border-[var(--ui-calendar-row-border)] first:border-t-0">
				<CalendarEventRow event={group.events[0]} date={group.date} locale={locale} />
			</div>
		);
	}

	const [firstEvent, ...restEvents] = group.events;

	function toggle() {
		setExpanded((value) => !value);
	}

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			toggle();
		}
	}

	return (
		<div className="border-t border-[var(--ui-calendar-row-border)] first:border-t-0">
			<div
				className="flex cursor-pointer items-center gap-3.5 rounded-lg p-3 hover:bg-[var(--ui-calendar-row-hover)] focus-visible:bg-[var(--ui-calendar-row-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-focus-ring)]"
				role="button"
				tabIndex={0}
				aria-expanded={expanded}
				onClick={toggle}
				onKeyDown={handleKeyDown}
			>
				<CalendarDateBadge date={group.date} locale={locale} />
				<div className="flex min-w-0 flex-1 items-center gap-2">
					<Typography as="p" variant="body2" className="truncate font-semibold text-[var(--ui-calendar-text)]">
						{firstEvent.title}
					</Typography>
					<span className="flex-none rounded-full bg-[var(--ui-calendar-count-background)] px-1.5 py-0.5 text-[10px] font-semibold text-[var(--ui-calendar-count-text)]">
						+{restEvents.length}
					</span>
				</div>
				<ArrowDownIcon
					aria-hidden="true"
					className={cn(
						'size-4 flex-none text-[var(--ui-calendar-text-muted)] transition-transform duration-150',
						!expanded && '-rotate-90'
					)}
				/>
			</div>
			{expanded && (
				<div className="ml-[23px] border-l border-[var(--ui-calendar-row-border)] pl-8">
					{group.events.map((event) => (
						<div key={event.id} className="relative">
							<span className="absolute -left-8 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--ui-calendar-background)] ring-2 ring-[var(--ui-calendar-accent)]" />
							<CalendarEventRow event={event} locale={locale} />
						</div>
					))}
				</div>
			)}
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
				'rounded-xl border border-[var(--ui-calendar-border)] bg-[var(--ui-calendar-background)] p-[18px] font-[family-name:var(--ui-font-family)]',
				className
			)}
			aria-disabled={disabled || undefined}
		>
			{(eyebrow || action) && (
				<div className="mb-2.5 flex items-center justify-between gap-3">
					{eyebrow && (
						<Typography
							as="span"
							variant="description"
							className="uppercase tracking-wide text-[var(--ui-calendar-text-secondary)]"
						>
							{eyebrow}
						</Typography>
					)}
					{action}
				</div>
			)}

			<div className={cn(disabled && 'pointer-events-none opacity-50')}>
				{loading ? (
					<div className="flex flex-col gap-1">
						{Array.from({ length: loadingRowCount }).map((_, index) => (
							<CalendarSkeletonRow key={index} />
						))}
					</div>
				) : groups.length === 0 ? (
					<div className="px-1.5 py-7 text-center">
						<Typography as="p" variant="description" className="text-[var(--ui-calendar-text-muted)]">
							{emptyMessage}
						</Typography>
					</div>
				) : (
					groups.map((group) => <CalendarGroupRow key={group.id} group={group} locale={locale} />)
				)}
			</div>

			{disabled && disabledMessage && (
				<div className="mt-1 border-t border-[var(--ui-calendar-row-border)] px-1.5 pt-3">
					<Typography as="p" variant="description" className="text-[var(--ui-calendar-text-muted)]">
						{disabledMessage}
					</Typography>
				</div>
			)}
		</div>
	);
}
