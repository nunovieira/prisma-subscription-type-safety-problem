import { Prisma, UserSubscriptionPayload } from './generated/prisma';

const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  debug: false,
  // secret: process.env.PRISMA_SECRET,
})

const selectionSet = `{
  mutation
  node {
    username
    password
  }
  updatedFields
}`

prisma.subscription.user({}, selectionSet).then(subscription => handler(subscription)).catch(reason => console.error(reason))

const handler = async (subscription: AsyncIterator<UserSubscriptionPayload>) => {
  console.log('wait for an event...')

  /**
   * subscription.next() returns Promise<IteratorResult<UserSubscriptionPayload>>
   * result will be of type IteratorResult<UserSubscriptionPayload>
   */
  const result = await subscription.next()
  console.log('result', result)

  /**
   * result.value is of type UserSubscriptionPayload
   * resultValue will be of type UserSubscriptionPayload
   * resultValue.user will throw an error, because user does not exist in UserSubscriptionPayload
   */
  const resultValue = result.value
  /**
   * ⚠️ comment next line to work
   */
  console.log('resultValue.user', resultValue.user) // error TS2339: Property 'user' does not exist on type 'UserSubscriptionPayload'.

  /**
   * similar attribution as above, but declaring as type any
   */
  const resultValueAsAnyType: any = result.value
  /**
   * the next line works, because resultValueAsAnyType is of type any
   */
  console.log('resultValueAsAnyType.user', resultValueAsAnyType.user) // 👍 this is UserSubscriptionPayload


  const user = resultValueAsAnyType.user
  console.log('user.mutation', user.mutation)           // 👍
  console.log('user.node', user.node)                   // 👍
  console.log('user.updatedFields', user.updatedFields) // 👍

  if (!result.done) {
    handler(subscription)
  }
  else {
    console.log('done')
  }
}
