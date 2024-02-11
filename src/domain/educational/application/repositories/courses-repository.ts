import { Course as CoursePrisma } from "@prisma/client";
import { Course } from "../../enterprise/entities/course";

export abstract class CoursesRepository {
  abstract create(data: Course): Promise<CoursePrisma>
  abstract findById(id: string): Promise<CoursePrisma | null>
  abstract findManyByInstructorId(instructorId: string): Promise<CoursePrisma[]>
}