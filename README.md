# prisma-subscription-type-safety-problem

## Steps to reproduce the issue

```sh
npm install
cp .env.example .env
# Set your Prisma endpoint in `.env`
prisma deploy
npm run dev
```

App crashes.

Now comment the line with `console.log('x.user', x.user)`.

Code works.

## Example mutation

```graphql
mutation {
  createUser(data: {username: "a", password: "a"}) {
    username
    password
  }
}
```
