import { Course } from '@slvd/api-interfaces';
import { ListItem, ListItemText, Typography } from '@slvd/material';

/* eslint-disable-next-line */
export interface CoursesListProps {
  courses: Course[];
  onCourseSelected(id: string | null): void;
}

export function CoursesList({ courses, onCourseSelected }: CoursesListProps) {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Courses
      </Typography>
      <hr />
      {courses.map((course) => (
        <ListItem
          button
          key={course.id}
          onClick={(e) => onCourseSelected(course.id)}
        >
          <ListItemText primary={course.title} />
        </ListItem>
      ))}
    </div>
  );
}

export default CoursesList;
