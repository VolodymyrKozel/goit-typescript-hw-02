import css from './ErrorMessage.module.css';
import { ErrorAxios } from '../App/App.types';

type ErrorMessageProps = {
  error: ErrorAxios;
};
const ErrorMessage  = ({ error }: ErrorMessageProps) => {
  return (
    <div className={css.container}>
      <h1 className={css.heading}>
        Error page {error.response && error.response.status}
      </h1>
      <p className={css.text}>{error.name && error.name}</p>
      <p className={css.text}>{error.message && error.message}</p>
      <p className={css.text}>{error.code && error.code}</p>
    </div>
  );
};
export default ErrorMessage;
