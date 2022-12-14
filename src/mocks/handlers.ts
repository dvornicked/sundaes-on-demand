// eslint-disable-next-line import/no-extraneous-dependencies
import { rest } from 'msw'

export default [
	rest.get('http://localhost:3000/scoops', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Chocolate', imagePath: '/images/chocolate.png' },
				{ name: 'Vanilla', imagePath: '/images/vanilla.png' },
			]),
		)
	}),
	rest.get('http://localhost:3000/toppings', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Cherries', imagePath: '/images/cherries.png' },
				{ name: 'M&Ms', imagePath: '/images/m-and-ms.png' },
				{ name: 'Hot fudge', imagePath: '/images/hot-fudge.png' },
			]),
		)
	}),
	rest.post('http://localhost:3000/order', (req, res, ctx) => {
		return res(ctx.json({ orderNumber: 123456789 }))
	}),
]
