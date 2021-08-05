import { MessageAttributeValue } from '@aws-sdk/client-sqs'
import { Tokens } from './constants'

export interface CollectionJob {
   DelaySeconds: number,
   MessageAttributes: Record<string, MessageAttributeValue>,
   MessageBody: string,
   QueueUrl: string
} 

export const createJob = (tokenSymbol: Tokens, queueUrl: string): CollectionJob => {
  return {
   DelaySeconds: 10,
   MessageAttributes: { },
   MessageBody: tokenSymbol,
   QueueUrl: queueUrl
 }
}

