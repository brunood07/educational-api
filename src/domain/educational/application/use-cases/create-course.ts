import { Course as PrismaCourse } from "@prisma/client";
import { CoursesRepository } from "../repositories/courses-repository";
import { Course, } from "../../enterprise/entities/course";
import { InvalidParametersError } from "@/core/errors/invalid-parameters";

interface CreateCourseUseCaseRequest {
  course_name: string;
  instructor_id: string;
  description: string;
}

interface CreateCourseUseCaseResponse {
  course: PrismaCourse;
}

export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) { }

  execute = async (data: CreateCourseUseCaseRequest): Promise<CreateCourseUseCaseResponse> => {
    const { course_name, description, instructor_id } = data

    if (!instructor_id || !course_name || !description) throw new InvalidParametersError()

    const courseEntity = Course.create(data)
    const course = await this.coursesRepository.create(courseEntity)

    return {
      course
    }
  }
}