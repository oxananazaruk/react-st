import { addNewQuiz } from 'api';
import { QuizForm } from 'components/QuizForm/QuizForm';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';

const CreteQuizPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addQuiz = async newQuiz => {
    try {
      setIsLoading(true);
      await addNewQuiz(newQuiz);
    } catch (error) {
      toast.error('Error adding quiz!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      div
      <QuizForm onAdd={addQuiz} />
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
    </div>
  );
};

export default CreteQuizPage;
