import { Course } from '@slvd/api-interfaces';

import {
  fetchCourses,
  setCurrentCourse,
  selectAllCourses,
  selectCurrentCourse,
  updateRemoteCourse,
  createRemoteCourse,
  removeRemoteCourse,
} from '@slvd/core-state';

import {
  Container,
  CssBaseline,
  Grid,
  Paper,
  makeStyles,
} from '@slvd/material';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CoursesDetails from './courses-details/courses-details';
import CoursesList from './courses-list/courses-list';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 600,
    width: 400,
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

/* eslint-disable-next-line */
export interface CoursesProps {}

export function Courses(props: CoursesProps) {
  const courses = useSelector(selectAllCourses);
  const currentCourse = useSelector(selectCurrentCourse);
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleCourseSelected(id: string | null) {
    dispatch(setCurrentCourse(id));
  }

  function reset() {
    handleCourseSelected(null);
  }

  function handleSave(course: Course) {
    if (course.id) {
      dispatch(updateRemoteCourse(course));
    } else {
      dispatch(createRemoteCourse(course));
    }

    reset();
  }

  function handleRemove(course: Course) {
    dispatch(removeRemoteCourse(course.id));
  }

  useEffect(() => {
    dispatch(fetchCourses());
    reset();
  }, []);

  return (
    <Container component="main">
      <CssBaseline />
      <Grid
        container
        className={classes.root}
        justifyContent="center"
        spacing={4}
      >
        <Paper className={classes.paper}>
          <CoursesList
            courses={courses}
            onCourseSelected={handleCourseSelected}
          />
        </Paper>
        <Paper className={classes.paper}>
          <CoursesDetails
            currentCourse={currentCourse}
            onCancel={reset}
            onSave={handleSave}
          />
        </Paper>
      </Grid>
    </Container>
  );
}

export default Courses;
