import { Container } from 'react-bootstrap'
import { useState } from 'react'
import OrderEntry from './components/OrderEntry/OrderEntry'
import { OrderDetailsProvider } from './components/contexts/OrderDetails'
import { OrderPhaseType } from './App.interface'
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'
import OrderSummary from './components/OrderSummary/OrderSummary'

function App() {
	const [orderPhase, setOrderPhase] = useState<OrderPhaseType>('inProgress')
	let Component = OrderEntry
	switch (orderPhase) {
		case 'inProgress':
			Component = OrderEntry
			break
		case 'review':
			Component = OrderSummary
			break
		case 'completed':
			Component = OrderConfirmation
			break
		default:
	}
	return (
		<Container>
			<OrderDetailsProvider>
				<Component setOrderPhase={setOrderPhase} />
			</OrderDetailsProvider>
		</Container>
	)
}

export default App
