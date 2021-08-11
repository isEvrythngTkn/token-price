import { Queue } from './queue'
import { createJob } from './job'
import { Tokens } from './constants'
import { config } from './config'

const main = async () => {
  const queue: Queue = new Queue(config.collectionQueue.url, config.collectionQueue.region)

  // create a job
  const job = createJob(Tokens.BTC, queue.queueUrl)
  console.log('paul >>> job', job)

  // send it to the queue
  await queue.addJob(job)
}

main()
