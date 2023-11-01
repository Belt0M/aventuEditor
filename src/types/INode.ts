import { IDecision } from './IDecision'
import { INarrative } from './INarrative'

export interface INode {
	id: string
	positionX: number
	positionY: number
	type: string
	data?: IDecision | INarrative
}
