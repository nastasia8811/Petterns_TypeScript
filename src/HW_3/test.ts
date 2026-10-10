import { Card } from './card.js'
import { Transaction } from './transaction.js'
import { CurrencyEnum } from './enum.js'

const card = new Card()

const transactionUSD = new Transaction(100, CurrencyEnum.USD)
const transactionUAH = new Transaction(1000, CurrencyEnum.UAH)

const id1 = card.AddTransaction(CurrencyEnum.UAH, 50)
const id2 = card.AddTransaction(CurrencyEnum.USD, 90)
const id3 = card.AddTransaction(transactionUSD)
const id4 = card.AddTransaction(transactionUAH)

console.log('transactionUSD: ', transactionUSD)
console.log('transactionUAH: ', transactionUAH)
console.log('id1: ', card.GetTransaction(id1))
console.log('id2: ', card.GetTransaction(id2))
console.log('id3: ', card.GetTransaction(id3))
console.log('id3: ', card.GetTransaction(id4))
console.log('GetBalance USD: ', card.GetBalance(CurrencyEnum.USD))
console.log('GetBalance UAH: ', card.GetBalance(CurrencyEnum.UAH))

//npx tsx src/HW_3/test.ts
