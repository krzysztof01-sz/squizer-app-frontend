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
    content: 'Co stalo sie z Mateuszem wczoraj gdy pożegnał się ze swoją duszą i opuścił świat realny?',
    answers: [
      { letter: 'A', content: 'Zjadl go szatanisko' },
      { letter: 'B', content: 'Uczyl sie niemieckiego HAJ HILTA! mastehier!' },
      { letter: 'C', content: 'Udusił Iwone w piwnicy' },
      { letter: 'D', content: 'Wypił piwo z trawczyńskim' },
    ],
    correct_answer: 'A',
  },
  {
    content: 'Kogo Igor czyta najchetniej?',
    answers: [
      { letter: 'A', content: 'Maryle Rodowicz' },
      { letter: 'B', content: 'Zenka Martyniuka' },
      { letter: 'C', content: 'Igora Sosnowicza' },
      { letter: 'D', content: 'Hama Sarrisa' },
    ],
    correct_answer: 'C',
  },
  {
    content: 'Co mówi trawczynski gdy Wudarczyk go zapyta jak jest trawa po angielsku?',
    answers: [
      { letter: 'A', content: 'its mi' },
      { letter: 'B', content: 'pizgda' },
      { letter: 'C', content: 'midicinsiczie' },
      { letter: 'D', content: 'gras' },
    ],
    correct_answer: 'A',
  },
  {
    content: 'Z czego robi sie jajeczniczke',
    answers: [
      { letter: 'A', content: 'z jajec' },
      { letter: 'B', content: 'z masla' },
      { letter: 'C', content: 'a maki' },
      { letter: 'D', content: 'magulon' },
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
