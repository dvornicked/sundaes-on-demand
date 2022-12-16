import { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import axios from 'axios'
import ScoopOption from '../ScoopOption/ScoopOption'
import { IScoopOption } from '../ScoopOption/ScoopOption.interface'
import { OptionsProps } from './Options.interface'
import ToppingOption from '../ToppingOption/ToppingOption'
import AlertBanner from '../AlertBanner/AlertBanner'

function Options({ optionType }: OptionsProps) {
	const [items, setItems] = useState<IScoopOption[]>([])
	const [error, setError] = useState(false)

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
	const optionItems = items.map(item => (
		<ItemComponent
			key={item.name}
			name={item.name}
			imagePath={item.imagePath}
		/>
	))

	return <Row>{optionItems}</Row>
}

export default Options
