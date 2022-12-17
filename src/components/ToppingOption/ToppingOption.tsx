import { Col, Form } from 'react-bootstrap'
import { ToppingOptionProps } from './ToppingOption.interface'

function ScoopOption({ name, imagePath, updateItemCount }: ToppingOptionProps) {
	return (
		<Col
			xs={12}
			sm={6}
			md={4}
			lg={2}
			style={{
				textAlign: 'center',
			}}>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3000/${imagePath}`}
				alt={`${name} topping`}
			/>
			<Form.Group controlId={`${name}-topping-checkbox`}>
				<Form.Check
					type="checkbox"
					label={name}
					onChange={e => updateItemCount(name, e.target.checked ? '1' : '0')}
				/>
			</Form.Group>
		</Col>
	)
}

export default ScoopOption
