import { Transaction } from './transaction.js'
import { CurrencyEnum } from './enum.js'
import type { ICard } from './interface.js'

export class Card implements ICard {
  private transactions: Transaction[] = []

  AddTransaction(arg: Transaction | CurrencyEnum, arg2?: number): string {
    if (arg instanceof Transaction) {
      this.transactions.push(arg)
      return arg.id
    }
    if (arg2 === undefined) {
      throw new Error('Amount is required')
    }

    const transaction = new Transaction(arg2, arg)
    this.transactions.push(transaction)
    return transaction.id
  }

  GetTransaction(id: string) {
    return this.transactions.find(transaction => transaction.id === id)
  }

  GetBalance(currency: CurrencyEnum): number {
    return this.transactions
      .filter(transaction => transaction.currency === currency)
      .reduce((acc, transaction) => acc + transaction.amount, 0)
  }
}
