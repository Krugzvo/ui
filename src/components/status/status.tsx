'use client';

import { cn } from '../../lib/cn';
import React, { PropsWithChildren } from 'react';

export type StatusVariant = 'base' | 'success' | 'warning' | 'error';

export interface StatusProps {
	variant: StatusVariant;
}

const variantClasses: Record<StatusVariant, string> = {
	base: 'bg-[var(--ui-status-indicator-base)]',
	success: 'bg-[var(--ui-status-indicator-success)]',
	warning: 'bg-[var(--ui-status-indicator-warning)]',
	error: 'bg-[var(--ui-status-indicator-error)]',
};

const baseClasses = 'w-[8px] h-[8px] rounded-lg';

export const Status: React.FC<PropsWithChildren<StatusProps>> = ({
	variant,
	children,
}) => {
	return (
		<div className="flex gap-x-1.5 items-center">
			<circle className={cn(baseClasses, variantClasses[variant])} />
			{children}
		</div>
	);
};
