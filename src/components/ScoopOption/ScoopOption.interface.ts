import { HTMLAttributes } from 'react'

export interface IScoopOption {
	name: string
	imagePath: string
}

export interface ScoopOptionProps
	extends HTMLAttributes<HTMLDivElement>,
		IScoopOption {}
