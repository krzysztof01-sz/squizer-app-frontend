import './styles.scss';
import '../../../global/Components/Input/styles.scss';
import { useContext } from 'react';
import { FilteringContext } from '../../../contexts/Filtering';

const SearchBar = ({ children }) => {
  const { setInvisibleQuizzesQuantity } = useContext(FilteringContext);
  const filterQuizzes = ({ target: { value } }) => {
    value = value.trim().toLowerCase();
    const quizzesTitles = document.querySelectorAll('.quizCard__title');
    quizzesTitles.forEach((quizTitle) => {
      quizTitle.textContent.trim().toLowerCase().includes(value)
        ? quizTitle.closest('.quizCard').classList.remove('none')
        : quizTitle.closest('.quizCard').classList.add('none');
    });
    const invisibleCardsQuantity = Array.from(document.querySelectorAll('.quizCard')).filter((el) => !el.classList.contains('none')).length;
    setInvisibleQuizzesQuantity(invisibleCardsQuantity);
  };
  return children(filterQuizzes);
};

export default SearchBar;
