import { CurrencyEnum } from './enum.js'
import { Transaction } from './transaction.js'

export interface ICard {
  AddTransaction(transaction: Transaction): string

  AddTransaction(currency: CurrencyEnum, amount: number): string

  AddTransaction(arg: Transaction | CurrencyEnum, arg2?: number): string

  GetTransaction(id: string): Transaction | undefined

  GetBalance(currency: CurrencyEnum): number
}
