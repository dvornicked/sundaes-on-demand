import { Col } from 'react-bootstrap'
import { ToppingOptionProps } from './ToppingOption.interface'

function ScoopOption({ name, imagePath }: ToppingOptionProps) {
	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3000/${imagePath}`}
				alt={`${name} topping`}
			/>
		</Col>
	)
}

export default ScoopOption
