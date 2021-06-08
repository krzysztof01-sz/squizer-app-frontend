import { useState } from 'react';
import * as fb from '../utils/feedbackMessages';

export const useQuizForm = () => {
  const savedQuestionData = JSON.parse(localStorage.getItem('quiz-data'));
  const savedGeneralQuizData = JSON.parse(localStorage.getItem('general-quiz-data'));

  const [generalQuizData, setGeneralQuizData] = useState(
    savedGeneralQuizData ?? {
      title: '',
      category: '',
      description: '',
    },
  );
  const initialQuestionData = {
    content: '',
    correctAnswer: '',
    optionalAnswer1: '',
    optionalAnswer2: '',
    optionalAnswer3: '',
  };

  const [questions, setQuestions] = useState(savedQuestionData ?? [{ ...initialQuestionData }]);
  const initialQuestionID = questions.length === 0 ? 0 : questions.length - 1;
  const [questionID, setQuestionID] = useState(initialQuestionID);

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
    const trimmedAnswers = answers.map((answer) => answer.trim());
    const properUniqueAnswersQuantity = trimmedAnswers.length;
    const uniqueAnswersQuantity = Array.from(new Set(trimmedAnswers)).length;
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

  const setQuestionData = (value, name) => {
    setQuestions(() => {
      questions[questionID][name] = value;
      return [...questions];
    });
  };

  const getRandomNumber = () => Math.random().toString();

  const prepareQuestionStructure = () => {
    const generalQuizDataFilled = areAllFieldsFilled(generalQuizData);

    if (generalQuizDataFilled) {
      const generalData = trimObjectFields(generalQuizData);
      const questionsWithTrimmedFields = questions.map((question) => trimObjectFields(question));

      const structuredQuestions = [];
      questionsWithTrimmedFields.forEach(({ content, correctAnswer, optionalAnswer1, optionalAnswer2, optionalAnswer3 }) => {
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
      });
      structuredQuestions.pop();
      const quiz = { ...generalData, questions: [...structuredQuestions] };
      return quiz;
    }
  };

  const canUserAddQuiz = () => {
    const thereAreAtLeast2QuestionsSet = questionID >= 2;
    const userIsFillingTheNewestQuestion = !questions[questionID + 1];

    return thereAreAtLeast2QuestionsSet && userIsFillingTheNewestQuestion;
  };

  return {
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
  };
};
