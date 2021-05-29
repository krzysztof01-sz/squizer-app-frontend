import { useState } from 'react';
import { responseTypes } from '../utils/constants';
import * as api from '../api';
import { COMMENT_DELETE_CONFIRMATION } from '../utils/feedbackMessages';

export const useComment = () => {
  const [actionResult, setActionResult] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateComment = async (quizId, commentId, comment) => {
    setIsSubmitting(true);
    const { type, msg } = await api.updateQuizComment(quizId, commentId, comment);
    setIsSubmitting(false);

    setActionResult({ type, msg });
    if (type === responseTypes.success) {
      location.reload();
    }
  };

  const deleteComment = async (quizId, commentId) => {
    if (confirm(COMMENT_DELETE_CONFIRMATION)) {
      const { type, msg } = await api.deleteQuizComment(quizId, commentId);

      setActionResult({ type, msg });
      if (type === responseTypes.success) {
        location.reload();
      }
    }
  };

  const addComment = async (quizId, comment) => {
    setIsSubmitting(true);
    const { type, msg } = await api.addComment(quizId, comment);
    setIsSubmitting(false);

    setActionResult({ type, msg });

    if (type === responseTypes.success) {
      location.reload();
    }
  };

  return { updateComment, deleteComment, addComment, actionResult, isSubmitting };
};
