import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

test('order phases for golden path', async () => {
	// render App
	render(<App />)

	// add ice cream scoops and toppings
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	})
	await userEvent.clear(vanillaInput)
	await userEvent.type(vanillaInput, '1')

	const cherriesCheckbox = await screen.findByRole('checkbox', {
		name: 'Cherries',
	})
	await userEvent.click(cherriesCheckbox)

	// find and click order button
	const orderSummaryButton = screen.getByRole('button', {
		name: /order sundae/i,
	})
	await userEvent.click(orderSummaryButton)

	// check summary information based on order
	const scoopsHeading = screen.getByRole('heading', {
		name: /scoops: \$/i,
	})
	expect(scoopsHeading).toHaveTextContent('2.00')

	const toppingsHeading = screen.getByRole('heading', {
		name: /toppings: \$/i,
	})
	expect(toppingsHeading).toHaveTextContent('1.50')

	// accept terms and conditions and click button to confirm order
	const tcCheckbox = screen.getByRole('checkbox', {
		name: /terms and conditions/i,
	})
	await userEvent.click(tcCheckbox)

	const confirmOrderButton = screen.getByRole('button', {
		name: /confirm order/i,
	})
	await userEvent.click(confirmOrderButton)

	// confirm order number on confirmation page
	const thankYouHeader = await screen.findByRole('heading', {
		name: /thank you/i,
	})
	expect(thankYouHeader).toBeInTheDocument()

	const orderNumber = await screen.findByText(/order number/i)
	expect(orderNumber).toBeInTheDocument()

	// click "new order" button on confirmation page
	const newOrderButton = screen.getByRole('button', {
		name: /new order/i,
	})
	await userEvent.click(newOrderButton)

	// check that scoops and toppings subtotals have been reset
	const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
	expect(scoopsSubtotal).toBeInTheDocument()

	const toppingsSubtotal = screen.getByText('Toppings total: $0.00')
	expect(toppingsSubtotal).toBeInTheDocument()

	await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	})
	await screen.findByRole('checkbox', {
		name: 'Cherries',
	})
})
