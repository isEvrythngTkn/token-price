import { MessageAttributeValue } from '@aws-sdk/client-sqs'
import { Tokens } from './constants'

export interface CollectionJob {
   DelaySeconds: number,
   MessageAttributes: Record<string, MessageAttributeValue>,
   MessageBody: string,
   QueueUrl: "https://sqs.us-east-1.amazonaws.com/076057130695/collection"
} 

export const createJob = (tokenSymbol: Tokens): CollectionJob => {
  return {
   DelaySeconds: 10,
   MessageAttributes: { },
   MessageBody: tokenSymbol,
   QueueUrl: "https://sqs.us-east-1.amazonaws.com/076057130695/collection"
 }
}

