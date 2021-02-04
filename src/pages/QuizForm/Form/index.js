import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as api from '../../../api';

import AddQuizButton from '../Buttons/AddQuiz';
import AddQuestionButton from '../Buttons/AddQuestion';
import PreviousQuestionButton from '../Buttons/PreviousQuestion';

import Input from '../Inputs/Text';
import SelectInput from '../Inputs/Select';
import TextAreaInput from '../Inputs/Textarea';

import * as fb from '../../../utils/feedbackMessages';
import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';

import ErrorPage from '../../ErrorPage';
import Layout from '../../../global/Components/Layout';
import { categories, responseTypes } from '../../../utils/constants';

const Form = () => {
  const [generalQuizData, setGeneralQuizData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const initialQuestionData = {
    content: '',
    correctAnswer: '',
    optionalAnswer1: '',
    optionalAnswer2: '',
    optionalAnswer3: '',
  };
  const history = useHistory();
  const initialQuestionID = 0;
  const [questions, setQuestions] = useState([{ ...initialQuestionData }]);
  const [questionID, setQuestionID] = useState(initialQuestionID);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  useEffect(() => console.log(authError), [authError]);
  useEffect(() => console.log(validationErrors), [validationErrors]);
  useEffect(() => console.log(messages), [messages]);
  useEffect(() => console.log(questions), [questions]);

  const getCurrentQuestionsContents = () => {
    const currentQuestionsContents = [];
    questions.forEach(({ content }) => currentQuestionsContents.push(content));
    return [...currentQuestionsContents];
  };

  const isQuestionUnique = (questionContent) => {
    const currentQuestionsContents = getCurrentQuestionsContents();
    const incluesAtLeast2Elements = currentQuestionsContents.length >= 2;
    if (incluesAtLeast2Elements) {
      currentQuestionsContents.length = questionID;
      return currentQuestionsContents.includes(questionContent) ? false : true;
    } else return true;
  };

  const areAnswersUnique = (answers) => {
    const properUniqueAnswersQuantity = answers.length;
    const uniqueAnswersQuantity = Array.from(new Set(answers)).length;
    return uniqueAnswersQuantity === properUniqueAnswersQuantity;
  };

  const trimObjectFields = (obj) => {
    const objWithTrimmedValues = {};
    for (const [key, value] of Object.entries(obj)) {
      objWithTrimmedValues[key] = value.trim();
    }
    return objWithTrimmedValues;
  };

  const areAllFieldsFilled = (question) => {
    const questionWithTrimmedValues = trimObjectFields({ ...question });
    const trimmedValues = Object.values(questionWithTrimmedValues);
    const allFieldsFilled = !trimmedValues.includes('');
    return allFieldsFilled;
  };

  const isQuestionValid = (question) => {
    const questionCopy = { ...question };
    const questionUnique = isQuestionUnique(questionCopy.content);
    const allFieldsFilled = areAllFieldsFilled(questionCopy);

    delete questionCopy.content;
    const questionAnswers = Object.values(questionCopy);

    const answersUnique = areAnswersUnique(questionAnswers);
    const messages = [];

    if (!questionUnique) messages.push(fb.QUESTION_REPEATED);
    if (!allFieldsFilled) messages.push(fb.NOT_ALL_FILLED);
    if (!answersUnique) messages.push(fb.NOT_UNIQUE_ANSWERS);

    return messages.length === 0 ? true : messages;
  };

  const getRandomNumber = () => Math.random().toString();

  const setQuestionData = (value, name) => {
    setQuestions(() => {
      questions[questionID][name] = value;
      return [...questions];
    });
  };

  const prepareQuestionStructure = () => {
    const generalQuizDataFilled = areAllFieldsFilled(generalQuizData);

    if (generalQuizDataFilled) {
      const generalData = trimObjectFields(generalQuizData);
      const questionsWithTrimmedFields = questions.map((question) => trimObjectFields(question));

      const structuredQuestions = [];
      questionsWithTrimmedFields.forEach(
        ({ content, correctAnswer, optionalAnswer1, optionalAnswer2, optionalAnswer3 }) => {
          const correctAnswerID = getRandomNumber();
          structuredQuestions.push({
            content: content,
            answers: [
              { answerId: correctAnswerID, content: correctAnswer },
              { answerId: getRandomNumber(), content: optionalAnswer1 },
              { answerId: getRandomNumber(), content: optionalAnswer2 },
              { answerId: getRandomNumber(), content: optionalAnswer3 },
            ],
            correctAnswer: correctAnswerID,
          });
        },
      );
      structuredQuestions.pop();
      const quiz = { ...generalData, questions: [...structuredQuestions] };
      return quiz;
    }
  };

  const focusOnFirstInput = () => document.querySelector('input[name="content"]').focus();

  const userCanAddAQuiz = () => {
    const thereAreAtLeast2QuestionsSet = questionID >= 2;
    const userIsFillingTheNewestQuestion = !questions[questionID + 1];

    return thereAreAtLeast2QuestionsSet && userIsFillingTheNewestQuestion;
  };

  if (authError) return <ErrorPage msg={authError} />;

  const currentQuestion = questions[questionID];

  return (
    <Layout>
      <form method="POST" className="form__wrapper quizForm__wrapper">
        <header className="form__header quizForm__header">Quiz creator</header>
        <section className="form quizForm">
          <section className="quizDataPart">
            <Input
              name="title"
              labelName="title"
              value={generalQuizData?.title}
              callback={({ target }) =>
                setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })
              }
            />

            <SelectInput
              labelName="category"
              inputText="Choose a category"
              name="category"
              options={categories}
              value={generalQuizData?.category}
              callback={({ target }) =>
                setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })
              }
            />

            <TextAreaInput
              labelName="description"
              name="description"
              rows="5"
              cols="40"
              value={generalQuizData?.description}
              callback={({ target }) =>
                setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })
              }
            />
          </section>

          <section className="questionsPart">
            <Input
              name="content"
              labelName="question"
              value={currentQuestion?.content}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />
            <Input
              name="correctAnswer"
              labelName="correct answer"
              value={currentQuestion?.correctAnswer}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />
            <Input
              name="optionalAnswer1"
              labelName="1st optional answer"
              value={currentQuestion?.optionalAnswer1}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <Input
              name="optionalAnswer2"
              labelName="2nd optional answer"
              value={currentQuestion?.optionalAnswer2}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <Input
              name="optionalAnswer3"
              labelName="3rd optional answer"
              value={currentQuestion?.optionalAnswer3}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <p className="questionNumber">question no. {questionID + 1}</p>

            {validationErrors.map((error, index) => {
              return <ErrorMessage key={index} message={error} />;
            })}

            {messages.map(({ msg, type }, index) => {
              return <ActionResultMessage key={index} msg={msg} type={type} />;
            })}

            <section className="questionsNavigation">
              <div className="buttonWrapper">
                {questionID >= 1 ? (
                  <PreviousQuestionButton
                    callback={(e) => {
                      e.preventDefault();
                      setQuestionID(questionID - 1);
                    }}
                  />
                ) : null}
              </div>

              <div className="buttonWrapper">
                <AddQuestionButton
                  callback={(e) => {
                    e.preventDefault();
                    setValidationErrors([]);
                    if (questionID < questions.length) {
                      const validationResult = isQuestionValid(currentQuestion);

                      if (typeof validationResult === 'boolean') {
                        const nextQuestion = questions[questionID + 1];
                        const isShowedCurrentQuestion = !nextQuestion;
                        if (isShowedCurrentQuestion) {
                          setQuestions(() => [...questions, initialQuestionData]);
                        }
                      } else {
                        focusOnFirstInput();
                        return setValidationErrors(validationResult);
                      }
                    }
                    setQuestionID(questionID + 1);
                    focusOnFirstInput();
                  }}
                />
              </div>
            </section>
            <aside className="buttonWrapper">
              {userCanAddAQuiz() ? (
                <AddQuizButton
                  isActive={isSubmitting}
                  callback={async () => {
                    setIsSubmitting(true);
                    const quiz = prepareQuestionStructure();
                    const { type, msg } = await api.addQuiz(quiz);

                    // when token is invalid, middleware returns plain text, so here I preserve it
                    const isAuthError = type === responseTypes.error && typeof msg === 'string';

                    if (isAuthError) {
                      setAuthError(msg);
                    } else {
                      setMessages(msg);
                    }

                    if (type === responseTypes.success) return history.push('/dashboard');
                    setIsSubmitting(false);
                  }}
                />
              ) : null}
            </aside>
          </section>
        </section>
      </form>
    </Layout>
  );
};

export default Form;
