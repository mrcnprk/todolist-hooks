import TasksList from './TasksList.js'
import AddTask from './AddTask.js'
import RecentlyDone from './RecentlyDone.js'
import Header from './Header.js'
import Footer from './Footer.js'
import Prompt from './prompt.js'

import './App.css';

import React from 'react';

export const DispatchContext = React.createContext()
export const TasksContext = React.createContext()
export const LanguageContext = React.createContext()
export const ChangeLanguageContext = React.createContext()
export const RefContext = React.createContext()
export const FocusContext = React.createContext()
export const PromptContext = React.createContext()

function App() {

  // Tworzenie nowego zadania w tablicy

  const newTask = (taskName, date, additionalInfo, priority) => {
    return {
        id: Date.now(),
        taskName: taskName,
        deadline: date,
        additionalInfo: additionalInfo,
        priority: priority,
        complete: false
    }
  }

  // zarządzanie stanem

  const reducer = (tasks, action) => {
    switch(action.type) {
        case 'add-task':
            return [...tasks, newTask(action.payload.name, action.payload.date, action.payload.additionalInfo, action.payload.priority)]
        case 'change-status':
            return tasks.map(task => {
              if (task.id === action.payload) {
                return {...task, complete: true, completeDate: new Date().toLocaleString()}
              }
              return task
            })
        case 'delete-task':
          return tasks.filter(task => task.id !== action.payload)
        default: showPrompt('oops! Coś poszło nie tak :(')
    }
  }

  // delkaracja stanów

  const [tasks, dispatch] = React.useReducer(reducer, [])
  const [language, setLanguage] = React.useState('polish')

  const initialPromptMessage = React.useMemo(() => { return {
    text: '',
    handleConfirm: '',
    handleDecline: '',
  }}, [])

  const [promptText, setPromptText] = React.useState(initialPromptMessage)
  const [isPromptActive, setIsPromptActive] = React.useState(false)


  // obsługa prompt

  const promptRef = React.useRef('')

  const [promptIndex, setPromptIndex] = React.useState(0)

  const showPrompt = React.useCallback((message, autoclose, removeFunction) => {
    if (promptIndex) { clearTimeout(promptIndex) }
    if(autoclose) {
      promptRef.current.classList.add('active')
      setIsPromptActive(true)
      setPromptIndex(setTimeout(() => {
        setIsPromptActive(false)
        promptRef.current.classList.remove('active')
        setPromptText(initialPromptMessage)
      }, 3000))
      return setPromptText({
        text: message,
        handleConfirm: '',
        handleDecline: '',
    })
  }
    if(!autoclose) {
      promptRef.current.classList.add('active')
      setIsPromptActive(true)
      return setPromptText({
        text: message,
        handleConfirm: () => {
          promptRef.current.classList.remove('active')
          setIsPromptActive(false)
          setPromptText(initialPromptMessage)
          return removeFunction()
        },
        handleDecline: () => {
          promptRef.current.classList.remove('active')
          setIsPromptActive(false)
          setPromptText(initialPromptMessage)
        }
        })
    }
  }, [promptIndex, initialPromptMessage])

  // zmiana języka

  const hadleChangeLanguage = React.useCallback(() => {
    if (language === 'polish'){
      setLanguage('english')
      showPrompt('Language has been set to English', true)
    }
    else {
      setLanguage('polish')
      showPrompt('Zmieniono język na Polski', true)
      }
  }, [language, showPrompt])

  // focus na dodawanie zadania

  const nameInputRef = React.useRef()

    const focus = () => {
        nameInputRef.current.focus()
    }


  return (
    <div className="App">
      <LanguageContext.Provider value={language}>
        <TasksContext.Provider value={tasks}>
          <DispatchContext.Provider value={dispatch}>
            <RefContext.Provider value={nameInputRef}>
              <FocusContext.Provider value={focus}>
                <PromptContext.Provider value={showPrompt}>
                  <header className="pageHeader">
                    <ChangeLanguageContext.Provider value={hadleChangeLanguage}>
                      <Header />
                    </ChangeLanguageContext.Provider>
                  </header>
                  <main className="mainSection">
                    <div ref={promptRef} className="prompt">{isPromptActive ? <Prompt message={promptText.text} handleConfirm={promptText.handleConfirm} handleDecline={promptText.handleDecline} /> : null}</div>
                    <section className="list">
                      <TasksList/>
                    </section>
                    <aside className="sidePanel">
                      <div className="addBox">
                        <AddTask/>
                      </div>
                      <div className="recentlyDone">
                        <RecentlyDone/>
                      </div>
                    </aside>
                  </main>
                  <footer className="pageFooter">
                    <Footer />
                  </footer>
                </PromptContext.Provider>
              </FocusContext.Provider>
            </RefContext.Provider>
          </DispatchContext.Provider>
        </TasksContext.Provider>
      </LanguageContext.Provider>

    </div>
  );
}

export default App;