# prisma-subscription-type-safety-problem

## Steps to reproduce the issue

```sh
npm install
cp .env.example .env
# Set your Prisma endpoint in `.env`
prisma deploy
npm run dev
```

App crashes on `resultValue.user`.

Now, in `main.ts`, comment line 39: `console.log('resultValue.user', resultValue.user)`.

Code works!
`resultValue` and `resultValueAsAnyType` where created from similar attributions, except `resultValueAsAnyType` is declared as being any type.

In Graphql Playground, execute a mutation to get a subscription event, e.g.:

```graphql
mutation {
  createUser(data: {username: "a", password: "a"}) {
    username
    password
  }
}
```
