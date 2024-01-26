export const QuizCard = ({quiz: {id, topic, level, time, questions}}) => {
  return (
      <div level={level}>
          <h2>{topic}</h2>
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
          <button>Delete</button>
    </div>
  )
}