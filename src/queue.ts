import { SQSClient, ListQueuesCommand, SendMessageCommand, ReceiveMessageCommand, Message } from '@aws-sdk/client-sqs'
import { CollectionJob } from './job'

export class Queue {
  _queueUrl: string
  client: SQSClient
  region: string

  constructor(queueUrl: string, region: string) {
    this._queueUrl = queueUrl
    this.region = region
    this.client = new SQSClient({ region: this.region })
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
      this.client = new SQSClient({ region: this.region })
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

  async getMessages(): Promise<Message[] | undefined> {
    const params = {
      AttributeNames: [
         "SentTimestamp"
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
         "All"
      ],
      QueueUrl: this._queueUrl,
      VisibilityTimeout: 1, 
      WaitTimeSeconds: 0
    }

    const command = new ReceiveMessageCommand(params)
    const result = await this.client.send(command)
    console.log('paul >>> result', result)
    
    return result.Messages
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