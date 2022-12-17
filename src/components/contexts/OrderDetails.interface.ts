import { ReactNode } from 'react'
import { OptionType } from '../Options/Options.interface'

export type OrderDetailsType = [OptionTotalCountsType, UpdateItemCountType]

export type OptionCountsType = {
	scoops: Map<string, number>
	toppings: Map<string, number>
}

interface OptionTotalCountsType extends OptionCountsType {
	totals: TotalsType
}

export type TotalsType = {
	scoops: string
	toppings: string
	grandTotal: string
}

export type UpdateItemCountType = (
	itemName: string,
	newItemCount: string,
	optionType: OptionType,
) => void

export interface OrderDetailsProviderProps {
	children: ReactNode
}
