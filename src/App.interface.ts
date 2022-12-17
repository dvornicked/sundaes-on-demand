export type OrderPhaseType = 'inProgress' | 'review' | 'completed'

export type SetOrderPhaseType = (newPhase: OrderPhaseType) => void
