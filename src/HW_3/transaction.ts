import { v4 as uuidv4 } from 'uuid'
import { CurrencyEnum } from './enum.js'

export class Transaction {
  public readonly id: string = uuidv4()

  constructor(
    public readonly amount: number,
    public readonly currency: CurrencyEnum
  ) {}
}
