import { HTMLAttributes } from 'react'
import { SetOrderPhaseType } from '../../App.interface'

export interface SummaryFormProps extends HTMLAttributes<HTMLDivElement> {
	setOrderPhase: SetOrderPhaseType
}
