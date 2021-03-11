import Layout from '../../global/Components/Layout';
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
        {children}
      </section>
    </Layout>
  );
};

export default ErrorPage;
