import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '../../lib/cn';

export type TypographyVariant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body1'
	| 'body2'
	| 'description';

type TypographyOwnProps<T extends ElementType> = {
	as?: T;
	children?: ReactNode;
	className?: string;
	variant?: TypographyVariant;
};

export type TypographyProps<T extends ElementType = 'p'> = TypographyOwnProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

const defaultElements: Record<TypographyVariant, ElementType> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	body1: 'p',
	body2: 'p',
	description: 'p',
};

const variantClasses: Record<TypographyVariant, string> = {
	h1: 'text-[48px]/[58px] font-semibold',
	h2: 'text-[40px]/[48px] font-semibold',
	h3: 'text-[33px]/[40px] font-semibold',
	h4: 'text-[28px]/[34px] font-semibold',
	h5: 'text-[23px]/[28px] font-semibold',
	h6: 'text-[19px]/[24px] font-semibold',
	body1: 'text-base/6 font-normal',
	body2: 'text-[13px]/[20px] font-normal',
	description: 'text-[11px]/[16px] font-normal',
};

export function Typography<T extends ElementType = 'p'>({
	as,
	children,
	className,
	variant = 'body1',
	...props
}: TypographyProps<T>) {
	const Component = as ?? defaultElements[variant];

	return (
		<Component
			className={cn('m-0 font-[family-name:var(--ui-font-family)]', variantClasses[variant], className)}
			{...props}
		>
			{children}
		</Component>
	);
}
