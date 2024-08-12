import { Hono, Context } from "hono";
import { User } from "@prisma/client";
import prisma from "../config/prisma";

type UserCreateInput = Omit<User, "id">;

const usersRoute = new Hono();

usersRoute.get("/", async (c: Context) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

usersRoute.get("/:id{[0-9]+}", async (c) => {
  console.log(c.req.param("id"));
  let id = Number(c.req.param("id"));
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return c.json(user);
});

usersRoute.get("/me", async (c) => {
const payload = c.get("jwtPayload");
  const user = await prisma.user.findUnique({
    where: { id: payload.id },
  });
  return c.json(user);
});


export default usersRoute;