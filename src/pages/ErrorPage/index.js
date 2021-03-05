import Layout from '../../global/Components/Layout';
import Nav from '../Dashboard/Nav';

import './index.scss';

const ErrorPage = ({ msg, children }) => {
  return (
    <Layout>
      <Nav />
      <section className="errorPage">
        <p className="errorPage__message">
          {msg}
          <span role="img" aria-label="sad emoji">
            🥺
          </span>
        </p>
        {children}
      </section>
    </Layout>
  );
};

export default ErrorPage;
