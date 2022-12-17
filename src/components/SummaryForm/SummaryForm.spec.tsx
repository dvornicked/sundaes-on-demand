import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import SummaryForm from './SummaryForm'

test('Initial conditions', () => {
	render(<SummaryForm setOrderPhase={vi.fn()} />)

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	})
	expect(checkbox).not.toBeChecked()

	const confirmButton = screen.getByRole('button', {
		name: /confirm order/i,
	})
	expect(confirmButton).toBeDisabled()
})

test('Checkbox enables button on first click and disables on second click', async () => {
	render(<SummaryForm setOrderPhase={vi.fn()} />)

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	})
	const confirmButton = screen.getByRole('button', {
		name: /confirm order/i,
	})

	// checkbox starts out unchecked, so confirm button should be disabled
	expect(confirmButton).toBeDisabled()

	// click the checkbox, confirm button should be enabled
	await userEvent.click(checkbox)
	expect(confirmButton).toBeEnabled()

	// click the checkbox again, confirm button should be disabled
	await userEvent.click(checkbox)
	expect(confirmButton).toBeDisabled()
})

test('popover responds to hover', async () => {
	render(<SummaryForm setOrderPhase={vi.fn()} />)

	// popover starts out hidden
	const nullPopover = screen.queryByText(
		/no ice cream will actually be delivered/i,
	)
	expect(nullPopover).not.toBeInTheDocument()

	// popover appears upon mouseover of checkbox label
	const termsAndConditions = screen.getByText(/terms and conditions/i)
	await userEvent.hover(termsAndConditions)
	const popover = screen.getByText(/no ice cream will actually be delivered/i)
	expect(popover).toBeInTheDocument()

	// popover disappears when we mouse out
	await userEvent.unhover(termsAndConditions)
	expect(nullPopover).not.toBeInTheDocument()
})
