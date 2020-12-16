import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addQuiz } from '../../../api/userAPI';

import AddQuiz from '../Buttons/AddQuiz';
import AddQuestionButton from '../Buttons/AddQuestion';
import PreviousQuestionButton from '../Buttons/PreviousQuestion';

import Input from '../Inputs/Text';
import SelectInput from '../Inputs/Select';
import TextAreaInput from '../Inputs/Textarea';

import FeedbackMessage from '../../../global/Components/FeedbackMessage/index';

const Form = () => {
  const initialQuestionID = 0;
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
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
  const [questionID, setQuestionID] = useState(initialQuestionID);
  const [questions, setQuestions] = useState([{ ...initialQuestionData }]);
  const [errors, setErrors] = useState([]);

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
    return uniqueAnswersQuantity === properUniqueAnswersQuantity ? true : false;
  };

  const trimObjectFields = (obj) => {
    const objWithTrimmedValues = {};
    for (const [key, value] of Object.entries(obj)) {
      objWithTrimmedValues[key] = value.trim();
    }
    return objWithTrimmedValues;
  };

  const areAllFieldsFilled = (question) => {
    const questionWithTrimmedValues = {};
    for (const [key, value] of Object.entries(question)) {
      questionWithTrimmedValues[key] = value.trim();
    }
    const trimmedValues = Object.values(questionWithTrimmedValues);
    const allFieldsFilled = !trimmedValues.includes('');
    return allFieldsFilled;
  };

  const validateQuestion = (question) => {
    const questionCopy = { ...question };
    const questionUnique = isQuestionUnique(questionCopy.content);
    const allFieldsFilled = areAllFieldsFilled(questionCopy);

    delete questionCopy.content;
    const questionAnswers = Object.values(questionCopy);

    const answersUnique = areAnswersUnique(questionAnswers);
    const messages = [];

    if (!questionUnique) messages.push('The question was repeated');
    if (!allFieldsFilled) messages.push('You did not fill all the fields');
    if (!answersUnique) messages.push('The answers are not unique');

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

      setErrors([]);
      const structuredQuestions = [];
      questionsWithTrimmedFields.forEach(
        ({ content, correctAnswer, optionalAnswer1, optionalAnswer2, optionalAnswer3 }) => {
          const correctAnswerID = getRandomNumber();
          structuredQuestions.push({
            content: content,
            answers: [
              { letter: correctAnswerID, content: correctAnswer },
              { letter: getRandomNumber(), content: optionalAnswer1 },
              { letter: getRandomNumber(), content: optionalAnswer2 },
              { letter: getRandomNumber(), content: optionalAnswer3 },
            ],
            correctAnswer: correctAnswerID,
          });
        },
      );
      structuredQuestions.pop();
      const quiz = { ...generalData, questions: [...structuredQuestions] };
      return quiz;
    } else return setErrors(['Fill all data about the quiz']);
  };

  return (
    <form method="POST" className="form__wrapper quizForm__wrapper">
      <header className="form__header quizForm__header">Quiz creator</header>
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
            options={['maths', 'it', 'english', 'riddles']}
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
        </section>

        <section className="questionsPart">
          <Input
            name="content"
            labelName="question"
            value={questions[questionID]?.content}
            callback={({ target: { value, name } }) => setQuestionData(value, name)}
          />
          <Input
            name="correctAnswer"
            labelName="correct answer"
            value={questions[questionID]?.correctAnswer}
            callback={({ target: { value, name } }) => setQuestionData(value, name)}
          />
          <Input
            name="optionalAnswer1"
            labelName="1st optional answer"
            value={questions[questionID]?.optionalAnswer1}
            callback={({ target: { value, name } }) => setQuestionData(value, name)}
          />

          <Input
            name="optionalAnswer2"
            labelName="2nd optional answer"
            value={questions[questionID]?.optionalAnswer2}
            callback={({ target: { value, name } }) => setQuestionData(value, name)}
          />

          <Input
            name="optionalAnswer3"
            labelName="3rd optional answer"
            value={questions[questionID]?.optionalAnswer3}
            callback={({ target: { value, name } }) => setQuestionData(value, name)}
          />

          <p className="questionNumber">question no. {questionID + 1}</p>

          {errors.map((error, index) => {
            return <FeedbackMessage key={index} message={error} type="error" />;
          })}

          {messages.map(({ msg, type }, index) => {
            return <FeedbackMessage key={index} message={msg} type={type} />;
          })}

          <section className="questionsNavigation">
            <div className="buttonWrapper">
              {questionID >= 1 ? (
                <PreviousQuestionButton
                  callback={(e) => {
                    e.preventDefault();
                    if (questionID >= 1) {
                      setQuestionID(questionID - 1);
                    }
                  }}
                />
              ) : null}
            </div>

            <div className="buttonWrapper">
              <AddQuestionButton
                callback={(e) => {
                  e.preventDefault();
                  setErrors([]);
                  if (questionID < questions.length) {
                    const validationResult = validateQuestion(questions[questionID]);

                    if (typeof validationResult === 'object') {
                      return setErrors(validationResult);
                    } else {
                      const currentQuestionIsDisplayed = questions[questionID + 1] ? false : true;
                      if (currentQuestionIsDisplayed) {
                        setQuestions(() => [...questions, initialQuestionData]);
                      }
                    }
                  }
                  setQuestionID(questionID + 1);
                  document.querySelector('input[name="content"]').focus();
                }}
              />
            </div>
          </section>
          <aside className="buttonWrapper">
            {questionID >= 2 && !questions[questionID + 1] ? (
              <AddQuiz
                isActive={isSubmitting}
                callback={async () => {
                  setIsSubmitting(true);
                  const quiz = prepareQuestionStructure();
                  const response = await addQuiz(quiz);
                  const responseType = response[0].type;

                  setMessages(response);

                  if (responseType === 'success') {
                    return history.push('/dashboard');
                  }

                  setIsSubmitting(false);
                }}
              />
            ) : null}
          </aside>
        </section>
      </section>
    </form>
  );
};

export default Form;
