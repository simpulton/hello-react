
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  ListOutlinedIcon,
  makeStyles,
} from '@slvd/material';

import { Course } from '@slvd/api-interfaces';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface CoursesDetailsProps {
  currentCourse: Course;
  onCancel(): void;
  onSave(course: Course): void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const extractDataFromInputChange = ({
  type,
  value,
  checked,
}: HTMLInputElement) => (type === 'checkbox' ? checked : value);

export function CoursesDetails({
  currentCourse,
  onCancel,
  onSave,
}: CoursesDetailsProps) {
  const classes = useStyles();
  const [course, setCourse] = useState(currentCourse);

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCourse((courseState) =>
      Object.assign({}, courseState, {
        [target.id]: extractDataFromInputChange(target),
      })
    );
  };

  useEffect(() => {
    setCourse(currentCourse);
  }, [currentCourse]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ListOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Courses
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={course.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                maxRows={4}
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={course.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => onSave(course)}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default CoursesDetails;
