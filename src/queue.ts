import { SQSClient, ListQueuesCommand, SendMessageCommand, ReceiveMessageCommand } from '@aws-sdk/client-sqs'
import { CollectionJob } from './job'

export class Queue {
  _queueUrl: string
  client: SQSClient

  constructor(queueUrl: string, region: string) {
    this._queueUrl = queueUrl
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

  get queueUrl(): string {
    return this._queueUrl
  }

  async addJob(job: CollectionJob): Promise<void> {
    console.log('paul >>> job', job)
    const command = new SendMessageCommand(job)
    const result = await this.client.send(command)
    console.log('paul >>> result', result)
  }

  async getMessages(): Promise<string[]> {
    const params = {
      AttributeNames: [
         "SentTimestamp"
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
         "All"
      ],
      QueueUrl: this._queueUrl,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    }

    const command = new ReceiveMessageCommand(params)
    const result = await this.client.send(command)
    
    return result.Messages
      ? result.Messages.map(message => message.Body ?? '')
      : []
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