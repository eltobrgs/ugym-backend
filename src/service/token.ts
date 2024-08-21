import { sign } from "hono/jwt";

export async function getToken(userId: number) {
  const secret = Bun.env.JWT_SECRET as string;
  const token = await sign(
    {
      id: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    secret,
    "HS256"
  );

  return token;
}
