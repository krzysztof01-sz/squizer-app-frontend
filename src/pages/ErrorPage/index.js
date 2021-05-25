import Layout from '../../global/Components/Layout';
import ErrorImg from '../../assets/images/Error.svg';
import './index.scss';

const ErrorPage = ({ msg, children }) => {
  return (
    <Layout>
      <section className="errorPage">
        <h1 className="errorPage__message">
          {msg}
          <span role="img" aria-label="sad emoji">
            🥺
          </span>
        </h1>

        <img className="errorPage__image" alt={`Error: ${msg}`} src={ErrorImg} />
        {children}
      </section>
    </Layout>
  );
};

export default ErrorPage;
