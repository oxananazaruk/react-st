import { Formik } from 'formik';
import { ErrorMessage, FormGroup, Fild, Form } from './QuizForm.styled';
import * as Yup from 'yup';

const quizSchema = Yup.object().shape({
  topic: Yup.string().min(3, 'Too Short!').required('Required'),
  time: Yup.number().min(10, 'Must be 10 or more').required('Required'),
  questions: Yup.number().min(3, 'At least 3').required('Required'),
  level: Yup.string()
    .oneOf(['beginner', 'intermediate', 'advanced'])
    .required('Required'),
});

export const QuizForm = ({ onAdd }) => {
  return (
    <div>
      <Formik
        initialValues={{
          topic: '',
          time: 0,
          questions: 0,
          level: 'beginner',
        }}
        validationSchema={quizSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          onAdd(values);
          actions.resetForm();
        }}
      >
        <Form>
          <FormGroup>
            Topic
            <Fild name="topic" />
            <ErrorMessage name="topic" component="span" />
          </FormGroup>

          <FormGroup>
            Time
            <Fild name="time" type="number" />
            <ErrorMessage name="time" component="span" />
          </FormGroup>

          <FormGroup>
            Questions
            <Fild name="questions" type="number" />
            <ErrorMessage name="questions" component="span" />
          </FormGroup>

          <FormGroup>
            Level
            <Fild as="select" name="level">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </Fild>
            <ErrorMessage name="level" component="span" />
          </FormGroup>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
