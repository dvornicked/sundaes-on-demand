import { HTMLAttributes } from 'react'
import { UpdateItemCountType } from '../contexts/OrderDetails.interface'

export interface IToppingOption {
	name: string
	imagePath: string
}

export interface ToppingOptionProps
	extends HTMLAttributes<HTMLDivElement>,
		IToppingOption {
	updateItemCount: UpdateItemCountType
}
