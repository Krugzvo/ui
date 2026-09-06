import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { CrossIcon } from '../icons';

import { Button } from './button';
import { Typography } from './typography';

describe('Typography', () => {
	it('uses the semantic element associated with the variant', () => {
		const markup = renderToStaticMarkup(<Typography variant="h2">Heading</Typography>);

		expect(markup).toMatch(/^<h2/);
		expect(markup).toContain('text-[40px]/[48px]');
	});

	it('allows overriding the rendered element', () => {
		const markup = renderToStaticMarkup(
			<Typography variant="body1" as="span">
				Body
			</Typography>
		);

		expect(markup).toMatch(/^<span/);
	});
});

describe('Button', () => {
	it('defaults to a native button with primary md styling', () => {
		const markup = renderToStaticMarkup(<Button>Button</Button>);

		expect(markup).toContain('type="button"');
		expect(markup).toContain('w-[200px]');
		expect(markup).toContain('--ui-button-primary-background');
	});

	it('renders an accessible icon-only button', () => {
		const markup = renderToStaticMarkup(
			<Button iconOnly icon={<CrossIcon />} aria-label="Close" size="sm" />
		);

		expect(markup).toContain('aria-label="Close"');
		expect(markup).toContain('w-[50px]');
		expect(markup).not.toContain('<p>');
	});

	it('forwards disabled state to the native element', () => {
		const markup = renderToStaticMarkup(<Button disabled>Button</Button>);

		expect(markup).toContain('disabled=""');
	});
});
