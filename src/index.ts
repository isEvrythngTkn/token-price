// import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'
// import { SQSClient, ListQueuesCommand } from '@aws-sdk/client-sqs'
import { Queue } from './queue'
import { createJob, CollectionJob } from './job'
import { Tokens } from './constants'

// const region = 'us-east-1'

// TYPES

// Collection Job

// CLASSES

// Token
// TokenPrice

const main = async () => {
  const queue: Queue = new Queue('collection')
  await queue.init()

  // create a job
  const job = createJob(Tokens.BTC)
  console.log('paul >>> job', job)

  // send it to the queue
  await queue.addJob(job)

  // const client = new DynamoDBClient({ region })
  // const sqsClient = new SQSClient({ region })
  // const command = new ListTablesCommand({})
  // try {
  //   const results = await client.send(command)
  //   console.log(results.TableNames?.join('\n'))
  //   const data = await sqsClient.send(new ListQueuesCommand({}))
  //   console.log('Success', data)
  // } catch (err) {
  //   console.error(err)
  // }
}

main()
