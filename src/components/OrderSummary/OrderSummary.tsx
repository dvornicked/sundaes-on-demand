import { OrderSummaryProps } from './OrderSummary.interface'
import { useOrderDetails } from '../contexts/OrderDetails'
import SummaryForm from '../SummaryForm/SummaryForm'

function OrderSummary({ setOrderPhase }: OrderSummaryProps) {
	const [orderDetails] = useOrderDetails()
	return (
		<div>
			<h1>Order Summary</h1>
			<h2>Scoops: {orderDetails.totals.scoops}</h2>
			<ul>
				{Object.entries(orderDetails.scoops).map(([key, value]) => (
					<li key={key}>
						{key}: {value}
					</li>
				))}
			</ul>
			<h2>Toppings: {orderDetails.totals.toppings}</h2>
			<ul>
				{Object.entries(orderDetails.toppings).map(([key, value]) => (
					<li key={key}>
						{key}: {value}
					</li>
				))}
			</ul>
			<h2>Grand Total: {orderDetails.totals.grandTotal}</h2>
			<SummaryForm setOrderPhase={setOrderPhase} />
		</div>
	)
}

export default OrderSummary
