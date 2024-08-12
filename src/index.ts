import { Hono } from 'hono'
import {cors} from 'hono/cors'
import usersRoute from './routes/users'
import loginRoute from './routes/login'
import signupRoute from './routes/signup'
import { jwt } from 'hono/jwt'

const app = new Hono()

app.use(cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/login", loginRoute)
app.route("/signup", signupRoute)
app.use("/*", jwt({secret: Bun.env.JWT_SECRET as string}))
app.route("/users", usersRoute)

export default app