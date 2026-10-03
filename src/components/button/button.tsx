import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/cn';

import { Typography } from '../typography';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

type ButtonBaseProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	'aria-label'
> & {
	icon?: ReactNode;
	size?: ButtonSize;
	variant?: ButtonVariant;
};

type ButtonWithContentProps = ButtonBaseProps & {
	'aria-label'?: string;
	iconOnly?: false;
};

type IconOnlyButtonProps = ButtonBaseProps & {
	'aria-label': string;
	children?: never;
	icon: ReactNode;
	iconOnly: true;
};

export type ButtonProps = ButtonWithContentProps | IconOnlyButtonProps;

const baseClasses =
	'box-border inline-flex h-[50px] items-center justify-center gap-2 rounded-lg border border-transparent px-4 font-[family-name:var(--ui-font-family)] transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-color-focus-ring)] disabled:cursor-not-allowed enabled:cursor-pointer';

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'bg-[var(--ui-color-primary)] text-[var(--ui-color-primary-foreground)] enabled:hover:bg-[var(--ui-color-primary-hover)] enabled:active:bg-[var(--ui-color-primary-pressed)] disabled:bg-[var(--ui-color-primary-disabled)] disabled:text-[var(--ui-color-text-muted)]',
	secondary:
		'bg-transparent border-[var(--ui-color-border)] text-[var(--ui-color-text-primary)] enabled:hover:bg-[var(--ui-color-surface-accent)] enabled:hover:border-[var(--ui-color-border-strong)] enabled:active:bg-[var(--ui-color-surface-accent)] enabled:active:border-[var(--ui-color-primary-pressed)] disabled:border-[var(--ui-color-border)] disabled:text-[var(--ui-color-text-muted)]',
	ghost:
		'bg-transparent text-[var(--ui-color-text-primary)] enabled:hover:bg-[var(--ui-color-surface-accent)] enabled:active:bg-[var(--ui-color-surface-accent)] disabled:text-[var(--ui-color-text-muted)] disabled:opacity-20',
};

const sizeClasses: Record<ButtonSize, string> = {
	md: 'w-[200px]',
	sm: 'w-[100px]',
};

export function Button({
	children,
	className,
	icon,
	iconOnly = false,
	size = 'md',
	type = 'button',
	variant = 'primary',
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(
				baseClasses,
				variantClasses[variant],
				sizeClasses[size],
				iconOnly && 'w-[50px] px-0',
				className
			)}
			{...props}
		>
			{!iconOnly && (
				<Typography as="span" className="text-inherit">
					{children}
				</Typography>
			)}
			{icon && (
				<span
					className="block size-4 shrink-0 [&>svg]:block [&>svg]:size-4"
					aria-hidden="true"
				>
					{icon}
				</span>
			)}
		</button>
	);
}
