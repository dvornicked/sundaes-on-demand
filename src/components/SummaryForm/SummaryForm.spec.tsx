import { fireEvent, render, screen } from '@testing-library/react'
import SummaryForm from './SummaryForm'

test('Initial conditions', () => {
	render(<SummaryForm />)

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	})
	expect(checkbox).not.toBeChecked()

	const confirmButton = screen.getByRole('button', {
		name: /confirm order/i,
	})
	expect(confirmButton).toBeDisabled()
})

test('Checkbox enables button on first click and disables on second click', () => {
	render(<SummaryForm />)

	const checkbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	})
	const confirmButton = screen.getByRole('button', {
		name: /confirm order/i,
	})

	// checkbox starts out unchecked, so confirm button should be disabled
	expect(confirmButton).toBeDisabled()

	// click the checkbox, confirm button should be enabled
	fireEvent.click(checkbox)
	expect(confirmButton).toBeEnabled()

	// click the checkbox again, confirm button should be disabled
	fireEvent.click(checkbox)
	expect(confirmButton).toBeDisabled()
})
