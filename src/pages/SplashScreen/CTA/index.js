import { Link } from 'react-router-dom';
import './styles.scss';

const CTA = () => {
  return (
    <section className="CTA">
      <p className="CTA__content">
        Create a free account within a few seconds and join to our community right now.
        Entertainment and knowledge are waiting for you. Have fun! 👊
      </p>
      <Link to="/signup">
        <button className="button CTA__button">Join now</button>
      </Link>
    </section>
  );
};

export default CTA;
