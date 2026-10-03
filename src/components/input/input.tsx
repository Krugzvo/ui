'use client';

import {
	forwardRef,
	useImperativeHandle,
	useRef,
	type InputHTMLAttributes,
	type ReactNode,
} from 'react';

import { CrossIcon } from '../../icons';
import { cn } from '../../lib/cn';

export type InputStatus = 'default' | 'error' | 'success';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
	clearable?: boolean;
	clearLabel?: string;
	leftIcon?: ReactNode;
	onClear?: () => void;
	status?: InputStatus;
};

const statusClasses: Record<InputStatus, string> = {
	default:
		'border-[var(--ui-color-border)] text-[var(--ui-color-text-primary)] hover:border-[var(--ui-color-border-strong)] focus-within:border-[var(--ui-color-focus-ring)]',
	error: 'border-[var(--ui-color-error)] text-[var(--ui-color-error)]',
	success: 'border-[var(--ui-color-success)] text-[var(--ui-color-success)]',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{
		className,
		clearable = false,
		clearLabel = 'Clear input',
		disabled,
		leftIcon,
		onClear,
		status = 'default',
		...props
	},
	forwardedRef
) {
	const inputRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

	return (
		<div
			className={cn(
				'box-border flex h-[50px] w-[300px] items-center gap-2.5 rounded-lg border bg-[var(--ui-color-surface-raised)] px-3 font-[family-name:var(--ui-input-font-family)] transition-colors duration-150',
				statusClasses[status],
				disabled &&
					'cursor-not-allowed border-[var(--ui-color-primary-disabled)] bg-[var(--ui-color-surface)] text-[var(--ui-color-text-muted)] hover:border-[var(--ui-color-primary-disabled)]',
				className
			)}>
			{leftIcon && (
				<span className="flex size-4 shrink-0 items-center justify-center">
					{leftIcon}
				</span>
			)}
			<input
				ref={inputRef}
				disabled={disabled}
				aria-invalid={status === 'error' || undefined}
				className="min-w-0 flex-1 bg-transparent text-base leading-[19px] text-inherit outline-none placeholder:text-[var(--ui-color-text-muted)] disabled:cursor-not-allowed"
				{...props}
			/>
			{clearable && (
				<button
					type="button"
					aria-label={clearLabel}
					disabled={disabled}
					onClick={() => {
						onClear?.();
						inputRef.current?.focus();
					}}
					className="flex size-4 shrink-0 items-center justify-center text-current disabled:cursor-not-allowed">
					<CrossIcon />
				</button>
			)}
		</div>
	);
});
