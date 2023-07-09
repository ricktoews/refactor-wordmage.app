import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import WordsInterface from '../utils/words-interface';
import css from './WordForm.module.scss';
import { actSetWordFormState } from '@/store/actions';

const WM = WordsInterface();

function WordForm(props) {
    const wordFormState = useSelector(state => state.wordFormState);
    const dispatch = useDispatch();

    var word = '', def = '', source = '', spotlight = true, originalDef = '';

    if (props.wordId) {
        // get word from custom list, from active list.
        var { word, def, source = '', original } = WordsInterface.getWordObjById(props.wordId);
        // If word already exists, set spotlight flag to false;
        if (WordsInterface.isSpotlightEntry(props.word)) {
            var { source = '' } = WordsInterface.getSpotlightEntry(props.word);
        }
        if (original) originalDef = original;
    }

    const [newWord, setNewWord] = useState(word);
    const [newDef, setNewDef] = useState(def);
    const [newSource, setNewSource] = useState(source);

    const handleChange = e => {
        var el = e.target;
        var notes = el.textContent;
    };

    const handleWord = e => {
        var el = e.target;
        setNewWord(el.value);
    };

    const handleDef = e => {
        var el = e.target;
        setNewDef(el.value);
    };

    const handleSource = e => {
        var el = e.target;
        setNewSource(el.value);
    };

    const cancelWord = () => {
        console.log('cancel');
        dispatch(actSetWordFormState(false));
        // Just hide form; no need to update any components.
    }

    const saveWord = () => {
        console.log('====> saveWord', newWord, newDef, newSource);
        /*
        // Need to save custom word, spotlight, or whatever.
        WM.saveCustomWord(props.wordId, newWord, newDef, newSource, spotlight);
        // If on Spotlight page, add word to active.
        if (props.location.pathname === '/spotlight') {
            WordsInterface.toggleActive(newWord);
        }
*/
        // Finally, hide form. This should reach the top and hopefully cascade rerender components.
        dispatch(actSetWordFormState(false));
    }

    const restoreOriginalDef = () => {
        console.log('Restore', originalDef, 'for this word');
        setNewDef(originalDef);
    };

    return (
        <div className={css["word-form-container"]}>
            <div className={css["word-form-wrapper"]}>
                <div className="bg-gray-50">

                    {/* Word Form Heading: Built-in, or Custom word */}
                    <div className="text-sl text-center bg-black">
                        Add Word
                    </div>
                    <div className={`${css['form']} ${css["field-wrapper"]}`}>
                        {/* Word input field (custom), or word displayed only (built-in) */}
                        <div className={css["input-field"]}>
                            <input placeholder="Word" onChange={handleWord} type="text" id="new-word" size="20" value={newWord} />
                        </div>

                        {/* Definition input field */}
                        <div className={css["input-field"]}>
                            <textarea placeholder="Definition" onChange={handleDef} id="new-def" value={newDef}></textarea>
                        </div>

                        {/* Source. For ... ? */}
                        <div className={css["input-field"]}>
                            <input placeholder="Source" onChange={handleSource} type="text" id="new-notes" size="20" value={newSource} />
                        </div>

                        {/* Cancel / Save buttons */}
                        <div className={css["button-wrapper"]}>
                            <button className={css["cancel"]} onClick={cancelWord}>Cancel</button>
                            <button className={css["save"]} onClick={saveWord}>Save</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WordForm;