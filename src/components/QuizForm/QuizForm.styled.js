import {
  ErrorMessage as FormikError,
  Field as FormikField,
  Form as FormikForm,
} from 'formik';
import styled from 'styled-components';

export const Form = styled(FormikForm)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 320px;
`;

export const Fild = styled(FormikField)`
  padding: 4px;
  font: inherit;
`;

export const FormGroup = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ErrorMessage = styled(FormikError)`
  color: red;
  font-size: 14px;
`;
