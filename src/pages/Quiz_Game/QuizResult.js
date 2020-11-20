import React from 'react';
import '../../styles/pages/Quiz_Game/QuizResult.scss';
import Answer from './Answer';
import QuestionContent from './QuestionContent';
import { colors } from '../../utils/constants';

const getPercentageResult = (result, max) => Math.floor((result / max) * 100);
const getSchoolGrade = (percentageResult) => {
  if (percentageResult <= 39) return 1;
  if (percentageResult >= 40 && percentageResult <= 49) return 2;
  if (percentageResult >= 50 && percentageResult <= 69) return 3;
  if (percentageResult >= 70 && percentageResult <= 89) return 4;
  else return 5;
};

const QuizResult = ({ correctUserAnswersQuantity, correctAnswers, userAnswers, quizData }) => {
  const questionsQuantity = quizData.length;
  const percentageResult = getPercentageResult(correctUserAnswersQuantity, questionsQuantity);
  const schoolGrade = getSchoolGrade(percentageResult);

  return (
    <section className="quizResult">
      <section className="quizResult__generalData">
        <p className="result">
          {correctUserAnswersQuantity}/{questionsQuantity}
        </p>
        <p className="result">Percentage result: {percentageResult}%</p>
        <p className="result">School grade: {schoolGrade}</p>
      </section>
      {quizData.map((question, questionID) => {
        return (
          <article className="quizResult__questionSolution" key={question.content}>
            <QuestionContent questionID={questionID} content={question.content} />
            {question.answers.map(({ content, letter }) => {
              if (letter === correctAnswers[questionID])
                return <Answer borderBottomColor={colors.validColorLight} key={letter} content={content} />;
              if (letter === userAnswers[questionID])
                return <Answer borderBottomColor={colors.invalidColorLight} key={letter} content={content} />;
              else return <Answer key={letter} content={content} />;
            })}
          </article>
        );
      })}
    </section>
  );
};

export default QuizResult;
