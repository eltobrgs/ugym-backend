import { Hono, Context } from "hono";
import prisma from "../config/prisma";
import { sign } from "hono/jwt";
import { getToken } from "../service/token";

const loginRoute = new Hono();

loginRoute.post("/", async (c: Context) => {
  const body = await c.req.json();
  const { email, password } = body;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    return c.json({ message: "Usuário não encontrado" }, 400);
  }
  const verify = Bun.password.verifySync(password, user.password);
  if (!verify) {
    return c.json({ message: "Senha inválida" }, 400);
  }

  return c.json(
    {
      token: await getToken(user.id),
      user: {
        name: user.name,
        email: user.email,
      },
    },
    200
  );
});

export default loginRoute;
