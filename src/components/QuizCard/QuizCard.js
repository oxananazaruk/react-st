import { TopicModal } from 'components/TopicModal/TopicModal';
import { Component } from 'react';

export class QuizCard extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { isModalOpen } = this.state;

    const {
      quiz: { id, topic, level, time, questions },
      onDelete,
    } = this.props;
    return (
      <div level={level}>
        <h2 onClick={this.openModal}>{topic}</h2>
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
        <button onClick={() => onDelete(id)}>Delete</button>
        <TopicModal
          isOpen={isModalOpen}
          onClose={this.closeModal}
          topic={topic}
        />
      </div>
    );
  }
}
