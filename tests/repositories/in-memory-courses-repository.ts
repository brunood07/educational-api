import { CoursesRepository } from "@/domain/educational/application/repositories/courses-repository";
import { Course as CoursePrisma } from "@prisma/client";
import { Course } from "@/domain/educational/enterprise/entities/course";
import { randomUUID } from "crypto";

export class InMemoryCoursesRepository implements CoursesRepository {
  public items: CoursePrisma[] = [];

  async create(data: Course): Promise<CoursePrisma> {
    const courseData = {
      id: randomUUID(),
      instructor_id: data.instructor_id,
      description: data.description,
      course_name: data.course_name,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(courseData)

    return courseData
  }

  async findById(id: string): Promise<CoursePrisma | null> {
    const course = this.items.find(item => item.id === id)
    if (!course) return null

    return course;
  }

  async findManyByInstructorId(instructorId: string): Promise<CoursePrisma[]> {
    const course = this.items.filter(item => item.instructor_id === instructorId)

    return course;
  }
}