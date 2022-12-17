import { Container } from 'react-bootstrap'
import OrderEntry from './components/OrderEntry/OrderEntry'
import { OrderDetailsProvider } from './components/contexts/OrderDetails'

function App() {
	return (
		<Container>
			<OrderDetailsProvider>
				<OrderEntry />
			</OrderDetailsProvider>
		</Container>
	)
}

export default App
