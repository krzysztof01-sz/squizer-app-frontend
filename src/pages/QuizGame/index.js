import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as api from '../../api/index';

import Answer from './Answer/index';
import QuestionContent from './QuestionContent/index';
import SwitchDot from './SwitchDot/index';
import QuizResult from './QuizResult/index';
import Layout from '../../global/Components/Layout';
import Loader from '../../global/Components/Loader';
import ErrorPage from '../ErrorPage';

import PreviousQuestionButton from './Buttons/PreviousQuestion';
import NextQuestionButton from './Buttons/NextQuestion';
import FinishQuizButton from './Buttons/FinishQuiz';

import { responseTypes } from '../../utils/constants';
import './index.scss';

const QuizGame = () => {
  const { quizId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionID, setQuestionID] = useState(0);
  const [correctUserAnswersQuantity, setCorrectUserAnswersQuantity] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      const response = await api.getQuizQuestions(quizId);

      const { type } = response;
      if (type === responseTypes.success) {
        const { questions } = response;
        questions.map((question) => shuffleArray(question.answers));
        setQuestions(questions);
        setUserAnswers(new Array(questions.length).fill(undefined));
      } else {
        const { msg } = response;
        setError(msg);
      }
      setLoading(false);
    };
    getQuestions();
  }, []);

  const shuffleArray = (arr) => {
    arr = arr.sort(() => Math.random() - 0.5);
    return arr;
  };

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

  const renderSwitchDots = () => {
    const questionsDots = [];
    for (let i = 0; i < questions.length; i++) {
      const element = <SwitchDot filled={i === questionID ? true : false} key={i} callback={() => setQuestionID(i)} />;
      questionsDots.push(element);
    }
    return questionsDots;
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

  const quizNotFinished = typeof correctUserAnswersQuantity === 'boolean';

  if (loading) return <Loader />;
  if (error) return <ErrorPage msg={error} />;

  if (quizNotFinished) {
    const currentQuestion = questions[questionID];

    return (
      <Layout>
        <section className="quiz">
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
          <aside className="switchDots">{renderSwitchDots()}</aside>
        </section>
        <section className="gameNavigationButtons">
          <div className="gameNavigation__left">
            {questionID > 0 ? <PreviousQuestionButton setQuestion={() => setQuestionID(questionID - 1)} /> : null}
          </div>
          <div className="gameNavigation__right">
            {questionID < questions.length - 1 ? (
              <NextQuestionButton setQuestion={() => setQuestionID(questionID + 1)} />
            ) : (
              <FinishQuizButton
                checkAnswers={() => {
                  const result = checkAnswers(userAnswers);
                  if (typeof result === 'number') return setCorrectUserAnswersQuantity(result);
                }}
              />
            )}
          </div>
        </section>
      </Layout>
    );
  } else
    return (
      <Layout>
        <QuizResult userAnswers={userAnswers} questions={questions} correctUserAnswersQuantity={correctUserAnswersQuantity} />
      </Layout>
    );
};

export default QuizGame;
