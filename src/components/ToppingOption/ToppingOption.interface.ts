import { HTMLAttributes } from 'react'

export interface IToppingOption {
	name: string
	imagePath: string
}

export interface ToppingOptionProps
	extends HTMLAttributes<HTMLDivElement>,
		IToppingOption {}
