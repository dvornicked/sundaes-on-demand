import { HTMLAttributes } from 'react'
import { SetOrderPhaseType } from '../../App.interface'

export interface OrderConfirmationProps extends HTMLAttributes<HTMLDivElement> {
	setOrderPhase: SetOrderPhaseType
}
