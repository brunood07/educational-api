import { Entity } from "@/core/entities/entity";

export interface CourseProps {
  instructor_id: string;
  course_name: string;
  description: string;
}

export class Course extends Entity<CourseProps> {
  get instructor_id() {
    return this.props.instructor_id;
  }

  get course_name() {
    return this.props.course_name;
  }

  get description() {
    return this.props.description;
  }

  static create(props: CourseProps) {
    const course = new Course({
      ...props
    })

    return course;
  }
}