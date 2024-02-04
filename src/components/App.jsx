// import { Basics } from "./Basics";

import { Component } from "react"
import { QuizForm } from "./QuizForm/QuizForm"
import { SearchBar } from "./SearchBar"
import { QuizList } from "./QuizList/QuizList"
import initialQuizItems from "../quiz-items.json"
import { nanoid } from "nanoid"

const initialFilters = {
  topic: "",
   level: "all",
}

const storageKey = "quiz-filters"

export class App extends Component {
  state = {
    quizItems: initialQuizItems,
    filters: initialFilters
  };

  componentDidMount() {
    console.log("component did mount");
    const savedFilters = window.localStorage.getItem(storageKey);
    // console.log(savedFilters);
    if (savedFilters !== null) {
      this.setState({
      filters: JSON.parse(savedFilters),
    }) 
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("component did update");
    if (prevState.filters !== this.state.filters) {
      // console.log("prevstate", prevState);
      // console.log("this.state", this.state);
      localStorage.setItem(storageKey, JSON.stringify(this.state.filters))
    }
  }

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

   resetFilters = () => {
    this.setState(prevState => {
      return {
        filters: initialFilters
      }
    })
  }

  deleteQuiz = (quizId) => {
    console.log("Deleted", quizId);
    this.setState(prevState => {
      return {
        quizItems: prevState.quizItems.filter(item=> item.id !== quizId)
      }
    })
  }

  addQuiz = (newQuiz) => {
    const quiz = {
      ...newQuiz,
      id: nanoid()
    }
    
    this.setState(prevState => {
      return {
    quizItems: [...prevState.quizItems, quiz]
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
        <QuizForm onAdd={this.addQuiz } />
        <SearchBar filters={filters} onUpdateTopic={this.updateTopicFilter} onUpdateLevel={this.updateLevelFilter} onReset={this.resetFilters } />
        {visibleQuizItems.length > 0 && <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />}
      </div>
    )
  };
};