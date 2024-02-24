import { fetchQuizById } from 'api';
import { QuizCard } from 'components/QuizCard/QuizCard';
import { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { NavLink, Outlet, useParams } from 'react-router-dom';

const QuizDetailsPage = () => {
  const params = useParams();
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getQuiz() {
      try {
        setIsLoading(true);
        const fetchedQuiz = await fetchQuizById(params.quizId);
        setQuiz(fetchedQuiz);
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    }

    getQuiz();
  }, [params.quizId]);

  return (
    <div>
      {isLoading && (
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {quiz && <QuizCard quiz={quiz} />}
      <ul>
        <li>
          <NavLink to="stats">Stats</NavLink>
        </li>
        <li>
          <NavLink to="about">About</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default QuizDetailsPage;
