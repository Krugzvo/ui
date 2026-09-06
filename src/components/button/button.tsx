import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '../../lib/cn';

import { Typography } from '../typography';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> & {
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
	'box-border inline-flex h-[50px] items-center justify-center gap-2 rounded-lg border border-transparent px-4 font-[family-name:var(--ui-font-family)] transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ui-focus-ring)] disabled:cursor-not-allowed enabled:cursor-pointer';

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		'bg-[var(--ui-button-primary-background)] text-[var(--ui-button-primary-text)] enabled:hover:bg-[var(--ui-button-primary-background-hover)] enabled:active:bg-[var(--ui-button-primary-background-active)] disabled:bg-[var(--ui-button-primary-background-disabled)] disabled:text-[var(--ui-button-primary-text-disabled)]',
	secondary:
		'bg-[var(--ui-button-secondary-background)] border-[var(--ui-button-secondary-border)] text-[var(--ui-button-secondary-text)] enabled:hover:bg-[var(--ui-button-secondary-background-hover)] enabled:hover:border-[var(--ui-button-secondary-border-hover)] enabled:active:bg-[var(--ui-button-secondary-background-active)] enabled:active:border-[var(--ui-button-secondary-border-active)] disabled:border-[var(--ui-button-secondary-border-disabled)] disabled:text-[var(--ui-button-secondary-text-disabled)]',
	ghost:
		'bg-[var(--ui-button-ghost-background)] text-[var(--ui-button-ghost-text)] enabled:hover:bg-[var(--ui-button-ghost-background-hover)] enabled:active:bg-[var(--ui-button-ghost-background-active)] disabled:text-[var(--ui-button-ghost-text-disabled)] disabled:opacity-20',
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
			{!iconOnly && <Typography as="span">{children}</Typography>}
			{icon && (
				<span className="block size-4 shrink-0 [&>svg]:block [&>svg]:size-4" aria-hidden="true">
					{icon}
				</span>
			)}
		</button>
	);
}
