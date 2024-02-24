import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import CreteQuizPage from 'pages/CreteQuizPage';
import QuizzesPage from 'pages/QuizzesPage';
import QuizDetailsPage from 'pages/QuizDetailsPage';
import { AppLayout } from './AppLayout';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/create" element={<CreteQuizPage />} />
          <Route path="/list" element={<QuizzesPage />} />
          <Route path="/list/:quizId" element={<QuizDetailsPage />}>
            <Route path="stats" element={<div>Statistic</div>} />
            <Route path="about" element={<div>About</div>} />
          </Route>
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};
