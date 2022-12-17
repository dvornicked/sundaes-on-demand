import Options from '../Options/Options'
import { useOrderDetails } from '../contexts/OrderDetails'

function OrderEntry() {
	const [orderDetails] = useOrderDetails()
	return (
		<div>
			<h1>Design your sundae!</h1>
			<Options optionType="scoops" />
			<Options optionType="toppings" />
			<h2>Grand total: {orderDetails.totals.grandTotal}</h2>
		</div>
	)
}

export default OrderEntry
