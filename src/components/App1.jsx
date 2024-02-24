import { QuizForm } from './QuizForm/QuizForm';
import { SearchBar } from './SearchBar';
import { QuizList } from './QuizList/QuizList';
import { addNewQuiz, deleteQuizById, fetchQuizzes } from 'api';
import { Bars } from 'react-loader-spinner';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

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

export const App1 = () => {
  const [quizItems, setQuizItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(getInitialFilters);

  useEffect(() => {
    // const abortController = new AbortController();

    async function getQuizzes() {
      try {
        setIsLoading(true);
        setError(false);
        const initialQuizes = await fetchQuizzes();
        setQuizItems(initialQuizes);
        // signal: abortController.signal;
        // return () => {
        //   abortController.abort();
        // };
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
  // --------------------------------------
  // cancel http request
  const controllerRef = useRef();

  const fetcData = async () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    controllerRef.current = new AbortController();

    try {
      const baseUrl = 'https://65742ec8f941bda3f2af738b.mockapi.io';
      await axios.get(baseUrl, { signal: controllerRef.current.signal });
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------------------------------

  const addQuiz = async newQuiz => {
    try {
      setIsLoading(true);
      const addedQuiz = await addNewQuiz(newQuiz);
      setQuizItems(prevItems => [...prevItems, addedQuiz]);
    } catch (error) {
      toast.error('Error adding quiz!');
    } finally {
      setIsLoading(false);
    }
  };

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
      <button onClick={fetcData}>Click</button>
      <QuizForm onAdd={addQuiz} />
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
      <Toaster />
    </div>
  );
};
