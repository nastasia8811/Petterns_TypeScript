import { Card } from './card.js'
import { Transaction } from './transaction.js'
import { CurrencyEnum } from './enum.js'
import { BonusCard } from './bonusCard.js'
import { Pocket } from './pocket.js'

const card = new Card()
const pocket = new Pocket()
const bonusCard = new BonusCard()

const transactionUSD = new Transaction(100, CurrencyEnum.USD)
const transactionUAH = new Transaction(1000, CurrencyEnum.UAH)

const id1 = card.AddTransaction(CurrencyEnum.UAH, 50)
const id2 = card.AddTransaction(CurrencyEnum.USD, 90)
const id3 = card.AddTransaction(transactionUSD)
const id4 = card.AddTransaction(transactionUAH)

console.log('card transactionUSD: ', transactionUSD)
console.log('card transactionUAH: ', transactionUAH)
console.log('card id1: ', card.GetTransaction(id1))
console.log('card id2: ', card.GetTransaction(id2))
console.log('card id3: ', card.GetTransaction(id3))
console.log('card id3: ', card.GetTransaction(id4))
console.log('card GetBalance USD: ', card.GetBalance(CurrencyEnum.USD))
console.log('card GetBalance UAH: ', card.GetBalance(CurrencyEnum.UAH))

console.log('bonusCard GetBalance USD: ', bonusCard.GetBalance(CurrencyEnum.USD))
console.log(
  'bonusCard AddTransaction: ',
  bonusCard.AddTransaction(new Transaction(50, CurrencyEnum.USD))
)
console.log('bonusCard AddTransaction: ', bonusCard.AddTransaction(CurrencyEnum.USD, 100))
console.log(bonusCard.GetBalance(CurrencyEnum.USD))

console.log('pocket AddCard: ', pocket.AddCard('name1', card))
console.log('pocket AddCard: ', pocket.AddCard('bonus', bonusCard))
console.log('pocket RemoveCard: ', pocket.RemoveCard('name1'))
console.log('pocket GetCard: ', pocket.GetCard('name1'))
console.log('pocket GetTotalAmount USD: ', pocket.GetTotalAmount(CurrencyEnum.USD))
console.log('pocket GetTotalAmount UAH: ', pocket.GetTotalAmount(CurrencyEnum.UAH))
//npx tsx src/HW_3/test.ts
