import CoinMarketCap from 'coinmarketcap-api'

import { Tokens } from './constants'

export class Collector {
  _tokenSymbol: string
  client: CoinMarketCap

  constructor(tokenSymbol: Tokens, apiKey: string) {
    this._tokenSymbol = tokenSymbol
    this.client = new CoinMarketCap(apiKey)
  }

  async collect(): Promise<CoinMarketCap.quote> {
    console.log('collecting:', this._tokenSymbol)
    const quote = await this.client.getQuotes({ symbol: this._tokenSymbol })
    console.log(quote)
    
    return quote
  }
}