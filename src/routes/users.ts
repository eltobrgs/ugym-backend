import { Hono, Context } from "hono"; // Importa as classes Hono e Context para definir e gerenciar rotas
import { User } from "@prisma/client"; // Importa o tipo User do Prisma Client para tipagem
import prisma from "../config/prisma"; // Importa a instância do cliente Prisma configurado

// Tipo para definir a estrutura de dados ao criar um usuário, omitindo o campo 'id'
type UserCreateInput = Omit<User, "id">;

const usersRoute = new Hono(); // Cria uma nova instância da aplicação Hono

// Rota GET para listar todos os usuários
usersRoute.get("/", async (c: Context) => {
  const users = await prisma.user.findMany(); // Busca todos os usuários no banco de dados
  return c.json(users); // Retorna a lista de usuários em formato JSON
});

// Rota GET para obter um usuário específico por ID
usersRoute.get("/:id{[0-9]+}", async (c) => {
  const id = Number(c.req.param("id")); // Obtém o ID da URL e o converte para número
  const user = await prisma.user.findUnique({ // Busca um usuário específico pelo ID
    where: { id },
  });
  return c.json(user); // Retorna o usuário encontrado em formato JSON
});

// Rota GET para obter informações do usuário autenticado
usersRoute.get("/me", async (c) => {
  const payload = c.get("jwtPayload"); // Obtém o payload JWT para identificação do usuário
  const user = await prisma.user.findUnique({ // Busca o usuário baseado no ID presente no payload
    where: { id: payload.id },
  });
  return c.json(user); // Retorna o usuário encontrado em formato JSON
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
        birthDate: new Date(data.birthDate), // Converte a data para o formato Date
        gender: data.gender,
        experience: data.experience,
        profileImage: data.profileImage,
      },
    });
    return c.json({ message: "Informações atualizadas com sucesso!", user: updatedUser }); // Retorna uma mensagem de sucesso e o usuário atualizado
  } catch (error) {
    return c.json({ message: "Erro ao atualizar informações!", error }, 500); // Retorna uma mensagem de erro e o status 500 em caso de falha
  }
});

export default usersRoute; // Exporta a rota para uso em outros arquivos
