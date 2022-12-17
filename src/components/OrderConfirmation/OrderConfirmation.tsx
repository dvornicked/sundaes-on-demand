import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useOrderDetails } from '../contexts/OrderDetails'
import { OrderConfirmationProps } from './OrderConfirmation.interface'

function OrderConfirmation({ setOrderPhase }: OrderConfirmationProps) {
	const [, , resetOrder] = useOrderDetails()
	const [orderNumber, setOrderNumber] = useState(0)

	useEffect(() => {
		axios
			.post('http://localhost:3000/order')
			.then(response => {
				setOrderNumber(response.data.orderNumber)
			})
			.catch(() => {
				// TODO: handle error
			})
	}, [])

	function handleClick() {
		resetOrder()
		setOrderPhase('inProgress')
	}

	if (orderNumber) {
		return (
			<div>
				<h1>Thank you!</h1>
				<h2>Your order number is {orderNumber}</h2>
				<p>as per our terms and conditions, nothing will happen now</p>
				<Button onClick={handleClick}>Create new order</Button>
			</div>
		)
	}
	return <div>Loading...</div>
}

export default OrderConfirmation
