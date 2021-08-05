import { config } from './config'
import { Queue } from './queue'

const main = async () => {
  console.log('paul >>> worker')

  // look for job message(s)
  const queue = new Queue(config.collectionQueue.url, config.collectionQueue.region)
  const messages = await queue.getMessages()
  console.log('paul >>> messages', messages)
  // call the collector for the job
  // delete the message(s)
}

main()
