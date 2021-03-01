import React from 'react';
import { TasksContext, DispatchContext, LanguageContext } from './App'

const RecentlyDone = () => {

    const tasks = React.useContext(TasksContext)
    const dispatch = React.useContext(DispatchContext)
    const language = React.useContext(LanguageContext)

    const messages = {
        taskCompleteTitlePl: 'Wykonano',
        taskCompleteTitleEn: 'Done',
        taskDeleteTitlePl: 'Usuń zadanie',
        taskDeleteTitleEn: 'Delete task',
        taskDoneTimePl: 'Wykonano:',
        taskDoneTimeEn: 'Done:',
        recentlyDoneTitlePl: 'Ostatnio wykonane:',
        recentlyDoneTitleEn: 'Recently Done:',
    }

    const handleDelete = (id) => {
        dispatch({type: 'delete-task', payload: id})
    }

    const doneList = tasks.map(task => {
    return task.complete ? (<div className='singleTaskBox-inDone' key={task.id}>
            <p className='taskName-inDone'>{task.taskName}</p>
            <p className='taskCompleteDate-inDone'><i className="fas fa-check-double" title={language === 'polish' ? messages.taskCompleteTitlePl : messages.taskCompleteTitleEn}></i><i className='fas fa-times deleteDoneButton' title={language === 'polish' ? messages.taskDeleteTitlePl : messages.taskDeleteTitleEn} onClick={() => {handleDelete(task.id)}}></i>{language === 'polish' ? messages.taskDoneTimePl : messages.taskDoneTimeEn} {task.completeDate}</p>
        </div>) : null
    })

    return (
        <>
        <h3>{language === 'polish' ? messages.recentlyDoneTitlePl : messages.recentlyDoneTitleEn}</h3>
        {doneList}
        </>
     );
}

export default RecentlyDone;