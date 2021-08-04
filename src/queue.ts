import { SQSClient, ListQueuesCommand, SendMessageCommand } from '@aws-sdk/client-sqs'
import { CollectionJob } from './job'
const region = 'us-east-1'

export class Queue {
  queueName: string
  client: SQSClient

  constructor(queueName: string) {
    this.queueName = queueName
    this.client = new SQSClient({ region })
    // const client = new DynamoDBClient({ region })
    // const sqsClient = new SQSClient({ region })
    // // const command = new ListTablesCommand({})
    // try {
    //   // const results = await client.send(command)
    //   // console.log(results.TableNames.join('\n'))
    //   const data = await sqsClient.send(new ListQueuesCommand({}))
    //   console.log('Success', data)
      
      
    // } catch (err) {
    //   console.error(err)
    // }
  }

  async init (): Promise<void> {
    try {
      const data = await this.client.send(new ListQueuesCommand({}))
      console.log('Success', data)
    } catch (err) {
      console.error(err)
    }
  }

  async addJob(job: CollectionJob): Promise<void> {
    console.log('paul >>> job', job)
    const command = new SendMessageCommand(job)
    const result = await this.client.send(command)
    console.log('paul >>> result', result)
  }

  // async fetchQueueNames (): void {
  //   const sqsClient = new SQSClient({ region })
  //   // const command = new ListTablesCommand({})
  //   try {
  //     // const results = await client.send(command)
  //     // console.log(results.TableNames.join('\n'))
  //     const data = await sqsClient.send(new ListQueuesCommand({}))
  //     console.log('Success', data)
      
      
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
}