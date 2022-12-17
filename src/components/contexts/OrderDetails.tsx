import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { OptionType } from '../Options/Options.interface'
import { pricePerItem } from '../constants'
import {
	OptionCountsType,
	OrderDetailsProviderProps,
	OrderDetailsType,
	TotalsType,
	UpdateItemCountType,
} from './OrderDetails.interface'
import { formatCurrency } from '../../utilities'

const OrderDetails = createContext<OrderDetailsType | null>(null)

export function useOrderDetails() {
	const context = useContext(OrderDetails)
	if (!context) {
		throw new Error(
			'useOrderDetails must be used within an OrderDetailsProvider',
		)
	}
	return context
}

function calculateSubtotal(
	optionType: OptionType,
	optionCounts: OptionCountsType,
) {
	let optionCount = 0
	// eslint-disable-next-line no-restricted-syntax
	for (const count of optionCounts[optionType].values()) {
		optionCount += count
	}

	return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider({ children }: OrderDetailsProviderProps) {
	const [optionCounts, setOptionCounts] = useState<OptionCountsType>({
		scoops: new Map(),
		toppings: new Map(),
	})
	const zeroCurrency = formatCurrency(0)
	const [totals, setTotals] = useState<TotalsType>({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	})

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal('scoops', optionCounts)
		const toppingsSubtotal = calculateSubtotal('toppings', optionCounts)
		const grandTotal = scoopsSubtotal + toppingsSubtotal

		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal: formatCurrency(grandTotal),
		})
	}, [optionCounts])

	const value = useMemo(() => {
		const updateItemCount: UpdateItemCountType = (
			itemName: string,
			newItemCount: string,
			optionType: OptionType,
		) => {
			const newOptionCounts = { ...optionCounts }

			// update option count for this item with the new value
			const optionCountsMap = optionCounts[optionType]
			optionCountsMap.set(itemName, parseInt(newItemCount, 10))

			setOptionCounts(newOptionCounts)
		}

		function resetOrder() {
			setOptionCounts({
				scoops: new Map(),
				toppings: new Map(),
			})
		}

		// getter: object containing options counts for scoops and toppings, subtotals and totals
		// setter: updateOptionCount
		return [
			{
				...optionCounts,
				totals,
			},
			updateItemCount,
			resetOrder,
		] as OrderDetailsType
	}, [optionCounts, totals])

	return <OrderDetails.Provider value={value}>{children}</OrderDetails.Provider>
}
