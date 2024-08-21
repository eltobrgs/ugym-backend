import { Hono, Context } from "hono";
import { User } from "@prisma/client";
import prisma from "../config/prisma";


const usersRoute = new Hono();

usersRoute.get("/", async (c: Context) => {
  const users = await prisma.user.findMany();
  return c.json(users);
});

usersRoute.get("/:id{[0-9]+}", async (c) => {
  const id = Number(c.req.param("id"));
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


// Nova rota PUT para atualizar as informações do usuário autenticado
usersRoute.put("/me", async (c: Context) => {
  const data = await c.req.json(); // Obtém os dados da solicitação como JSON
  const payload = c.get("jwtPayload"); // Obtém o payload JWT para identificação do usuário
  
  try {
    // Atualiza as informações do usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: { id: payload.id },
      data: {
        name: data.signupName,
        meta: data.meta,
        weight: data.weight,
        height: data.height,
        trainingDays: data.trainingDays,
        disease: data.disease,
        specialCondition: data.specialCondition,
        phoneNumber: data.phoneNumber,
        birthDate: new Date(data.birthDate), 
        gender: data.gender,
        experience: data.experience,
        profileImage: data.profileImage,
      },
    });
    return c.json({ message: "Informações atualizadas com sucesso!", user: updatedUser }); 
  } catch (error) {
    return c.json({ message: "Erro ao atualizar informações!", error }, 500); 
  }
});

export default usersRoute; 
