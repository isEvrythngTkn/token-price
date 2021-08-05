# token-price

## Requirements

- An SQS message queue
- A DynamoDB instance

## Installation

1. Clone the repo
2. Ensure your ~/.aws/credentials file has credentials with permissions for the SQS and DynamoDB you've created
3. Rename config.example.ts to config.ts and fill in the values with AWS credentials
4. From the root dir, run `npm i`

## Usage

To compile typescript into javascript:
- `npm run build`

To add a new collection job to the queue:
- `npm run add-job`

Start the worker:
- `npm run worker`
