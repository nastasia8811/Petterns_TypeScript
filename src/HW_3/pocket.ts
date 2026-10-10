import type { ICard } from './interface.js'
import { CurrencyEnum } from './enum.js'

export class Pocket {
  private cards: Map<string, ICard> = new Map()

  AddCard(name: string, card: ICard): void {
    this.cards.set(name, card)
  }

  RemoveCard(name: string): boolean {
    if (!this.cards.has(name)) return false
    return this.cards.delete(name)
  }

  GetCard(name: string): ICard | undefined {
    return this.cards.get(name)
  }

  GetTotalAmount(currency: CurrencyEnum): number {
    let total = 0
    this.cards.forEach(card => {
      total += card.GetBalance(currency)
    })
    return total
  }
}
