// import { Basics } from "./Basics";

import { Component } from "react"
import { QuizForm } from "./QuizForm"
import { SearchBar } from "./SearchBar"
import { QuizList } from "./QuizList/QuizList"
import initialQuizItems from "../quiz-items.json"

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: {
      topic: "",
      level: "all",
    },
  };

  updateTopicFilter = newTopic => { 
    console.log(newTopic);
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          topic: newTopic,
        }
      }
    })
  };

  updateLevelFilter = newLevel => {
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          level: newLevel,
        }
      }
    })
  }

  render() {
    const { quizItems, filters } = this.state;
    const visibleQuizItems = quizItems.filter(item => {
      const hasTopic = item.topic.toLowerCase().includes(filters.topic.toLocaleLowerCase());
      if (filters.level === "all") {
        return hasTopic
      }
      
      const matchesLevel = item.level === filters.level;

      return hasTopic && matchesLevel;
    })

    return (
      <div>
        {/* <Basics/> */}
        <QuizForm />
        <SearchBar filters={filters} onUpdateTopic={this.updateTopicFilter} onUpdateLevel={this.updateLevelFilter } />
        {visibleQuizItems.length > 0 && <QuizList items={visibleQuizItems} />}
      </div>
    )
  };
};
