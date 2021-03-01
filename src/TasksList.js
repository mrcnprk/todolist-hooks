import React from 'react';
import { TasksContext, DispatchContext, LanguageContext, PromptContext } from './App.js'

const TasksList = () => {

    const tasks = React.useContext(TasksContext)
    const dispatch = React.useContext(DispatchContext)
    const language = React.useContext(LanguageContext)
    const showPrompt = React.useContext(PromptContext)


    const messages = {
        taskDeadlinePl: 'Termin wykonania:',
        taskDeadlineEn: 'Deadline:',
        confirmBtnTitlePl: 'Potwierdź wykonanie',
        confirmBtnTitleEn: 'Mark as done',
        deleteBtnTitlePL: 'Usuń zadanie bez potwierdzania',
        deleteBtnTitleEn: 'Delete task without confirming',
        deletePromptPl: 'Czy na pewno chcesz usunąć to zadanie?',
        deletePromptEn: 'Are you sure you want to delete this task?'
    }


    const handleComplete = (id) => {
        dispatch({type: 'change-status', payload: id})
    }

    const handleDelete = (id) => {
        if (language === 'polish') return showPrompt(messages.deletePromptPl, false, () => dispatch({type: 'delete-task', payload: id}))
        if (language === 'english') return showPrompt(messages.deletePromptEn, false, () => dispatch({type: 'delete-task', payload: id}))
    }

    const list = tasks.map(task => {
    return !task.complete ? (<div className={task.priority ? 'singleTaskBox-inList priority' : 'singleTaskBox-inList'} key={task.id}>
        <h4 className='taskName-inList'>{task.taskName}</h4>
        <p className='taskAdditionalInfo-inList'>{task.additionalInfo}</p>
        <p className='taskDeadline-inList'>{language === 'polish' ? messages.taskDeadlinePl : messages.taskDeadlineEn } {task.deadline}</p>
        <button className='confirmButton-inList' title={language === 'polish' ? messages.confirmBtnTitlePl : messages.confirmBtnTitleEn} onClick={() => {handleComplete(task.id)}}><i className='fas fa-check'></i></button>
        <button className='deleteButton-inList' title={language === 'polish' ? messages.deleteBtnTitlePL : messages.deleteBtnTitleEn} onClick={() => {handleDelete(task.id)}}><i className='fas fa-times'></i></button>
        </div>) : null })

    return (
        <>
        {list}
        </>
     );
}

export default TasksList;