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

  const result = await subscription.next()
  console.log('result', result)

  const x = result.value
  console.log('x.mutation', x.mutation)           // undefined
  console.log('x.node', x.node)                   // undefined
  console.log('x.updatedFields', x.updatedFields) // undefined
  /**
   * the next line gives an error, because x is of type UserSubscriptionPayload
   * comment it to work
   */
  console.log('x.user', x.user)                // error TS2339: Property 'user' does not exist on type 'UserSubscriptionPayload'.

  const y: any = result.value
  console.log('y.mutation', y.mutation)           // undefined
  console.log('y.node', y.node)                   // undefined
  console.log('y.updatedFields', y.updatedFields) // undefined
  /**
   * the next line works, because y is of type any
   */
  console.log('y.user', y.user)                   // 👍 this is UserSubscriptionPayload

  const z = y.user
  console.log('z.mutation', z.mutation)           // 👍
  console.log('z.node', z.node)                   // 👍
  console.log('z.updatedFields', z.updatedFields) // 👍

  if (!result.done) {
    handler(subscription)
  }
  else {
    console.log('done')
  }
}
