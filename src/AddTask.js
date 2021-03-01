import React from 'react';
import {DispatchContext, LanguageContext, TasksContext, RefContext, PromptContext } from './App.js';

const AddTask = () => {

    const dispatch = React.useContext(DispatchContext)
    const tasks = React.useContext(TasksContext)
    const language = React.useContext(LanguageContext)
    const nameInputRef = React.useContext(RefContext)
    const showPrompt = React.useContext(PromptContext)

    const initialDate = new Date().toISOString().slice(0, 10)

    const [taskName, setTaskName] = React.useState('')
    const [date, setDate] = React.useState(initialDate)
    const [additionalInfo, setAdditionalInfo] = React.useState('')
    const [priority, setPriority] = React.useState(false)

    const messages = {
        emptyTaskPl: 'Nie możesz dodać pustej pozycji',
        emptyTaskEn: 'You cannot add empty task',
        duplicateTaskPL: 'Ta pozycja już jest na liście',
        duplicateTaskEn: 'You cannot add the same task again',
        addTaskLabelPl: 'Dodaj zadanie:',
        addTaskLabelEn: 'Add Task:',
        taskNameLabelPl: 'Nazwa zadania:',
        taskNameLabelEn: 'Task name:',
        additionalInfoLabelPl : 'Dodatkowe informacje:',
        additionalInfoLabelEn : 'Additional information:',
        taskDateLabelPl: 'Termin wykonania zadania:',
        taskDateLabelEn: 'Task deadline:',
        taskPriorityLabelPl: 'Ważne',
        taskPriorityLabelEn: 'Urgent',
        addTaskBtnLabelPl: 'Dodaj',
        addTaskBtnLabelEn: 'Add',
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        if (taskName.length === 0 && language === 'polish') {
            return showPrompt(messages.emptyTaskPl, true)
        }
        else if (taskName.length === 0 && language === 'english'){
            return showPrompt(messages.emptyTaskEn, true)
        }
        if (tasks.filter(task => task.taskName.toLowerCase() === taskName.toLowerCase()).length > 0) {
            if(language === 'polish')
            return showPrompt(messages.duplicateTaskPL, true)
            if(language === 'english')
            return showPrompt(messages.duplicateTaskEn, true)
        }
        dispatch({type: 'add-task', payload: {name: taskName, date: date, additionalInfo: additionalInfo, priority: priority}})
        setTaskName('')
        setDate(initialDate)
        setAdditionalInfo('')
        setPriority(false)
      }

    return (
        <>
        <h3>{language === 'polish' ? messages.addTaskLabelPl : messages.addTaskLabelEn}</h3>
        <form className='addTaskForm' onSubmit={handleAddTask}>
            <label>{language === 'polish' ? messages.taskNameLabelPl : messages.taskNameLabelEn}</label>
            <input
                className='taskName-inForm'
                type='text'
                value={taskName}
                ref ={nameInputRef}
                onChange={(e) => {
                    setTaskName(e.target.value)
            }}/>
            <label>{language === 'polish' ? messages.additionalInfoLabelPl : messages.additionalInfoLabelEn}</label>
            <input
            className='additionalTaskInfo-inForm'
            type='text'
            value={additionalInfo}
            onChange={(e)=>{setAdditionalInfo(e.target.value)
            }}/>
            <label>{language === 'polish' ? messages.taskDateLabelPl : messages.taskDateLabelEn}</label>
            <input
                className='taskDate-inForm'
                type='date'
                value={date}
                onChange={(e) => {
                    setDate(e.target.value)
            }}/>
            <div>
                <input
                    className='priorityTask-inForm'
                    type='checkbox'
                    value={priority}
                    checked={priority}
                    onChange={() => setPriority(prev => !prev)}
                />
                <label>{language === 'polish' ? messages.taskPriorityLabelPl : messages.taskPriorityLabelEn}</label>
            </div>
            <button
            className='addTaskButton-inForm'
            onClick={handleAddTask}>
                {language === 'polish' ? messages.addTaskBtnLabelPl : messages.addTaskBtnLabelEn}
            </button>
        </form>
        </>
     );
}

export default AddTask;