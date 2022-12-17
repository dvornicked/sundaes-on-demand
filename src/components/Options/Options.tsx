import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import axios from 'axios'
import ScoopOption from '../ScoopOption/ScoopOption'
import { IScoopOption } from '../ScoopOption/ScoopOption.interface'
import { OptionsProps } from './Options.interface'
import ToppingOption from '../ToppingOption/ToppingOption'
import AlertBanner from '../AlertBanner/AlertBanner'
import { pricePerItem } from '../constants'
import { useOrderDetails } from '../contexts/OrderDetails'
import { formatCurrency } from '../../utilities'

function Options({ optionType }: OptionsProps) {
	const [items, setItems] = useState<IScoopOption[]>([])
	const [error, setError] = useState(false)
	const [orderDetails, setOrderDetails] = useOrderDetails()

	useEffect(() => {
		axios
			.get(`http://localhost:3000/${optionType}`)
			.then(({ data }) => setItems(data))
			.catch(() => setError(true))
	}, [optionType])

	if (error) {
		return <AlertBanner />
	}

	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption
	const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase()

	const optionItems = items.map(item => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
			updateItemCount={(itemName, newItemCount) =>
				setOrderDetails(itemName, newItemCount, optionType)
			}
		/>
	))

	return (
		<>
			<h2>{title}</h2>
			<p>{formatCurrency(pricePerItem[optionType])} each</p>
			<p>
				{title} total: {orderDetails.totals[optionType]}
			</p>
			<Row>{optionItems}</Row>
		</>
	)
}

export default Options
