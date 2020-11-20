import '../../styles/pages/Dashboard/SearchBar.scss';
import '../../styles/global/Components/Input.scss';
import { SearchIcon } from '../../global/Icons/icons';

const filterQuizzes = ({ target: { value } }) => {
  value = value.trim().toLowerCase();
  const quizzesTitles = document.querySelectorAll('.quizCard__title');
  quizzesTitles.forEach((quizTitle) => {
    let quizTitleStyle;
    !quizTitle.textContent.trim().toLowerCase().includes(value)
      ? (quizTitleStyle = 'none')
      : (quizTitleStyle = 'block');
    quizTitle.closest('.quizCard').style.display = quizTitleStyle;
  });
};

const SearchBar = () => {
  return (
    <div className="searchBarWrapper">
      <label className="label">
        <input type="text" className="input searchBar" placeholder="search..." onChange={(e) => filterQuizzes(e)} />
        <SearchIcon />
      </label>
    </div>
  );
};

export default SearchBar;
