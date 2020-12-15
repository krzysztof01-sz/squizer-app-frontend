import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Footer from '../../global/Components/Footer';
import Header from '../../global/Components/Header';

import Answer from './Answer/index';
import QuestionContent from './QuestionContent/index';
import QuestionDot from './QuestionDot/index';

import PreviousQuestionButton from './Buttons/PreviousQuestion';
import NextQuestionButton from './Buttons/NextQuestion';
import FinishQuizButton from './Buttons/FinishQuiz';

import QuizResult from './QuizResult/index';
import './index.scss';

const QuizGame = () => {
  const { quizId } = useParams();
  useEffect(() => {
    const getQuestions = async () => {
      const data = await fetch(`http://localhost:8080/api/quiz/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
        },
      });
      const [questions] = await data.json();
      setQuestions(questions);
      setUserAnswers(new Array(questions.length).fill(undefined));
    };
    getQuestions();
  }, []);

  const [questions, setQuestions] = useState([]);

  const [userAnswers, setUserAnswers] = useState([]);
  const [questionID, setQuestionID] = useState(0);
  const [correctUserAnswersQuantity, setCorrectUserAnswersQuantity] = useState(false);

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
      console.log(firstSkippedQuestionID);
      setQuestionID(firstSkippedQuestionID);
      return false;
    }
  };

  const renderQuestionDots = () => {
    const questionsDots = [];
    for (let i = 0; i < questions.length; i++) {
      const element = (
        <QuestionDot filled={i === questionID ? true : false} key={i} setQuestionID={() => setQuestionID(i)} />
      );
      questionsDots.push(element);
    }
    return questionsDots;
  };

  // display the previously marked user answer
  useEffect(() => {
    const answersElements = document.querySelectorAll('.question__answer');
    answersElements.forEach((el) => el.classList.remove('question__answer--checked'));

    const checkedAnswer = userAnswers[questionID];
    if (checkedAnswer) {
      const answerElement = document.querySelector(`p[name="${checkedAnswer}"]`);
      answerElement.classList.add('question__answer--checked');
    }
  }, [questionID, userAnswers]);

  return (
    <>
      <Header />
      {typeof correctUserAnswersQuantity === 'boolean' && questions.length > 0 ? (
        <>
          <section className="quiz">
            <article className="quiz__questionsView">
              <QuestionContent questionID={questionID} content={questions[questionID].content} />

              <section className="question__answers">
                {questions[questionID].answers.map(({ letter, content }) => {
                  return (
                    <Answer
                      letter={letter}
                      content={content}
                      setAnswer={(answer) =>
                        setUserAnswers(() => {
                          userAnswers[questionID] = answer;
                          return [...userAnswers];
                        })
                      }
                      key={letter}
                    />
                  );
                })}
              </section>
            </article>
            <aside className="questionDots">{renderQuestionDots()}</aside>
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
        </>
      ) : (
        <QuizResult
          userAnswers={userAnswers}
          quizData={questions}
          correctAnswers={getCorrectAnswers()}
          correctUserAnswersQuantity={correctUserAnswersQuantity}
        />
      )}
      <Footer />
    </>
  );
};

export default QuizGame;
