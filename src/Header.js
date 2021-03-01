import React from 'react';
import { ChangeLanguageContext, LanguageContext, FocusContext } from './App.js'

const Header = () => {

    const language = React.useContext(LanguageContext)
    const changeLanguage = React.useContext(ChangeLanguageContext)
    const focus = React.useContext(FocusContext)

    return (
        <div className="headerSection">
            <span className='language-switch'>
               <label className="form-switch">
                    <input type="checkbox" value={language} onChange={changeLanguage}/>
                        <i></i>
                </label>
                English
            </span>
            <h2 className='pageTitle'>{language === 'polish' ? 'LISTA ZADAŃ' : 'TO DO LIST'}</h2>
            <button className='focusButton' onClick={focus}>{language === 'polish' ? 'Dodaj zadanie' : 'Add task'}</button>
        </div>
     );
}

export default Header;