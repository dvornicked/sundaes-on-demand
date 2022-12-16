import { HTMLAttributes } from 'react'

export type OptionType = 'scoops' | 'toppings'

export interface OptionsProps extends HTMLAttributes<HTMLDivElement> {
	optionType: OptionType
}
