import { TopicModal } from 'components/TopicModal/TopicModal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const QuizCard = ({
  quiz: { id, topic, level, time, questions },
  onDelete,
}) => {
  const { isModalOpen, setIsModalOpen } = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div level={level}>
      <Link to={`/list/${id}`}>
        <h2 onClick={openModal}>{topic}</h2>
      </Link>
      <div>
        <p>
          <b>Level:</b> {level}
        </p>
        <p>
          <b>Time:</b> {time}
        </p>
        <p>
          <b>Questions:</b> {questions}
        </p>
      </div>
      <div>
        <button onClick={() => onDelete(id)}>Delete</button>
        <button onClick={() => openModal}>Edite</button>
      </div>
      <TopicModal isOpen={isModalOpen} onClose={closeModal} topic={topic} />
    </div>
  );
};
