import type { ICard } from './interface.js'
import { Card } from './card.js'
import { Transaction } from './transaction.js'
import { CurrencyEnum } from './enum.js'

export class BonusCard extends Card implements ICard {
  override AddTransaction(arg: Transaction | CurrencyEnum, arg2?: number): string {
    if (arg instanceof Transaction) {
      const id = super.AddTransaction(arg)
      super.AddTransaction(arg.currency, arg.amount * 0.1)
      return id
    }

    if (arg2 === undefined) {
      throw new Error('Amount is required')
    }

    const id = super.AddTransaction(arg, arg2)
    super.AddTransaction(arg, arg2 * 0.1)
    return id
  }
}
