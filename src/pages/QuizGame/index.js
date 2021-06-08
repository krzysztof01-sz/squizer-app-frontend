import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Answer from './Answer';
import QuestionContent from './QuestionContent';
import SwitchDot from './SwitchDot';
import QuizResult from './QuizResult';
import Layout from '../../global/Components/Layout';
import Loader from '../../global/Components/Loader';
import ErrorPage from '../ErrorPage';
import ErrorMessage from '../../global/Components/Messages/ErrorMessage';

import PreviousQuestionButton from './Buttons/PreviousQuestion';
import NextQuestionButton from './Buttons/NextQuestion';
import FinishQuizButton from './Buttons/FinishQuiz';

import { responseTypes } from '../../utils/constants';
import './index.scss';
import SectionHeader from '../../global/Components/SectionHeader';
import { UserContext } from '../../contexts/User';
import { useFetching } from '../../hooks/useFetching';
import { getQuizQuestions } from '../../api';
import * as api from '../../api';
import RatingCard from './RatingCard';

const QuizGame = () => {
  const { setUser } = useContext(UserContext);
  const { quizId } = useParams();
  const { data: questions, loading, error } = useFetching(getQuizQuestions, quizId);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswersQuantity, setCorrectAnswersQuantity] = useState(undefined);
  const [questionID, setQuestionID] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updatingError, setUpdatingError] = useState(null);

  useEffect(() => setUserAnswers(new Array(questions?.length).fill(undefined)), [loading]);

  const getCorrectAnswers = () => {
    const correctAnswers = [];
    questions.forEach(({ correctAnswer }) => correctAnswers.push(correctAnswer));
    return correctAnswers;
  };

  const checkAnswers = (userAnswers) => {
    const correctAnswers = getCorrectAnswers();
    const everyQuestionIsMarked = userAnswers.every((answer) => typeof answer === 'string');
    if (everyQuestionIsMarked) {
      const result = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
      return result;
    } else {
      const firstSkippedQuestionID = userAnswers.findIndex((answer) => answer === undefined);
      setQuestionID(firstSkippedQuestionID);
      return false;
    }
  };

  // display the previously marked user answer
  useEffect(() => {
    const answersElements = document.querySelectorAll('.answer__content');
    answersElements.forEach((el) => el.classList.remove('answer__content--checked'));

    const checkedAnswer = userAnswers[questionID];
    if (checkedAnswer) {
      const answerElement = document.querySelector(`section[name="${checkedAnswer}"]`);
      answerElement.classList.add('answer__content--checked');
    }
  }, [questionID, userAnswers]);

  const renderSwitchDots = () => {
    const questionsDots = [];
    for (let i = 0; i < questions.length; i++) {
      const element = <SwitchDot filled={i === questionID} key={i} callback={() => setQuestionID(i)} />;
      questionsDots.push(element);
    }
    return questionsDots;
  };

  if (loading || isSubmitting) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  const quizNotFinished = correctAnswersQuantity === undefined;

  if (quizNotFinished) {
    const currentQuestion = questions[questionID];

    return (
      <Layout>
        <section className="quiz">
          <SectionHeader isCenter={true}>Question no.{questionID + 1}</SectionHeader>

          <article className="quiz__questionsView">
            <QuestionContent questionID={questionID} content={currentQuestion.content} />

            <section className="question__answers">
              {currentQuestion.answers.map(({ answerId, content }) => {
                return (
                  <Answer
                    content={content}
                    letter={answerId}
                    key={answerId}
                    setAnswer={() =>
                      setUserAnswers(() => {
                        userAnswers[questionID] = answerId;
                        return [...userAnswers];
                      })
                    }
                  />
                );
              })}
            </section>
          </article>

          <aside
            aria-label="click tab to go to the next question or shift+tab to go to the previous question"
            className="switchDots"
          >
            {renderSwitchDots()}
          </aside>

          <section className="gameNavigationButtons">
            <div className="gameNavigation__left">
              {questionID > 0 ? <PreviousQuestionButton setQuestion={() => setQuestionID(questionID - 1)} /> : null}
            </div>
            <div className="gameNavigation__right">
              {questionID < questions.length - 1 ? (
                <NextQuestionButton setQuestion={() => setQuestionID(questionID + 1)} />
              ) : (
                <FinishQuizButton
                  callback={async () => {
                    const correctAnswers = checkAnswers(userAnswers);
                    const givenAnswers = questions.length;
                    const stats = { correctAnswers, givenAnswers };

                    if (typeof correctAnswers === 'number') {
                      setIsSubmitting(true);
                      const { type, data, msg } = await api.updateUserStatistics(quizId, stats);
                      setIsSubmitting(false);

                      setCorrectAnswersQuantity(correctAnswers);

                      if (type === responseTypes.success) {
                        return setUser(data);
                      } else {
                        return setUpdatingError(msg);
                      }
                    }
                  }}
                />
              )}
            </div>
          </section>
        </section>
      </Layout>
    );
  } else
    return (
      <Layout>
        <RatingCard />
        <ErrorMessage message={updatingError} />
        <QuizResult userAnswers={userAnswers} questions={questions} correctAnswersQuantity={correctAnswersQuantity} />
      </Layout>
    );
};

export default QuizGame;
