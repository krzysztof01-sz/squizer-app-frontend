import { useEffect, useState } from 'react';
import Footer from '../../global/Footer/Footer';
import Header from '../../global/Header/Header';
import Answer from './Answer';
import QuestionContent from './QuestionContent';
import QuestionDot from './QuestionDot';

import '../../styles/pages/Quiz_Game/index.scss';
import PreviousQuestionButton from '../../global/Buttons/PreviousQuestionButton';
import NextQuestionButton from '../../global/Buttons/NextQuestionButton';
import FinishQuizButton from '../../global/Buttons/FinishQuizButton';
import QuizResult from './QuizResult';

const questionsDB = [
  {
    content: 'Question 1',
    answers: [
      { letter: 'A', content: 'Answer 1' },
      { letter: 'B', content: 'Answer 2' },
      { letter: 'C', content: 'Answer 3' },
      { letter: 'D', content: 'Answer 4' },
    ],
    correct_answer: 'A',
  },
  {
    content: 'Question 2?',
    answers: [
      { letter: 'A', content: 'Answer 1' },
      { letter: 'B', content: 'Answer 2' },
      { letter: 'C', content: 'Answer 3' },
      { letter: 'D', content: 'Answer 4' },
    ],
    correct_answer: 'C',
  },
  {
    content: 'Question 3',
    answers: [
      { letter: 'A', content: 'Answer 1' },
      { letter: 'B', content: 'Answer 2' },
      { letter: 'C', content: 'Answer 3' },
      { letter: 'D', content: 'Answer 4' },
    ],
    correct_answer: 'A',
  },
  {
    content: 'Question 4',
    answers: [
      { letter: 'A', content: 'Answer 1' },
      { letter: 'B', content: 'Answer 2' },
      { letter: 'C', content: 'Answer 3' },
      { letter: 'D', content: 'Answer 4' },
    ],
    correct_answer: 'C',
  },
];

const QuizGame = () => {
  const [userAnswers, setUserAnswers] = useState(new Array(4).fill(undefined));
  const [questionID, setQuestionID] = useState(0);
  const [correctUserAnswersQuantity, setCorrectUserAnswersQuantity] = useState(false);

  const getCorrectAnswers = () => {
    const correctAnswers = [];
    questionsDB.forEach(({ correct_answer }) => correctAnswers.push(correct_answer));
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

  const renderQuestionDots = () => {
    const questionsDots = [];
    for (let i = 0; i < questionsDB.length; i++) {
      const element = (
        <QuestionDot filled={i === questionID ? true : false} key={i} setQuestionID={() => setQuestionID(i)} />
      );
      questionsDots.push(element);
    }
    return questionsDots;
  };

  // display before checked user answer
  useEffect(() => {
    const answersElements = document.querySelectorAll('.question__answer');
    answersElements.forEach((el) => el.classList.remove('question__answer--checked'));

    const checkedAnswer = userAnswers[questionID];
    if (checkedAnswer) {
      const answerElement = document.querySelector(`p[name=${checkedAnswer}]`);
      answerElement.classList.add('question__answer--checked');
    }
  }, [questionID, userAnswers]);

  return (
    <>
      <Header />
      {typeof correctUserAnswersQuantity === 'boolean' ? (
        <>
          <section className="quiz">
            <article className="quiz__questionsView">
              <QuestionContent questionID={questionID} content={questionsDB[questionID].content} />

              <section className="question__answers">
                {questionsDB[questionID].answers.map(({ letter, content }) => {
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
              {questionID < questionsDB.length - 1 ? (
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
          quizData={questionsDB}
          correctAnswers={getCorrectAnswers()}
          correctUserAnswersQuantity={correctUserAnswersQuantity}
        />
      )}
      <Footer />
    </>
  );
};

export default QuizGame;
