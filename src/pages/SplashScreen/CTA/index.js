import { Link } from 'react-router-dom';
import './styles.scss';

const CTA = () => {
  return (
    <section className="CTA">
      <p className="CTA__content">
        Join and extend our community. Create a quiz and check your knowledge by solving the other's
        ones.
      </p>
      <Link to="/signup">
        <button className="button CTA__button">Join now</button>
      </Link>
    </section>
  );
};

export default CTA;
