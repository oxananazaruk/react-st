import { deleteQuizById, fetchQuizzes } from 'api';
import { QuizList } from 'components/QuizList/QuizList';
import { SearchBar } from 'components/SearchBar';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { useSearchParams } from 'react-router-dom';

// const initialFilters = {
//   topic: '',
//   level: 'all',
// };

// const storageKey = 'quiz-filters';

// const getInitialFilters = () => {
//   const savedFilters = window.localStorage.getItem(storageKey);
//   if (savedFilters !== null) {
//     return JSON.parse(savedFilters);
//   }
//   return initialFilters;
// };

const QuizzesPage = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [filters, setFilters] = useState(getInitialFilters);

  const [params, setParams] = useSearchParams();
  const topic = params.get('topic') ?? '';
  const level = params.get('level') ?? 'all';

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

  // useEffect(() => {
  //   localStorage.setItem(storageKey, JSON.stringify(filters));
  // }, [filters]);

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

  // const updateTopicFilter = newTopic => {
  //   // setFilters(prevFilters => ({
  //   //   ...prevFilters,
  //   //   topic: newTopic,
  //   // }));
  //   params.set('topic', newTopic);
  //   setParams(params);
  // };

  // const updateLevelFilter = newLevel => {
  //   // setFilters(prevFilters => ({
  //   //   ...prevFilters,
  //   //   level: newLevel,
  //   // }));

  //   params.set('level', newLevel);
  //   setParams(params);
  // };

  const updateFilterParams = (key, value) => {
    params.set(key, value);
    setParams(params);
  };

  const resetFilters = () => {
    // setFilters(initialFilters);

    setParams({ topic: '', level: 'all' });
  };

  const visibleQuizItems = quizItems.filter(item => {
    const hasTopic = item.topic
      .toLowerCase()
      .includes(topic.toLocaleLowerCase());
    if (level === 'all') {
      return hasTopic;
    }
    const matchesLevel = item.level === level;
    return hasTopic && matchesLevel;
  });

  return (
    <div>
      <SearchBar
        filters={{ topic, level }}
        // onUpdateTopic={updateTopicFilter}
        // onUpdateLevel={updateLevelFilter}
        onUpdateFilters={updateFilterParams}
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
