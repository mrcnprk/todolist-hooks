import React from 'react';
import { TasksContext, LanguageContext } from './App.js'


const Footer = () => {

    const tasks = React.useContext(TasksContext)
    const language = React.useContext(LanguageContext)

    const countDone = tasks.filter(task => task.complete)

    const polishInfo = <p>{tasks.length > 0 ? `${tasks.length - countDone.length} zadań czeka na wykonanie, a ${countDone.length} zostało wykonanych` : 'Obecnie lista jest pusta'}</p>

    const englishInfo = <p>{tasks.length > 0 ? `${tasks.length - countDone.length} tasks left, ${countDone.length} has been done` : 'The list is currently empty'}</p>

    return (
        <>
        { language === 'polish' ? polishInfo : englishInfo}
        </>
     );
}

export default Footer;