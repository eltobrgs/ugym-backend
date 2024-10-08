import { Hono } from 'hono';
import { cors } from 'hono/cors';
import usersRoute from './routes/users';
import loginRoute from './routes/login';
import signupRoute from './routes/signup';
import { jwt } from 'hono/jwt';

const app = new Hono();

app.use(cors());

// Rotas abertas
app.route('/signup', signupRoute);
app.route('/login', loginRoute);

//Middleware JWT aplicado apenas às rotas abaixo que serao protegidas
app.use('/*', jwt({ secret: Bun.env.JWT_SECRET as string }));

// Rotas protegidas
app.route('/users', usersRoute);

export default app;
