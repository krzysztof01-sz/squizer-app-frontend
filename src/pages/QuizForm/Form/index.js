import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as api from '../../../api';

import AddQuizButton from '../Buttons/AddQuiz';
import AddQuestionButton from '../Buttons/AddQuestion';
import PreviousQuestionButton from '../Buttons/PreviousQuestion';

import Input from '../Inputs/Text';
import SelectInput from '../Inputs/Select';
import TextAreaInput from '../Inputs/Textarea';

import ErrorMessage from '../../../global/Components/Messages/ErrorMessage';
import ActionResultMessage from '../../../global/Components/Messages/ActionResultMessage';

import { quizCategories, responseTypes } from '../../../utils/constants';
import Layout from '../../../global/Components/Layout';
import { useQuizForm } from '../../../hooks/useQuizForm';
import { colors } from '../../../utils/constants';
import CharactersCounter from '../../../global/Components/CharactersCounter';

const focusOnFirstInput = () => document.querySelector('textarea[name="content"]').focus();

const Form = () => {
  const history = useHistory();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [clientErrors, setClientErrors] = useState([]);

  const {
    generalQuizData,
    setGeneralQuizData,
    questions,
    setQuestions,
    questionID,
    setQuestionID,
    initialQuestionData,
    setQuestionData,
    isQuestionValid,
    canUserAddQuiz,
    prepareQuestionStructure,
  } = useQuizForm();

  const currentQuestion = questions[questionID];

  return (
    <Layout>
      <form method="POST" className="form__wrapper quizForm__wrapper">
        <h1 className="form__header quizForm__header">Quiz creator</h1>
        <section className="form quizForm">
          <section className="quizDataPart">
            <Input
              name="title"
              labelName="title"
              value={generalQuizData?.title}
              callback={({ target }) => setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })}
            />

            <SelectInput
              labelName="category"
              inputText="Choose a category"
              name="category"
              options={quizCategories}
              value={generalQuizData?.category}
              callback={({ target }) => setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })}
            />

            <TextAreaInput
              labelName="description"
              name="description"
              rows="5"
              cols="40"
              value={generalQuizData?.description}
              callback={({ target }) => setGeneralQuizData({ ...generalQuizData, [target.name]: target.value })}
            />
            <CharactersCounter charactersNumber={generalQuizData?.description?.length} />
          </section>

          <section className="questionsPart">
            <TextAreaInput
              name="content"
              labelName="question"
              rows="5"
              cols="40"
              value={currentQuestion?.content}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />
            <Input
              borderColor={colors.valid}
              name="correctAnswer"
              labelName="put the correct answer"
              value={currentQuestion?.correctAnswer}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />
            <Input
              borderColor={colors.invalid}
              name="optionalAnswer1"
              labelName="1st incorrect answer"
              value={currentQuestion?.optionalAnswer1}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <Input
              borderColor={colors.invalid}
              name="optionalAnswer2"
              labelName="2nd incorrect answer"
              value={currentQuestion?.optionalAnswer2}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <Input
              borderColor={colors.invalid}
              name="optionalAnswer3"
              labelName="3rd incorrect answer"
              value={currentQuestion?.optionalAnswer3}
              callback={({ target: { value, name } }) => setQuestionData(value, name)}
            />

            <p aria-label={`question no. ${questionID + 1}`} className="questionNumber">
              question no. {questionID + 1}
            </p>

            {clientErrors.map((error, index) => {
              return <ErrorMessage key={index} message={error} />;
            })}

            {serverErrors.map(({ msg, type }, index) => {
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
                    setClientErrors([]);
                    if (questionID < questions.length) {
                      const validationResult = isQuestionValid(currentQuestion);

                      if (typeof validationResult === 'boolean') {
                        const nextQuestion = questions[questionID + 1];
                        const isShowedCurrentQuestion = !nextQuestion;
                        setQuestions([...questions]);

                        if (isShowedCurrentQuestion) {
                          setQuestions(() => [...questions, initialQuestionData]);
                        }

                        localStorage.setItem('quiz-data', JSON.stringify(questions));
                        localStorage.setItem('general-quiz-data', JSON.stringify({ ...generalQuizData }));
                      } else {
                        focusOnFirstInput();
                        return setClientErrors(validationResult);
                      }
                    }
                    setQuestionID(questionID + 1);
                    focusOnFirstInput();
                  }}
                />
              </div>
            </section>
            <aside className="buttonWrapper">
              {canUserAddQuiz() ? (
                <AddQuizButton
                  isActive={isSubmitting}
                  callback={async () => {
                    setIsSubmitting(true);
                    const quiz = prepareQuestionStructure();
                    const response = await api.addQuiz(quiz);

                    setIsSubmitting(false);
                    setServerErrors(response.msg);

                    if (response.type === responseTypes.success) {
                      localStorage.removeItem('quiz-data');
                      localStorage.removeItem('general-quiz-data');
                      return history.push('/dashboard');
                    }
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
