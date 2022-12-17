import userEvent from '@testing-library/user-event'
import { render, screen } from '../../test-utils/testing-library-utils'
import Options from './Options'

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
	render(<Options optionType="scoops" />)

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

test('Update toppings subtotal when toppings change', async () => {
	render(<Options optionType="toppings" />)
	// make sure total starts out $0.00
	const toppingsSubtotal = screen.getByText('Toppings total: $', {
		exact: false,
	})
	expect(toppingsSubtotal).toHaveTextContent('0.00')
	// add cherries and check the subtotal
	const cherriesCheckbox = await screen.findByRole('checkbox', {
		name: 'Cherries',
	})
	expect(cherriesCheckbox).toBeInTheDocument()
	await userEvent.click(cherriesCheckbox)
	expect(toppingsSubtotal).toHaveTextContent('1.50')
	// add hot fudge and check the subtotal
	const hotFudgeCheckbox = await screen.findByRole('checkbox', {
		name: 'Hot fudge',
	})
	expect(hotFudgeCheckbox).toBeInTheDocument()
	await userEvent.click(hotFudgeCheckbox)
	expect(toppingsSubtotal).toHaveTextContent('3.00')
	// remove cherries and check the subtotal
	await userEvent.click(cherriesCheckbox)
	expect(toppingsSubtotal).toHaveTextContent('1.50')
})
