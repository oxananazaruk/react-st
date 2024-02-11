import axios from 'axios';

axios.defaults.baseURL = 'https://65742ec8f941bda3f2af738b.mockapi.io';

export const fetchQuizzes = async () => {
  const responce = await axios.get('/quizes');
  return responce.data;
};

export const addNewQuiz = async newQuiz => {
  const responce = await axios.post('/quizes6', newQuiz);
  return responce.data;
};

export const deleteQuizById = async quizId => {
  const responce = await axios.delete(`/quizes1/${quizId}`);
  return responce.data;
};
