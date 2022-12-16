import { rest } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
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
