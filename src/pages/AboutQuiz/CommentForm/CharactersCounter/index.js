import './styles.scss';

const maxCommentLength = 500;

const CharactersCounter = ({ charactersNumber }) => {
  return (
    <p
      className={`commentForm__charactersCounter ${
        charactersNumber <= maxCommentLength ? null : 'invalid'
      }`}
    >
      characters: {charactersNumber}/{maxCommentLength}
    </p>
  );
};

export default CharactersCounter;
