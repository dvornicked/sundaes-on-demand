import { Button, Form, OverlayTrigger, Popover } from 'react-bootstrap'
import { useState } from 'react'
import { SummaryFormProps } from './SummaryForm.interface'

function SummaryForm({ setOrderPhase }: SummaryFormProps) {
	const [checked, setChecked] = useState(false)

	const popover = (
		<Popover id="terms-and-conditions-popover">
			<Popover.Body>No ice cream will actually be delivered</Popover.Body>
		</Popover>
	)
	const checkboxLabel = (
		<span>
			I agree to{' '}
			<OverlayTrigger placement="right" overlay={popover}>
				<span style={{ color: 'blue' }}>Terms and Conditions</span>
			</OverlayTrigger>
		</span>
	)

	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					label={checkboxLabel}
					checked={checked}
					onChange={e => setChecked(e.target.checked)}
				/>
			</Form.Group>
			<Button
				variant="primary"
				type="submit"
				disabled={!checked}
				onClick={() => setOrderPhase('completed')}>
				Confirm order
			</Button>
		</Form>
	)
}

export default SummaryForm
