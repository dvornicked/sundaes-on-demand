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
]
