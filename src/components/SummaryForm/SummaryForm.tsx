import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'

function SummaryForm() {
	const [checked, setChecked] = useState(false)
	return (
		<Form>
			<Form.Group controlId="terms-and-conditions">
				<Form.Check
					type="checkbox"
					label="I agree to Terms and Conditions"
					checked={checked}
					onChange={e => setChecked(e.target.checked)}
				/>
			</Form.Group>
			<Button variant="primary" type="submit" disabled={!checked}>
				Confirm order
			</Button>
		</Form>
	)
}

export default SummaryForm
