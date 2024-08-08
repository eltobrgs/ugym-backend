import { Hono } from 'hono'
import usersRoute from './routes/users'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/users', usersRoute)

export default app
