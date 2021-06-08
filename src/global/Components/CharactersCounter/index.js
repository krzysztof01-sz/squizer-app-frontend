import { maxCommentLength } from '../../../utils/constants';
import './styles.scss';

const CharactersCounter = ({ charactersNumber }) => {
  return (
    <p className={`commentForm__charactersCounter ${charactersNumber <= maxCommentLength ? null : 'invalid'}`}>
      characters: {charactersNumber}/{maxCommentLength}
    </p>
  );
};

export default CharactersCounter;
