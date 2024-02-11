// import { Basics } from "./Basics";

import { Component } from "react"
import { QuizForm } from "./QuizForm/QuizForm"
import { SearchBar } from "./SearchBar"
import { QuizList } from "./QuizList/QuizList"
// import { nanoid } from "nanoid"
import { addNewQuiz, deleteQuizById, fetchQuizzes } from "api"
import { Bars } from 'react-loader-spinner'
import toast, { Toaster } from 'react-hot-toast';

const initialFilters = {
  topic: "",
   level: "all",
}

const storageKey = "quiz-filters"

export class App extends Component {
  state = {
    quizItems: [],
    isLoading: false,
    error: false,
    filters: initialFilters
  };

  async componentDidMount() {
    // console.log("component did mount");
    const savedFilters = window.localStorage.getItem(storageKey);
    // console.log(savedFilters);
    if (savedFilters !== null) {
      this.setState({
      filters: JSON.parse(savedFilters),
    }) 
    }

    try {
      this.setState({ isLoading: true, error: false });
      const initialQuizes = await fetchQuizzes()
      console.log(initialQuizes);
      this.setState({
        quizItems: initialQuizes
      })
    } catch (err) {
      this.setState({ error: true });
    } finally {
      this.setState({isLoading: false})
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

  deleteQuiz = async (quizId) => {
    // console.log("Deleted", quizId);
    // this.setState(prevState => {
    //   return {
    //     quizItems: prevState.quizItems.filter(item=> item.id !== quizId)
    //   }
    // })

    try {
      this.setState({ isLoading: true, error: false });
      const deletedQuiz = await deleteQuizById(quizId);
      this.setState(prevState => {
        return {
          quizItems: prevState.quizItems.filter(
            item => item.id !== deletedQuiz.id
          )
        }
      })
    } catch (error) {
      //  this.setState({ error: true });
      toast.error("Error deleting quiz!")
    } finally {
       this.setState({ isLoading: false });
    }
  }

  addQuiz = async (newQuiz) => {
//     const quiz = {
//       ...newQuiz,
//       id: nanoid()
//     }
    
//     this.setState(prevState => {
//       return {
//     quizItems: [...prevState.quizItems, quiz]
//   }
   // })
   
    try {
     this.setState({ isLoading: true, error: false });
     const addedQuiz = await addNewQuiz(newQuiz);
     this.setState(prevState => {
       return {
         quizItems: [...prevState.quizItems, addedQuiz]
       }
     })
   } catch (error) {
      //  this.setState({ error: true });
      toast.error("Error adding quiz!")
    } finally {
      this.setState({ isLoading: false });
   }
  }

  render() {
    const { quizItems, filters, isLoading, error } = this.state;

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
       {isLoading && <Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
        />}
        {error && <b>Error! Please try reload this page</b>}
        {visibleQuizItems.length > 0 && <QuizList items={visibleQuizItems} onDelete={this.deleteQuiz} />}
      <Toaster/>
      </div>
    )
  };
};
