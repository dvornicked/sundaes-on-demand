import { rest } from 'msw'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../test-utils/testing-library-utils'
import server from '../../mocks/server'
import OrderEntry from './OrderEntry'

test('Displays AlertBanner component if axios call throws error', async () => {
	server.resetHandlers(
		rest.get('http://localhost:3000/scoops', (req, res, ctx) => {
			res(ctx.status(500))
		}),
		rest.get('http://localhost:3000/toppings', (req, res, ctx) => {
			res(ctx.status(500))
		}),
	)

	render(<OrderEntry />)
	await waitFor(async () => {
		const alerts = await screen.findAllByRole('alert')
		expect(alerts).toHaveLength(2)
	})
})

describe('grand total', () => {
	test('grand total starts out $0.00', async () => {
		render(<OrderEntry />)
		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
		expect(grandTotal).toHaveTextContent('0.00')
	})
	test('grand total updates properly if scoop is added first', async () => {
		render(<OrderEntry />)
		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla',
		})
		await userEvent.clear(vanillaInput)
		await userEvent.type(vanillaInput, '1')
		expect(grandTotal).toHaveTextContent('2.00')
	})
	test('grand total updates properly if topping is added first', async () => {
		render(<OrderEntry />)
		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		})
		await userEvent.click(cherriesCheckbox)
		expect(grandTotal).toHaveTextContent('1.50')
	})
	test('grand total updates properly if item is removed', async () => {
		render(<OrderEntry />)
		const grandTotal = screen.getByRole('heading', { name: /grand total: \$/i })
		const cherriesCheckbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		})
		await userEvent.click(cherriesCheckbox)
		expect(grandTotal).toHaveTextContent('1.50')
		await userEvent.click(cherriesCheckbox)
		expect(grandTotal).toHaveTextContent('0.00')
	})
})
