import { deleteQuizById, fetchQuizzes } from 'api';
import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

const initialFilters = {
  topic: '',
  level: 'all',
};

const storageKey = 'quiz-filters';

const getInitialFilters = () => {
  const savedFilters = window.localStorage.getItem(storageKey);
  if (savedFilters !== null) {
    return JSON.parse(savedFilters);
  }
  return initialFilters;
};
const QuizzesPage = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  useEffect(() => {
    async function getQuizzes() {
      try {
        setIsLoading(true);
        setError(false);
        const initialQuizes = await fetchQuizzes();
        setQuizItems(initialQuizes);
      } catch (err) {
        if (err.code !== 'ERR_CANCELED') {
          setError(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getQuizzes();
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(filters));
  }, [filters]);

  const deleteQuiz = async quizId => {
    try {
      setIsLoading(true);
      setError(false);
      const deletedQuiz = await deleteQuizById(quizId);
      setQuizItems(prevItems =>
        prevItems.filter(item => item.id !== deletedQuiz.id)
      );
    } catch (error) {
      toast.error('Error deleting quiz!');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTopicFilter = newTopic => {
    setFilters(prevFilters => ({
      ...prevFilters,
      topic: newTopic,
    }));
  };

  const updateLevelFilter = newLevel => {
    setFilters(prevFilters => ({
      ...prevFilters,
      level: newLevel,
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const visibleQuizItems = quizItems.filter(item => {
    const hasTopic = item.topic
      .toLowerCase()
      .includes(filters.topic.toLocaleLowerCase());
    if (filters.level === 'all') {
      return hasTopic;
    }
    const matchesLevel = item.level === filters.level;
    return hasTopic && matchesLevel;
  });

  return (
    <div>
      <SearchBar
        filters={filters}
        onUpdateTopic={updateTopicFilter}
        onUpdateLevel={updateLevelFilter}
        onReset={resetFilters}
      />
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
      {error && <b>Error! Please try reload this page</b>}
      {visibleQuizItems.length > 0 && (
        <QuizList items={visibleQuizItems} onDelete={deleteQuiz} />
      )}
    </div>
  );
};

export default QuizzesPage;
