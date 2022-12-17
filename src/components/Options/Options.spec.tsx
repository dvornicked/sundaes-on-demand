import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils/testing-library-utils'
import Options from './Options'
import { OrderDetailsProvider } from '../contexts/OrderDetails'

test('Displays image for each scoop option from server', async () => {
	render(<Options optionType="scoops" />)

	// find images
	const scoopImages = await screen.findAllByRole<HTMLImageElement>('img', {
		name: /scoop$/i,
	})
	expect(scoopImages).toHaveLength(2)

	// confirm alt text of images
	const altText = scoopImages.map(element => element.alt)
	expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('Displays image for each topping option from server', async () => {
	render(<Options optionType="toppings" />)

	// find images, expect 3 based on the data
	const toppingImages = await screen.findAllByRole<HTMLImageElement>('img', {
		name: /topping$/i,
	})
	expect(toppingImages).toHaveLength(3)

	// confirm alt text of images
	const altText = toppingImages.map(element => element.alt)
	expect(altText).toEqual([
		'Cherries topping',
		'M&Ms topping',
		'Hot fudge topping',
	])
})

test('Update scoop subtotal when scoops change', async () => {
	render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider })

	// make sure total starts out $0.00
	const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
	expect(scoopsSubtotal).toHaveTextContent('0.00')

	// update vanilla scoops to 1 and check the subtotal
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	})
	expect(vanillaInput).toBeInTheDocument()
	await userEvent.clear(vanillaInput)
	await userEvent.type(vanillaInput, '1')
	expect(scoopsSubtotal).toHaveTextContent('2.00')

	// update chocolate scoops to 2 and check the subtotal
	const chocolateInput = await screen.findByRole('spinbutton', {
		name: 'Chocolate',
	})
	expect(chocolateInput).toBeInTheDocument()
	await userEvent.clear(chocolateInput)
	await userEvent.type(chocolateInput, '2')
	expect(scoopsSubtotal).toHaveTextContent('6.00')
})
