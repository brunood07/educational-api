import { FastifyInstance } from "fastify";
import { RegisterStudentController } from "../controllers/register-student-controller";

export async function studentRoutes(app: FastifyInstance) {
  const registerStudent = new RegisterStudentController();

  app.post('/students', registerStudent.handle);
}