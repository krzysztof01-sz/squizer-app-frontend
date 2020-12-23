import React from 'react';
import './styles.scss';
import AnswerView from './AnswerView/index';
import QuestionContent from '../QuestionContent';
import { Link } from 'react-router-dom';

const getPercentageResult = (result, max) => Math.floor((result / max) * 100);
const getSchoolGrade = (percentageResult) => {
  if (percentageResult <= 39) return 1;
  if (percentageResult >= 40 && percentageResult <= 49) return 2;
  if (percentageResult >= 50 && percentageResult <= 69) return 3;
  if (percentageResult >= 70 && percentageResult <= 89) return 4;
  else return 5;
};

const QuizResult = ({ correctUserAnswersQuantity, userAnswers, questions }) => {
  const questionsQuantity = questions.length;
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
      <Link to="/dashboard" className="quizResult__link">
        Come back to the dashboard
      </Link>
      {questions.map((question, questionID) => {
        const { correctAnswer } = question;
        const userAnswer = userAnswers[questionID];

        return (
          <article className="quizResult__questionSolution" key={question.content}>
            <QuestionContent questionID={questionID} content={question.content} />

            {question.answers.map(({ content, answerId: answer }) => {
              if (answer === correctAnswer)
                return <AnswerView extraClass={'correct'} key={answer} content={content} />;
              if (answer === userAnswer)
                return <AnswerView extraClass={'incorrect'} key={answer} content={content} />;
              else return <AnswerView key={answer} content={content} />;
            })}
          </article>
        );
      })}
    </section>
  );
};

export default QuizResult;
