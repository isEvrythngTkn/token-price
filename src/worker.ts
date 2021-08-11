import { DynamoDBClient, PutItemCommand, AttributeValue } from '@aws-sdk/client-dynamodb'

import { config } from './config'
import { Queue } from './queue'
import { Collector } from './collector'
import { Tokens } from './constants'
import TokenPrice from './tokenPrice'

const main = async () => {
  // look for job message(s)
  const queue = new Queue(config.collectionQueue.url, config.collectionQueue.region)
  await queue.init()
  const messages = await queue.getMessages()
  console.log('paul >>> messages', messages)

  const coinsToCollect: string[] = messages 
    ? messages.map(message => message.Body ?? '')
    : []

  for (const coin of coinsToCollect) {
    const collector = new Collector(coin as Tokens, config.coinMarketCap.apiKey)
    const quote = await collector.collect()
    
    const doc: TokenPrice = {
      symbol: coin as Tokens,
      price: quote.data[coin].quote.USD.price,
      timestamp: new Date(quote.data[coin].quote.USD.last_updated).getTime()
    }

    console.log(doc)

    const client = new DynamoDBClient({ region: config.db.region })
    try {
      const command = new PutItemCommand({
        TableName: 'TokenPrices',
        Item: {
          symbol: { S: coin } as AttributeValue.SMember,
          price: { N: doc.price.toString() } as AttributeValue.NMember,
          timestamp: { N: doc.timestamp.toString() } as AttributeValue.NMember
        }
      })

      const result = await client.send(command)
      console.log('paul >>> result', result)
      // put command
    } catch (err) {
      console.error(err)
    }
  }

  // delete the message(s)
}

main()
